import {
    Schema,
    model
} from 'mongoose';
import { IUserRelationDocument } from '../typings/userRelation';

const userRelation = new Schema<IUserRelationDocument>({
    userId: { // this can be student, teacher, admin, superAdmin
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    teacherUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    adminUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    superAdminUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: Date,
    updatedAt: Date
})

model('userRelation', userRelation);