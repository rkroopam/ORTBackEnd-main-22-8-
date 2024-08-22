import {
    Schema,
    model
} from 'mongoose';
import { IGradeDocument } from '../typings/grade';

const grade = new Schema<IGradeDocument>({
    label: {
        type: Schema.Types.String,
        required: true,
    },
    number: {
        type: Schema.Types.Number,
        required: true,
    },
    createdAt: Date,
    updatedAt: Date
})

// adding single index
grade.index({ number: 1 });

//pre tasks
grade.pre('save', function () {
    this.updatedAt = Date.now();
    return Promise.resolve(this);
});


model('grade', grade)
