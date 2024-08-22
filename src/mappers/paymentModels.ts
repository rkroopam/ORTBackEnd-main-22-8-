import { isObjectIdValid } from "../helpers/utility";
import { IPaymentModelDocument } from "../typings/paymentModel";

export const toPaymentModel = (paymentModelData: IPaymentModelDocument) => {
	const {
		businessId,
		createdAt,
		currency,
		perHeadAmount,
		period,
		updatedAt,
		name,
		_id,
		id,
		status,
	} = paymentModelData;

	const data: any = {
		id: (id || _id)?.toString(),
		createdAt,
		currency,
		perHeadAmount,
		period,
		name,
		status,
		updatedAt,
		businessId: null
	}

	if (businessId) {
		if (!(businessId?.name) && isObjectIdValid(businessId)) {
			data.businessId = businessId.toString();
		}
		else {
			data.businessId = {
				id: (businessId.id || businessId._id)?.toString(),
				name: businessId.name,
			};
		}
	}

	return data;
}

export const toPaymentModelList = (grades: IPaymentModelDocument[]) => grades.map(item => toPaymentModel(item))