import { Response, Request } from "express";
import { IUserDocument } from "./user";

export interface IExpressModifiedResponse extends Response {
    failure: (message: string) => void
    success: (message: string) => void
    data: (data: any) => void
    page: (items: any[], total?: number, pageNo?: number, totalRecordsCount?: number) => void
}

export interface IExpressModifiedRequest extends Request {
    userData: IUserDocument,
    rolesOfUser: {
        user: String[],
        grade: String[],
    }
}

export type VoidFn = () => void;
export type NextCBFn = (err: string | null) => void;
