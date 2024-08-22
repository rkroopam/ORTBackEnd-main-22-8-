
import { IExpressModifiedRequest, IExpressModifiedResponse, NextCBFn } from "../typings/utiltity";
import { EUserTypes } from "../typings/user";


const getRolesofUser = (userType: EUserTypes) => {
  const roles = {
    'superAdmin': {
      user: [
        'POST_api/users/signup', 'POST_api/users/signin',
        'POST_api/users/sendMailforResetPassword',
        'GET_api/users/verifyMail', 'POST_api/users/resetPassword',
        'POST_api/users/createAdmin',
        'POST_api/users/createTeacher',
        'PUT_api/users/updateTeacher/:teacherId',
        'PUT_api/users/updateAdmin/:adminId',
        'GET_api/users/getAllAdmins',
        'GET_api/users/getAllTeachers',
        'GET_api/users/getAllStudents',
        'DELETE_api/users/deleteAdmin/:adminId',
        'DELETE_api/users/deleteTeacher/:teacherId',
      ],
      grade: [
        'GET_api/grades'
      ],
      userRelation: [
        'PUT_api/userRelations/assignAdminToStudent/:studentId/:adminId',
        'PUT_api/userRelations/assignTeacherToStudent/:studentId/:teacherId',
        'GET_api/userRelations/getUserRelations/:userId',
      ],
      paymentModels: [
        'GET_api/paymentModels',
        'PUT_api/paymentModels/:paymentModelId',
        'POST_api/paymentModels',
      ]
    },
    'admin': {
      user: [
        'POST_api/users/signup', 'POST_api/users/signin',
        'POST_api/users/sendMailforResetPassword',
        'GET_api/users/verifyMail', 'POST_api/users/resetPassword',
        'POST_api/users/createTeacher', 'PUT_api/users/updateTeacher/:teacherId',
        'GET_api/users/getAllTeachers',
        'GET_api/users/getAllStudents',
        'DELETE_api/users/deleteTeacher/:teacherId',
      ],
      grade: [
        'GET_api/grades'
      ],
      userRelation: [
        'PUT_api/userRelations/assignTeacherToStudent/:studentId/:teacherId',
        'GET_api/userRelations/getUserRelations/:userId',
      ],
      paymentModels: [
        'GET_api/paymentModels',
      ]
    },
    'teacher': {
      user: [
        'POST_api/users/signup', 'POST_api/users/signin',
        'POST_api/users/sendMailforResetPassword',
        'GET_api/users/verifyMail', 'POST_api/users/resetPassword',
        'GET_api/users/getAllStudents',
      ],
      grade: [
        'GET_api/grades'
      ],
      userRelation: [],
      paymentModels: [
        'GET_api/paymentModels',
      ]
    },
    'student': {
      user: [
        'POST_api/users/signup', 'POST_api/users/signin',
        'POST_api/users/sendMailforResetPassword',
        'GET_api/users/verifyMail', 'POST_api/users/resetPassword',
      ],
      grade: [
        'GET_api/grades'
      ],
      userRelation: [],
      paymentModels: [
        'GET_api/paymentModels',
      ]
    },
  }

  return roles[userType];
}

export const userAuthorization = (req: IExpressModifiedRequest, res: IExpressModifiedResponse, next: NextCBFn) => {
  const { userData } = req

  if (!userData) return next('no user found');
  const { userType } = userData;
  const modifiedOriginalURL = req.route.path.replace(/^\/|\/$/g, '')
  const askingAccessFor = `${req.method}_${modifiedOriginalURL}`
  const rolesOfUser = getRolesofUser(userType);
  const totalRoles = [
    ...rolesOfUser.grade,
    ...rolesOfUser.user,
    ...rolesOfUser.userRelation,
    ...rolesOfUser.paymentModels
  ]

  if (!totalRoles.includes(askingAccessFor)) {
    return res.failure('You dont have access for this action!')
  }

  return next(null);
};