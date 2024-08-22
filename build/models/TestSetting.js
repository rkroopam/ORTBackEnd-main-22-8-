"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testSetting = new mongoose_1.Schema({
    stage: mongoose_1.Schema.Types.Number,
    level: mongoose_1.Schema.Types.Number,
    testType: {
        type: String,
        enum: ['SoundMatch', 'VisualMatch'], // more to add
    },
    testSubType: {
        type: String,
        enum: ['RhymingWords', 'BeginningSoundsInWords'], // more to add
    },
    matchType: {
        type: String,
        enum: ['WarmUp', 'Main'], // more to add
    },
    gradeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'grade'
    },
    minTrailToPass: mongoose_1.Schema.Types.Number,
    title: mongoose_1.Schema.Types.String,
    numberOfQuestions: mongoose_1.Schema.Types.Number,
    numberOfErrorsAllowed: mongoose_1.Schema.Types.Number,
    numberOfCoinsPass: mongoose_1.Schema.Types.Number,
    numberOfCoinsPerfect: mongoose_1.Schema.Types.Number,
    answerLength: mongoose_1.Schema.Types.Number,
    accuracyPassCriteria: mongoose_1.Schema.Types.Number,
    isfluencyPassCriteriaEnable: mongoose_1.Schema.Types.Boolean,
    isAccuracyPassCriteriaEnable: mongoose_1.Schema.Types.Boolean,
    oneShotPass: mongoose_1.Schema.Types.Boolean,
    inRowCondition: mongoose_1.Schema.Types.Boolean,
    perQuestionTimeoutMSecs: mongoose_1.Schema.Types.Number,
    instructionLink: mongoose_1.Schema.Types.String,
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('testSetting', testSetting);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFNldHRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1Rlc3RTZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBR2tCO0FBRWxCLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU0sQ0FBQztJQUMzQixLQUFLLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUMxQixLQUFLLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUMxQixRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsRUFBRSxjQUFjO0tBQ3REO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsd0JBQXdCLENBQUMsRUFBRSxjQUFjO0tBQ25FO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsY0FBYztLQUMzQztJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxPQUFPO0tBQ2Y7SUFDRCxjQUFjLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUNuQyxLQUFLLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUMxQixpQkFBaUIsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQ3RDLHFCQUFxQixFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDMUMsaUJBQWlCLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUN0QyxvQkFBb0IsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQ3pDLFlBQVksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQ2pDLG9CQUFvQixFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDekMsMkJBQTJCLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTztJQUNqRCw0QkFBNEIsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPO0lBQ2xELFdBQVcsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPO0lBQ2pDLGNBQWMsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPO0lBQ3BDLHVCQUF1QixFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDNUMsZUFBZSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDcEMsU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQUE7QUFFRixJQUFBLGdCQUFLLEVBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDIn0=