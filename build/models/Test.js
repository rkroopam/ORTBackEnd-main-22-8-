"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const test = new mongoose_1.Schema({
    name: mongoose_1.Schema.Types.String,
    gradeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'grade'
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    testSettingsId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'testSetting'
    },
    // isAutoGenrated: Schema.Types.Boolean,
    questionAssessments: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'questionAssessment'
    },
    correctAnswersCount: {
        type: mongoose_1.Schema.Types.Number,
        default: 0
    },
    wrongAnswersCount: {
        type: mongoose_1.Schema.Types.Number,
        default: 0
    },
    skippAnswerCount: {
        type: mongoose_1.Schema.Types.Number,
        default: 0
    },
    timeTaken: {
        type: mongoose_1.Schema.Types.Number,
        default: 0 // in milliseconds
    },
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('test', test);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUdrQjtBQUVsQixNQUFNLElBQUksR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDcEIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDekIsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLE9BQU87S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxNQUFNO0tBQ2Q7SUFDRCxjQUFjLEVBQUU7UUFDWixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsYUFBYTtLQUNyQjtJQUNELHdDQUF3QztJQUN4QyxtQkFBbUIsRUFBRTtRQUNqQixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsb0JBQW9CO0tBQzVCO0lBQ0QsbUJBQW1CLEVBQUU7UUFDakIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELGlCQUFpQixFQUFFO1FBQ2YsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELGdCQUFnQixFQUFFO1FBQ2QsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLE9BQU8sRUFBRSxDQUFDLENBQUMsa0JBQWtCO0tBQ2hDO0lBQ0QsU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQUE7QUFFRixJQUFBLGdCQUFLLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDIn0=