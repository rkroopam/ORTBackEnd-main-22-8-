"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentModel = exports.createPaymentModel = exports.getPaymentModels = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentModels_1 = require("../mappers/paymentModels");
const utility_1 = require("../helpers/utility");
const { paymentModel, business } = mongoose_1.default.models;
const getPaymentModels = (req, res) => {
    try {
        const { status } = req.query;
        const query = {};
        if (status) {
            query.status = status;
        }
        return paymentModel.find(query)
            .then((paymentModels) => res.page((0, paymentModels_1.toPaymentModelList)(paymentModels)));
    }
    catch (error) {
        res.failure(error);
    }
};
exports.getPaymentModels = getPaymentModels;
const createPaymentModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { period, perHeadAmount, name, } = req.body;
        const bodyValueResponse = (0, utility_1.checkValueOfKeysIsPresentInData)(req.body, [
            'period',
            'name',
            'perHeadAmount',
        ]);
        if (!bodyValueResponse.isSuccess) {
            return res === null || res === void 0 ? void 0 : res.failure(bodyValueResponse.error);
        }
        const businessId = yield business.findOne({ name: 'b2c' });
        if (!businessId) {
            throw `no businessId found`;
        }
        const isPaymentModelExistForRequiredPeriod = yield paymentModel.findOne({
            businessId, period, status: 'active'
        });
        if (isPaymentModelExistForRequiredPeriod) {
            throw `paymentModel exist for ${period} period and is in active state`;
        }
        return new paymentModel({
            period,
            perHeadAmount,
            businessId,
            name,
            currency: "USD",
            status: 'active'
        }).save()
            .then((newPaymentModel) => res.page((0, paymentModels_1.toPaymentModel)(newPaymentModel)));
    }
    catch (error) {
        res.failure(error);
    }
});
exports.createPaymentModel = createPaymentModel;
// for to make PaymentModel inactive
const updatePaymentModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentModelId } = req.params;
        return paymentModel.findById((0, utility_1.getObjectId)(paymentModelId))
            .then(paymentModel => {
            if (!paymentModel)
                throw 'paymentModel not found';
            paymentModel.status = 'inactive';
            return paymentModel.save();
        })
            .then((paymentModel) => res.page((0, paymentModels_1.toPaymentModel)(paymentModel)));
    }
    catch (error) {
        res.failure(error);
    }
});
exports.updatePaymentModel = updatePaymentModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudE1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGlzL3BheW1lbnRNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLDREQUE4RTtBQUU5RSxnREFBa0Y7QUFFbEYsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsR0FBRyxrQkFBUSxDQUFDLE1BQU0sQ0FBQTtBQUUzQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBNEIsRUFBRSxHQUE2QixFQUFFLEVBQUU7SUFDOUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDNUIsTUFBTSxLQUFLLEdBQVEsRUFBRSxDQUFDO1FBRXRCLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDO1FBRUQsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUM1QixJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBQSxrQ0FBa0IsRUFBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDekUsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNwQixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBZFksUUFBQSxnQkFBZ0Isb0JBYzVCO0FBRU0sTUFBTSxrQkFBa0IsR0FBRyxDQUFPLEdBQTRCLEVBQUUsR0FBNkIsRUFBRSxFQUFFO0lBQ3RHLElBQUksQ0FBQztRQUNILE1BQU0sRUFDSixNQUFNLEVBQ04sYUFBYSxFQUNiLElBQUksR0FDTCxHQUF3QixHQUFHLENBQUMsSUFBSSxDQUFBO1FBRWpDLE1BQU0saUJBQWlCLEdBQUcsSUFBQSx5Q0FBK0IsRUFBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ2xFLFFBQVE7WUFDUixNQUFNO1lBQ04sZUFBZTtTQUNoQixDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakMsT0FBTyxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlDLENBQUM7UUFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUUxRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEIsTUFBTSxxQkFBcUIsQ0FBQTtRQUM3QixDQUFDO1FBRUQsTUFBTSxvQ0FBb0MsR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFDdEUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUTtTQUNyQyxDQUFDLENBQUE7UUFFRixJQUFJLG9DQUFvQyxFQUFFLENBQUM7WUFDekMsTUFBTSwwQkFBMEIsTUFBTSxnQ0FBZ0MsQ0FBQTtRQUN4RSxDQUFDO1FBRUQsT0FBTyxJQUFJLFlBQVksQ0FBQztZQUN0QixNQUFNO1lBQ04sYUFBYTtZQUNiLFVBQVU7WUFDVixJQUFJO1lBQ0osUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFDLENBQUMsSUFBSSxFQUFFO2FBQ04sSUFBSSxDQUFDLENBQUMsZUFBb0IsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFBLDhCQUFjLEVBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEIsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBNUNZLFFBQUEsa0JBQWtCLHNCQTRDOUI7QUFFRCxvQ0FBb0M7QUFDN0IsTUFBTSxrQkFBa0IsR0FBRyxDQUFPLEdBQTRCLEVBQUUsR0FBNkIsRUFBRSxFQUFFO0lBQ3RHLElBQUksQ0FBQztRQUNILE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBRXRDLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFBLHFCQUFXLEVBQUMsY0FBYyxDQUFDLENBQUM7YUFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZO2dCQUFFLE1BQU0sd0JBQXdCLENBQUE7WUFFakQsWUFBWSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDakMsT0FBTyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDNUIsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLENBQUMsWUFBaUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFBLDhCQUFjLEVBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEIsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBZlksUUFBQSxrQkFBa0Isc0JBZTlCIn0=