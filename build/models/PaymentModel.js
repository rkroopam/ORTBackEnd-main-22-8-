"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentModel = new mongoose_1.Schema({
    name: {
        type: String
    },
    businessId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'business'
    },
    period: {
        type: String,
        enum: ['monthly', 'quarterly', 'half-yearly', 'yearly'],
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive',],
    },
    perHeadAmount: mongoose_1.Schema.Types.Number,
    currency: {
        type: mongoose_1.Schema.Types.String,
        default: 'USD' // US Dollar
    },
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('paymentModel', paymentModel);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudE1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9QYXltZW50TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FHa0I7QUFHbEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxpQkFBTSxDQUF3QjtJQUNuRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLFVBQVU7S0FDbEI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQztLQUMxRDtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLFFBQVE7UUFDakIsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtLQUNoQztJQUNELGFBQWEsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQ2xDLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLE9BQU8sRUFBRSxLQUFLLENBQUMsWUFBWTtLQUM5QjtJQUNELFNBQVMsRUFBRSxJQUFJO0lBQ2YsU0FBUyxFQUFFLElBQUk7Q0FDbEIsQ0FBQyxDQUFBO0FBRUYsSUFBQSxnQkFBSyxFQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQSJ9