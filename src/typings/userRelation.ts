import { IUserDocument } from "./user";

export interface IUserRelationDocument {
    id?: string
    _id?: string
    userId?: IUserDocument
    teacherUserId?: IUserDocument
    adminUserId?: IUserDocument
    superAdminUserId?: IUserDocument
    createdAt?: Date
    updatedAt?: Date
}

