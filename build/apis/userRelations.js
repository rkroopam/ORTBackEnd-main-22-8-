"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTeacherToStudent = exports.assignAdminToStudent = exports.getUserRelations = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userRelations_1 = require("../mappers/userRelations");
const utility_1 = require("../helpers/utility");
const { userRelation, user } = mongoose_1.default.models;
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
const getUserRelations = (req, res) => {
    const { userId } = req.params;
    return user.findById(userId).then((userData) => {
        if (!userData)
            throw 'no user found';
        const findOneQuery = {
            userId,
        };
        return userRelation
            .findOne(findOneQuery)
            .populate('teacherUserId adminUserId superAdminUserId');
    })
        .then((userRelation) => {
        return res.data((0, userRelations_1.toUserRelationModel)(userRelation));
    })
        .catch(err => res.failure(err));
};
exports.getUserRelations = getUserRelations;
const assignAdminToStudent = (req, res) => {
    const { studentId, adminId } = req.params;
    return Promise.all([
        user.findById((0, utility_1.getObjectId)(studentId)),
        user.findById((0, utility_1.getObjectId)(adminId))
    ]).then((dataList) => {
        const student = dataList[0];
        const admin = dataList[1];
        if (!student)
            throw 'no student found';
        if (!admin)
            throw 'no admin found';
        return userRelation.findOne({
            userId: studentId
        }).then((relation) => {
            if (!relation) {
                throw 'relation not found';
            }
            relation.adminUserId = (0, utility_1.getObjectId)(adminId);
            return relation.save();
        });
    }).then(() => {
        res.success('Admin assigned successfully to student');
    }).catch(err => res.failure(err));
};
exports.assignAdminToStudent = assignAdminToStudent;
const assignTeacherToStudent = (req, res) => {
    const { studentId, teacherId } = req.params;
    return Promise.all([
        user.findById((0, utility_1.getObjectId)(studentId)),
        user.findById((0, utility_1.getObjectId)(teacherId))
    ]).then((dataList) => {
        const student = dataList[0];
        const teacher = dataList[1];
        if (!student)
            throw 'no student found';
        if (!teacher)
            throw 'no teacher found';
        return userRelation.findOne({
            userId: studentId
        }).then((relation) => {
            if (!relation) {
                throw 'relation not found';
            }
            relation.teacherUserId = (0, utility_1.getObjectId)(teacherId);
            return relation.save();
        });
    }).then(() => {
        res.success('Teacher assigned successfully to student');
    }).catch(err => res.failure(err));
};
exports.assignTeacherToStudent = assignTeacherToStudent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlbGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGlzL3VzZXJSZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQWdDO0FBR2hDLDREQUErRDtBQUMvRCxnREFBa0Y7QUFHbEYsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsR0FBRyxrQkFBUSxDQUFDLE1BQU0sQ0FBQTtBQUU5Qyx1R0FBdUc7QUFDdkcsWUFBWTtBQUNaLGNBQWM7QUFDZCxxQkFBcUI7QUFDckIsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUVqQixrRkFBa0Y7QUFDbEYsd0NBQXdDO0FBQ3hDLG1EQUFtRDtBQUNuRCxNQUFNO0FBRU4sdUJBQXVCO0FBQ3ZCLDZCQUE2QjtBQUM3Qix1Q0FBdUM7QUFDdkMsVUFBVTtBQUNWLHFCQUFxQjtBQUNyQiwrQkFBK0I7QUFDL0IsU0FBUztBQUNULE1BQU07QUFFTixpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLGtEQUFrRDtBQUNsRCw2REFBNkQ7QUFFN0QsZ0NBQWdDO0FBQ2hDLDhDQUE4QztBQUM5QyxVQUFVO0FBRVYsa0NBQWtDO0FBQ2xDLGtCQUFrQjtBQUNsQiw0RUFBNEU7QUFDNUUsc0VBQXNFO0FBQ3RFLDRDQUE0QztBQUM1QyxpQ0FBaUM7QUFDakMsV0FBVztBQUNYLGtCQUFrQjtBQUNsQixnREFBZ0Q7QUFDaEQsdUNBQXVDO0FBQ3ZDLDZFQUE2RTtBQUM3RSw4QkFBOEI7QUFDOUIsYUFBYTtBQUNiLFNBQVM7QUFDVCxvRUFBb0U7QUFDcEUsc0VBQXNFO0FBRXRFLHVEQUF1RDtBQUN2RCw4QkFBOEI7QUFFOUIsbUNBQW1DO0FBQ25DLFNBQVM7QUFDVCw4REFBOEQ7QUFDOUQsa0VBQWtFO0FBQ2xFLFNBQVM7QUFDVCw2QkFBNkI7QUFDN0IsMEJBQTBCO0FBQzFCLFVBQVU7QUFDVixJQUFJO0FBRUosdUdBQXVHO0FBQ3ZHLFlBQVk7QUFDWixjQUFjO0FB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