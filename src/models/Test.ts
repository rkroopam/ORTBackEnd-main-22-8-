import {
    Schema,
    model,
} from 'mongoose';

const test = new Schema({
    name: Schema.Types.String,
    gradeId: {
        type: Schema.Types.ObjectId,
        ref: 'grade'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    testSettingsId: {
        type: Schema.Types.ObjectId,
        ref: 'testSetting'
    },
    // isAutoGenrated: Schema.Types.Boolean,
    questionAssessments: {
        type: Schema.Types.ObjectId,
        ref: 'questionAssessment'
    },
    correctAnswersCount: {
        type: Schema.Types.Number,
        default: 0
    },
    wrongAnswersCount: {
        type: Schema.Types.Number,
        default: 0
    },
    skippAnswerCount: {
        type: Schema.Types.Number,
        default: 0
    },
    timeTaken: {
        type: Schema.Types.Number,
        default: 0 // in milliseconds
    },
    createdAt: Date,
    updatedAt: Date
})

model('test', test);
