"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../middlewares/authentication");
const authorization_1 = require("../middlewares/authorization");
const userRouter = (app) => {
    const api = app.appRouter;
    api.model('paymentModels')
        .register([{
            action: 'POST',
            method: 'createPaymentModel',
            url: '/',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'PUT',
            method: 'updatePaymentModel',
            url: '/:paymentModelId',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'GET',
            method: 'getPaymentModels',
            url: '/',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        },
    ]);
};
exports.default = userRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudE1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0aW5ncy9wYXltZW50TW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0VBQXFFO0FBQ3JFLGdFQUFpRTtBQUVqRSxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQzVCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDMUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7U0FDckIsUUFBUSxDQUFDLENBQUM7WUFDUCxNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxvQkFBb0I7WUFDNUIsR0FBRyxFQUFFLEdBQUc7WUFDUixPQUFPLEVBQUUsQ0FBQyxxQ0FBb0IsRUFBRSxpQ0FBaUIsQ0FBQztTQUNyRCxFQUFFO1lBQ0MsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLEdBQUcsRUFBRSxrQkFBa0I7WUFDdkIsT0FBTyxFQUFFLENBQUMscUNBQW9CLEVBQUUsaUNBQWlCLENBQUM7U0FDckQsRUFBRTtZQUNDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLGtCQUFrQjtZQUMxQixHQUFHLEVBQUUsR0FBRztZQUNSLE9BQU8sRUFBRSxDQUFDLHFDQUFvQixFQUFFLGlDQUFpQixDQUFDO1NBQ3JEO0tBQ0EsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsVUFBVSxDQUFBIn0=