"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notification = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['SuperAdmin',
            'Teacher', 'Student'],
        default: 'user'
    },
    sendToUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    sendByUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: mongoose_1.Schema.Types.String,
    hasReaded: mongoose_1.Schema.Types.Boolean,
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('notification', notification);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Ob3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FHa0I7QUFFbEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzVCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLENBQUMsWUFBWTtZQUNmLFNBQVMsRUFBRSxTQUFTLENBQUM7UUFDekIsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsTUFBTTtLQUNkO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLE1BQU07S0FDZDtJQUNELElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQ3pCLFNBQVMsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPO0lBQy9CLFNBQVMsRUFBRSxJQUFJO0lBQ2YsU0FBUyxFQUFFLElBQUk7Q0FDbEIsQ0FBQyxDQUFBO0FBRUYsSUFBQSxnQkFBSyxFQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQSJ9