"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const alert = new mongoose_1.Schema({
    createdByUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdForUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    scheduledOnDate: Date,
    runOnDate: Date,
    alertType: {
        type: mongoose_1.Schema.Types.String,
        enum: ['paymentReminder', 'practiceReminder']
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        enum: ['scheduled', 'inProcess', 'success', 'failure'],
        default: 'scheduled'
    },
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('alert', alert);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0FsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBR2tCO0FBRWxCLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQU0sQ0FBQztJQUNyQixlQUFlLEVBQUU7UUFDYixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsTUFBTTtLQUNkO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsTUFBTTtLQUNkO0lBQ0QsZUFBZSxFQUFFLElBQUk7SUFDckIsU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUN6QixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQztLQUNoRDtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQztRQUN0RCxPQUFPLEVBQUUsV0FBVztLQUN2QjtJQUNELFNBQVMsRUFBRSxJQUFJO0lBQ2YsU0FBUyxFQUFFLElBQUk7Q0FDbEIsQ0FBQyxDQUFBO0FBRUYsSUFBQSxnQkFBSyxFQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQSJ9