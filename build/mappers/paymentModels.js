"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPaymentModelList = exports.toPaymentModel = void 0;
const utility_1 = require("../helpers/utility");
const toPaymentModel = (paymentModelData) => {
    var _a, _b;
    const { businessId, createdAt, currency, perHeadAmount, period, updatedAt, name, _id, id, status, } = paymentModelData;
    const data = {
        id: (_a = (id || _id)) === null || _a === void 0 ? void 0 : _a.toString(),
        createdAt,
        currency,
        perHeadAmount,
        period,
        name,
        status,
        updatedAt,
        businessId: null
    };
    if (businessId) {
        if (!(businessId === null || businessId === void 0 ? void 0 : businessId.name) && (0, utility_1.isObjectIdValid)(businessId)) {
            data.businessId = businessId.toString();
        }
        else {
            data.businessId = {
                id: (_b = (businessId.id || businessId._id)) === null || _b === void 0 ? void 0 : _b.toString(),
                name: businessId.name,
            };
        }
    }
    return data;
};
exports.toPaymentModel = toPaymentModel;
const toPaymentModelList = (grades) => grades.map(item => (0, exports.toPaymentModel)(item));
exports.toPaymentModelList = toPaymentModelList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudE1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYXBwZXJzL3BheW1lbnRNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQXFEO0FBRzlDLE1BQU0sY0FBYyxHQUFHLENBQUMsZ0JBQXVDLEVBQUUsRUFBRTs7SUFDekUsTUFBTSxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLGFBQWEsRUFDYixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFDSixHQUFHLEVBQ0gsRUFBRSxFQUNGLE1BQU0sR0FDTixHQUFHLGdCQUFnQixDQUFDO0lBRXJCLE1BQU0sSUFBSSxHQUFRO1FBQ2pCLEVBQUUsRUFBRSxNQUFBLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQywwQ0FBRSxRQUFRLEVBQUU7UUFDM0IsU0FBUztRQUNULFFBQVE7UUFDUixhQUFhO1FBQ2IsTUFBTTtRQUNOLElBQUk7UUFDSixNQUFNO1FBQ04sU0FBUztRQUNULFVBQVUsRUFBRSxJQUFJO0tBQ2hCLENBQUE7SUFFRCxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxDQUFDLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLENBQUMsSUFBSSxJQUFBLHlCQUFlLEVBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxDQUFDO2FBQ0ksQ0FBQztZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUc7Z0JBQ2pCLEVBQUUsRUFBRSxNQUFBLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLDBDQUFFLFFBQVEsRUFBRTtnQkFDakQsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO2FBQ3JCLENBQUM7UUFDSCxDQUFDO0lBQ0YsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFBO0FBdkNZLFFBQUEsY0FBYyxrQkF1QzFCO0FBRU0sTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE1BQStCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFBLHNCQUFjLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUFsRyxRQUFBLGtCQUFrQixzQkFBZ0YifQ==