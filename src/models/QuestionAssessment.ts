import {
    Schema,
    model
} from 'mongoose';

const questionAssessment = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'question'
    },
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'test'
    },
    correctAnswer: Schema.Types.String,
    selectedAnswer: Schema.Types.String,
    numberOfTrialsPerformed: Schema.Types.Number,
    isCorrect: {
        type: Schema.Types.Boolean,
        default: false,
    },
    isFilled: {
        type: Schema.Types.Boolean,
        default: false,
    },
    timeTaken: {
        type: Schema.Types.Number,
        default: 0 // in milliseconds
    },
    createdAt: Date,
    updatedAt: Date
})

model('questionAssessment', questionAssessment)