import {
    Schema,
    model
} from 'mongoose';
import { IPaymentModelDocument } from '../typings/paymentModel';

const paymentModel = new Schema<IPaymentModelDocument>({
    name: {
        type: String  
    },
    businessId: {
        type: Schema.Types.ObjectId,
        ref: 'business'
    },
    period: {
        type: String,
        enum: ['monthly', 'quarterly', 'half-yearly', 'yearly'],
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive',],
    },
    perHeadAmount: Schema.Types.Number,
    currency: {
        type: Schema.Types.String,
        default: 'USD' // US Dollar
    },
    createdAt: Date,
    updatedAt: Date
})

model('paymentModel', paymentModel)