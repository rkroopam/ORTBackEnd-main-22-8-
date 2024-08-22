import {
    Schema,
    model
} from 'mongoose';

const testSetting = new Schema({
    stage: Schema.Types.Number,
    level: Schema.Types.Number,
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
        type: Schema.Types.ObjectId,
        ref: 'grade'
    },
    minTrailToPass: Schema.Types.Number,
    title: Schema.Types.String,
    numberOfQuestions: Schema.Types.Number,
    numberOfErrorsAllowed: Schema.Types.Number,
    numberOfCoinsPass: Schema.Types.Number,
    numberOfCoinsPerfect: Schema.Types.Number,
    answerLength: Schema.Types.Number,
    accuracyPassCriteria: Schema.Types.Number,
    isfluencyPassCriteriaEnable: Schema.Types.Boolean,
    isAccuracyPassCriteriaEnable: Schema.Types.Boolean,
    oneShotPass: Schema.Types.Boolean,
    inRowCondition: Schema.Types.Boolean,
    perQuestionTimeoutMSecs: Schema.Types.Number,
    instructionLink: Schema.Types.String,
    createdAt: Date,
    updatedAt: Date
})

model('testSetting', testSetting);
