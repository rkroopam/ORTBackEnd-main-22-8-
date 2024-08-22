import {
    Schema,
    model
} from 'mongoose';

const business = new Schema({
    name: {
        type: Schema.Types.String,
        enum: ['b2b', 'b2c'],
        required: true,
    },
    createdAt: Date,
    updatedAt: Date
})

model('business', business)
