import {
    Schema,
    model
} from 'mongoose';

const file = new Schema({
    fileName: {
        type: Schema.Types.String,
        required: true,
    },
    fileType: {
        type: Schema.Types.String,
        enum: ['invoice', 'questionOrQuestionOption']
    },
    mimeType: Schema.Types.String,
    fileSizeInKB: Schema.Types.Number,
    URL: Schema.Types.String,
    bucketName: Schema.Types.String,
    // isPublic: {
    //     type: Schema.Types.Boolean,
    //     default: true,
    // },
    createdByUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: Date,
    updatedAt: Date
})

model('file', file)
