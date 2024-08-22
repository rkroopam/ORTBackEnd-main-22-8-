"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const file = new mongoose_1.Schema({
    fileName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    fileType: {
        type: mongoose_1.Schema.Types.String,
        enum: ['invoice', 'questionOrQuestionOption']
    },
    mimeType: mongoose_1.Schema.Types.String,
    fileSizeInKB: mongoose_1.Schema.Types.Number,
    URL: mongoose_1.Schema.Types.String,
    bucketName: mongoose_1.Schema.Types.String,
    // isPublic: {
    //     type: Schema.Types.Boolean,
    //     default: true,
    // },
    createdByUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('file', file);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUdrQjtBQUVsQixNQUFNLElBQUksR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDcEIsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUN6QixJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUM7S0FDaEQ7SUFDRCxRQUFRLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUM3QixZQUFZLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUNqQyxHQUFHLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUN4QixVQUFVLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUMvQixjQUFjO0lBQ2Qsa0NBQWtDO0lBQ2xDLHFCQUFxQjtJQUNyQixLQUFLO0lBQ0wsZUFBZSxFQUFFO1FBQ2IsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLE1BQU07S0FDZDtJQUNELFNBQVMsRUFBRSxJQUFJO0lBQ2YsU0FBUyxFQUFFLElBQUk7Q0FDbEIsQ0FBQyxDQUFBO0FBRUYsSUFBQSxnQkFBSyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQSJ9