import { IGradeDocument } from "../typings/grade"

export const toGradeModel = (userData: IGradeDocument) => {
	const {
		label,
		number,
		_id,
		id
	} = userData;

	const data = {
		id: (id || _id)?.toString(),
		label,
		number,
	}

	return data;
}

export const toGradeListModels = (grades: IGradeDocument[]) => grades.map(item => toGradeModel(item))