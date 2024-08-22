"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const payment = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    paymentModleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'paymentModel'
    },
    paymentMode: {
        type: mongoose_1.Schema.Types.String,
        enum: ['net-banking', 'debit-card', 'credit-card']
    },
    transactionAmount: mongoose_1.Schema.Types.Number,
    paymentInitiatedForUsersCount: {
        type: mongoose_1.Schema.Types.Number,
        default: 1
    },
    currency: mongoose_1.Schema.Types.String,
    paymentSuccessDate: Date,
    paymentValidTillDate: Date,
    status: {
        type: mongoose_1.Schema.Types.String,
        enum: ['initiated', 'inProcess', 'success', 'failure']
    },
    invoice: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'file'
    },
    statusTransactions: [{
            status: mongoose_1.Schema.Types.String,
            date: Date,
            note: mongoose_1.Schema.Types.String,
        }],
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('payment', payment);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUGF5bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUdrQjtBQUVsQixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDdkIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLE1BQU07S0FDZDtJQUNELGNBQWMsRUFBRTtRQUNaLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxjQUFjO0tBQ3RCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7S0FDckQ7SUFDRCxpQkFBaUIsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQ3RDLDZCQUE2QixFQUFFO1FBQzNCLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxRQUFRLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUM3QixrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLG9CQUFvQixFQUFFLElBQUk7SUFDMUIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0tBQ3pEO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLE1BQU07S0FDZDtJQUNELGtCQUFrQixFQUFFLENBQUM7WUFDakIsTUFBTSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDM0IsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtTQUM1QixDQUFDO0lBQ0YsU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQUE7QUFFRixJQUFBLGdCQUFLLEVBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBIn0=