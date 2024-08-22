"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionAssessment = new mongoose_1.Schema({
    questionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'question'
    },
    testId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'test'
    },
    correctAnswer: mongoose_1.Schema.Types.String,
    selectedAnswer: mongoose_1.Schema.Types.String,
    numberOfTrialsPerformed: mongoose_1.Schema.Types.Number,
    isCorrect: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    isFilled: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    timeTaken: {
        type: mongoose_1.Schema.Types.Number,
        default: 0 // in milliseconds
    },
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('questionAssessment', questionAssessment);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVlc3Rpb25Bc3Nlc3NtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9RdWVzdGlvbkFzc2Vzc21lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FHa0I7QUFFbEIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDbEMsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLFVBQVU7S0FDbEI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsTUFBTTtLQUNkO0lBQ0QsYUFBYSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDbEMsY0FBYyxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDbkMsdUJBQXVCLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUM1QyxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTztRQUMxQixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPO1FBQzFCLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsT0FBTyxFQUFFLENBQUMsQ0FBQyxrQkFBa0I7S0FDaEM7SUFDRCxTQUFTLEVBQUUsSUFBSTtJQUNmLFNBQVMsRUFBRSxJQUFJO0NBQ2xCLENBQUMsQ0FBQTtBQUVGLElBQUEsZ0JBQUssRUFBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBIn0=