import { isObjectIdValid } from "../helpers/utility";
import { IUserDocument } from "../typings/user"


export const toSelfUserModel = (userData: IUserDocument) => {
	const {
		token,
		password,
	} = userData;

	const data = {
		...toUserModel(userData),
		token,
		password
	};
	return data
}

export const toUserModelShort = (userData: IUserDocument) => {
	const {
		id,
		_id,
		fName,
		lName,
		userType,
	} = userData;

	const data = {
		id: (id || _id)?.toString(),
		fName,
		lName,
		userType,
	}

	return data;
}

export const toUserModel = (userData: IUserDocument) => {
	const {
		id,
		_id,
		age,
		businessId,
		country,
		createdAt,
		email, fName, grade, gradeId, isLicensed,
		lName, phoneCountryCode, phoneNumber,
		updatedAt, userType, username
	} = userData;

	const data: any = {
		id: (id || _id)?.toString(),
		age,
		businessId: null,
		country,
		createdAt,
		email, fName, grade,
		gradeId: null,
		isLicensed,
		lName, phoneCountryCode, phoneNumber,
		updatedAt, userType, username
	}

	if (businessId) {
		if (isObjectIdValid(businessId)) {
			data.businessId = businessId.toString();
		}
		else {
			data.businessId = {
				id: (businessId.id || businessId._id)?.toString(),
				name: businessId.name,
			};
		}
	}

	if (gradeId) {
		if (isObjectIdValid(gradeId)) {
			data.gradeId = gradeId.toString() as string;
		}
		else {
			data.gradeId = {
				id: (gradeId._id || gradeId._id)?.toString(),
				label: gradeId.label,
				number: gradeId.number,
			};
		}
	}

	return data;
}

export const toUserListModels = (userList: IUserDocument[]) => userList.map(user => toUserModel(user))
