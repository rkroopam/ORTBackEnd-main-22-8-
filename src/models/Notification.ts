import {
    Schema,
    model
} from 'mongoose';

const notification = new Schema({
    type: {
        type: String,
        enum: ['SuperAdmin',
            'Teacher', 'Student'],
        default: 'user'
    },
    sendToUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    sendByUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: Schema.Types.String,
    hasReaded: Schema.Types.Boolean,
    createdAt: Date,
    updatedAt: Date
})

model('notification', notification)
