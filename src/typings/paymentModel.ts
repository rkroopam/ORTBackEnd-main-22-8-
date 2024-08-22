import { IBusinessDocument } from "./business"

export interface IPaymentModelDocument {
    id?: string
    _id?: string
    name?: string
    status?: string
    businessId?: IBusinessDocument
    period?: string
    perHeadAmount?: number
    currency?: string
    createdAt?: Date
    updatedAt?: Date | number
}

export interface INewPaymentModelReq {
    period?: string
    name?: string
    perHeadAmount?: number
}

export interface IUpdatePaymentModelReq {
    status?: string
}