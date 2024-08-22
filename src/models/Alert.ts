import {
    Schema,
    model
} from 'mongoose';

const alert = new Schema({
    createdByUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdForUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    scheduledOnDate: Date,
    runOnDate: Date,
    alertType: {
        type: Schema.Types.String,
        enum: ['paymentReminder', 'practiceReminder']
    },
    status: {
        type: Schema.Types.String,
        enum: ['scheduled', 'inProcess', 'success', 'failure'],
        default: 'scheduled'
    },
    createdAt: Date,
    updatedAt: Date
})

model('alert', alert)
