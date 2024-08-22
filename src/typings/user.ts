import { IBusinessDocument } from "./business"
import { IGradeDocument } from "./grade";
import { Model, Document } from 'mongoose';
import { IUserRelationDocument } from "./userRelation";


export enum EUserTypes {
    'superAdmin' = 'superAdmin',
    'admin' = 'admin',
    'teacher' = 'teacher',
    'student' = 'student',
}

export interface IUserDocument extends Document {
    id?: string
    _id?: string
    fName: string
    lName: string
    age: number
    email: string
    country: string
    phoneCountryCode: string
    phoneNumber: string
    grade: string
    username: string
    password: string
    token: string
    gradeId?: IGradeDocument
    userType: EUserTypes
    isEmailVerified: boolean,
    isLicensed: boolean
    businessId?: IBusinessDocument
    userRelationId?: IUserRelationDocument
    createdAt?: number | Date
    updatedAt?: number | Date
}

export interface IUserModel extends Model<IUserDocument> {
    buildToken(userId: string): Promise<string>;
    verifyToken(token: any): Promise<string>;
}

export interface IUserSignUpBodyReq {
    fName: string
    lName: string
    age: number
    email: string
    country: string
    phoneCountryCode: string
    phoneNumber: string
    gradeId: string
    password: string
}

export interface IUserSignInBodyReq {
    username?: string
    email?: string
    password: string
}

export interface IUserPasswordChangeBodyReq {
    password: string
}
