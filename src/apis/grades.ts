import mongoose from "mongoose";
import { IExpressModifiedRequest, IExpressModifiedResponse } from "../typings/utiltity";
import { toGradeListModels, toGradeModel } from "../mappers/grades";

const { grade } = mongoose.models

export const getGrades = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  try {
    return grade.find().then((grades) => res.page(toGradeListModels(grades)))
  } catch (error: any) {
    res.failure(error)
  }
}