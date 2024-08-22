import mongoose from "mongoose";
import { IExpressModifiedRequest, IExpressModifiedResponse } from "../typings/utiltity";
import { toPaymentModel, toPaymentModelList } from "../mappers/paymentModels";
import { INewPaymentModelReq, IUpdatePaymentModelReq } from "../typings/paymentModel";
import { checkValueOfKeysIsPresentInData, getObjectId } from "../helpers/utility";

const { paymentModel, business } = mongoose.models

export const getPaymentModels = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  try {
    const { status } = req.query
    const query: any = {};

    if (status) {
      query.status = status;
    }

    return paymentModel.find(query)
      .then((paymentModels) => res.page(toPaymentModelList(paymentModels)))
  } catch (error: any) {
    res.failure(error)
  }
}

export const createPaymentModel = async (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  try {
    const {
      period,
      perHeadAmount,
      name,
    }: INewPaymentModelReq = req.body

    const bodyValueResponse = checkValueOfKeysIsPresentInData(req.body, [
      'period',
      'name',
      'perHeadAmount',
    ])

    if (!bodyValueResponse.isSuccess) {
      return res?.failure(bodyValueResponse.error)
    }

    const businessId = await business.findOne({ name: 'b2c' })

    if (!businessId) {
      throw `no businessId found`
    }

    const isPaymentModelExistForRequiredPeriod = await paymentModel.findOne({
      businessId, period, status: 'active'
    })

    if (isPaymentModelExistForRequiredPeriod) {
      throw `paymentModel exist for ${period} period and is in active state`
    }

    return new paymentModel({
      period,
      perHeadAmount,
      businessId,
      name,
      currency: "USD",
      status: 'active'
    }).save()
      .then((newPaymentModel: any) => res.page(toPaymentModel(newPaymentModel)))
  } catch (error: any) {
    res.failure(error)
  }
}

// for to make PaymentModel inactive
export const updatePaymentModel = async (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  try {
    const { paymentModelId } = req.params;

    return paymentModel.findById(getObjectId(paymentModelId))
      .then(paymentModel => {
        if (!paymentModel) throw 'paymentModel not found'

        paymentModel.status = 'inactive';
        return paymentModel.save()
      })
      .then((paymentModel: any) => res.page(toPaymentModel(paymentModel)))
  } catch (error: any) {
    res.failure(error)
  }
}