import {
    Schema,
    model
} from 'mongoose';

const question = new Schema({
    gradeId: {
        type: Schema.Types.ObjectId,
        ref: 'grade'
    },
    questionDescription: {
        text: Schema.Types.String,
        audios: [{
            type: Schema.Types.ObjectId,
            ref: 'file'
        }]
    },
    options: [{
        text: Schema.Types.String,
        isCorrect: Schema.Types.Boolean,
        audios: [{
            type: Schema.Types.ObjectId,
            ref: 'file'
        }]
    }],
    isMultiple: {
        type: Schema.Types.Boolean,
        default: false,
    },
    isPublic: {
        type: Schema.Types.Boolean,
        default: true,
    },
    createdAt: Date,
    updatedAt: Date
})

model('question', question)