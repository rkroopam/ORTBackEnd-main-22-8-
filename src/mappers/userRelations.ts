import { isObjectIdValid } from "../helpers/utility";
import { IUserDocument } from "../typings/user";
import { IUserRelationDocument } from "../typings/userRelation";
import { toUserModelShort } from "./users";

export const toUserRelationModel = (userRelationData: IUserRelationDocument) => {
	const {
		adminUserId,
		createdAt,
		superAdminUserId,
		teacherUserId,
		updatedAt,
		userId,
		_id,
		id
	} = userRelationData;

	const data: any = {
		id: (id || _id)?.toString(),
		updatedAt,
		createdAt,
	}

	if (superAdminUserId) {
		if (isObjectIdValid(superAdminUserId) && !superAdminUserId.fName) {
			data.superAdminUserId = superAdminUserId.toString();
		}
		else {
			data.superAdminUserId = toUserModelShort(superAdminUserId as IUserDocument);
		}
	}

	if (adminUserId) {
		if (isObjectIdValid(adminUserId) && !adminUserId.fName) {
			data.adminUserId = adminUserId.toString();
		}
		else {
			data.adminUserId = toUserModelShort(adminUserId as IUserDocument);
		}
	}

	if (teacherUserId) {
		if (isObjectIdValid(teacherUserId) && !teacherUserId.fName) {
			data.teacherUserId = teacherUserId.toString();
		}
		else {
			data.teacherUserId = toUserModelShort(teacherUserId as IUserDocument);
		}
	}

	if (userId) {
		if (isObjectIdValid(userId) && !userId.fName) {
			data.userId = userId.toString();
		}
		else {
			data.userId = toUserModelShort(userId as IUserDocument);
		}
	}

	return data;
}

export const toUserRelationListModels = (grades: IUserRelationDocument[]) => grades.map(item => toUserRelationModel(item))