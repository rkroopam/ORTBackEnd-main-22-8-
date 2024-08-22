import mongoose from "mongoose";
import { IExpressModifiedRequest, IExpressModifiedResponse } from "../typings/utiltity";
import { IUserDocument } from "../typings/user";
import { toUserRelationModel } from "../mappers/userRelations";
import { checkValueOfKeysIsPresentInData, getObjectId } from "../helpers/utility";
import { IUserRelationDocument } from "../typings/userRelation";

const { userRelation, user } = mongoose.models

// export const createUserRelation = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
//   const {
//     userId,
//     teacherUserId,
//     adminUserId,
//   } = req.body

//   const bodyValueResponse = checkValueOfKeysIsPresentInData(req.body, [userId])
//   if (!bodyValueResponse.isSuccess) {
//     return res?.failure(bodyValueResponse.error)
//   }

//   const promises = [
//     userRelation.findOne({
//       'userId': getObjectId(userId),
//     }),
//     user.findOne({
//       userType: 'superAdmin'
//     })
//   ]

//   return Promise.all(promises)
//     .then((dataList: any) => {
//       const [userRelationData, superAdminData]:
//         [IUserRelationDocument, IUserDocument] = dataList;

//       if (userRelationData) {
//         throw 'User relation already exist'
//       }

//       return new userRelation({
//         userId,
//         teacherUserId: teacherUserId ? getObjectId(teacherUserId) : null,
//         adminUserId: adminUserId ? getObjectId(adminUserId) : null,
//         superAdminUserId: superAdminData,
//         createdAt: Date.now(),
//       })
//         .save()
//         .then((newUserRelationData: any) => {
//           return newUserRelationData
//             .populate('userId teacherUserId adminUserId superAdminUserId')
//             .execPopulate()
//         })
//     })
//     .then(async (newUserRelationData: IUserRelationDocument) => {
//       const userdata = newUserRelationData.userId as IUserDocument;

//       userdata.userRelationId = newUserRelationData;
//       await userdata.save()

//       return newUserRelationData
//     })
//     .then((newUserRelationData: IUserRelationDocument) => {
//       return res.data(toUserRelationModel(newUserRelationData))
//     })
//     .catch((err: any) => {
//       res.failure(err);
//     });
// }

// export const updateUserRelation = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
//   const {
//     userId,
//     teacherUserId,
//     adminUserId,
//   } = req.body

//   const bodyValueResponse = checkValueOfKeysIsPresentInData(req.body, [userId])

//   if (!bodyValueResponse.isSuccess) {
//     return res?.failure(bodyValueResponse.error)
//   }

//   userRelation.findOneAndUpdate({
//     'userId': getObjectId(userId),
//   }, {
//     $set: {
//       teacherUserId: teacherUserId ? getObjectId(teacherUserId) : null,
//       adminUserId: adminUserId ? getObjectId(adminUserId) : null,
//     }
//   }, {
//     new: true
//   })
//     .populate('teacherUserId adminUserId superAdminUserId')
//     .then((userRelationData: IUserRelationDocument) => {
//       return res.data(toUserRelationModel(userRelationData))
//     })
//     .catch(err => res.failure(err))
// }

export const getUserRelations = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { userId } = req.params;

  return user.findById(userId).then((userData: IUserDocument) => {
    if (!userData) throw 'no user found'

    const findOneQuery: any = {
      userId,
    }

    return userRelation
      .findOne(findOneQuery)
      .populate('teacherUserId adminUserId superAdminUserId')
  })
    .then((userRelation: IUserRelationDocument) => {
      return res.data(toUserRelationModel(userRelation))
    })
    .catch(err => res.failure(err))
}

export const assignAdminToStudent = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { studentId, adminId } = req.params

  return Promise.all([
    user.findById(getObjectId(studentId)),
    user.findById(getObjectId(adminId))
  ]).then((dataList) => {
    const student = dataList[0]
    const admin = dataList[1]

    if (!student) throw 'no student found'
    if (!admin) throw 'no admin found'

    return userRelation.findOne({
      userId: studentId
    }).then((relation: any) => {
      if (!relation) {
        throw 'relation not found'
      }

      relation.adminUserId = getObjectId(adminId);
      return relation.save()
    })
  }).then(() => {
    res.success('Admin assigned successfully to student')
  }).catch(err => res.failure(err))
}

export const assignTeacherToStudent = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { studentId, teacherId } = req.params

  return Promise.all([
    user.findById(getObjectId(studentId)),
    user.findById(getObjectId(teacherId))
  ]).then((dataList) => {
    const student = dataList[0]
    const teacher = dataList[1]

    if (!student) throw 'no student found'
    if (!teacher) throw 'no teacher found'

    return userRelation.findOne({
      userId: studentId
    }).then((relation: any) => {
      if (!relation) {
        throw 'relation not found'
      }

      relation.teacherUserId = getObjectId(teacherId);
      return relation.save()
    })
  }).then(() => {
    res.success('Teacher assigned successfully to student')
  }).catch(err => res.failure(err))
}
