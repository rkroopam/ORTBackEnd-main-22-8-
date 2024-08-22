import {
    Schema,
    model
} from 'mongoose';

const payment = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    paymentModleId: {
        type: Schema.Types.ObjectId,
        ref: 'paymentModel'
    },
    paymentMode: {
        type: Schema.Types.String,
        enum: ['net-banking', 'debit-card', 'credit-card']
    },
    transactionAmount: Schema.Types.Number,
    paymentInitiatedForUsersCount: {
        type: Schema.Types.Number,
        default: 1
    },
    currency: Schema.Types.String,
    paymentSuccessDate: Date,
    paymentValidTillDate: Date,
    status: {
        type: Schema.Types.String,
        enum: ['initiated', 'inProcess', 'success', 'failure']
    },
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'file'
    },
    statusTransactions: [{
        status: Schema.Types.String,
        date: Date,
        note: Schema.Types.String,
    }],
    createdAt: Date,
    updatedAt: Date
})

model('payment', payment)