"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthorization = void 0;
const getRolesofUser = (userType) => {
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
    };
    return roles[userType];
};
const userAuthorization = (req, res, next) => {
    const { userData } = req;
    if (!userData)
        return next('no user found');
    const { userType } = userData;
    const modifiedOriginalURL = req.route.path.replace(/^\/|\/$/g, '');
    const askingAccessFor = `${req.method}_${modifiedOriginalURL}`;
    const rolesOfUser = getRolesofUser(userType);
    const totalRoles = [
        ...rolesOfUser.grade,
        ...rolesOfUser.user,
        ...rolesOfUser.userRelation,
        ...rolesOfUser.paymentModels
    ];
    if (!totalRoles.includes(askingAccessFor)) {
        return res.failure('You dont have access for this action!');
    }
    return next(null);
};
exports.userAuthorization = userAuthorization;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9hdXRob3JpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLE1BQU0sY0FBYyxHQUFHLENBQUMsUUFBb0IsRUFBRSxFQUFFO0lBQzlDLE1BQU0sS0FBSyxHQUFHO1FBQ1osWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFO2dCQUNKLHVCQUF1QixFQUFFLHVCQUF1QjtnQkFDaEQseUNBQXlDO2dCQUN6QywwQkFBMEIsRUFBRSw4QkFBOEI7Z0JBQzFELDRCQUE0QjtnQkFDNUIsOEJBQThCO2dCQUM5Qix3Q0FBd0M7Z0JBQ3hDLG9DQUFvQztnQkFDcEMsNEJBQTRCO2dCQUM1Qiw4QkFBOEI7Z0JBQzlCLDhCQUE4QjtnQkFDOUIsdUNBQXVDO2dCQUN2QywyQ0FBMkM7YUFDNUM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsZ0JBQWdCO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGdFQUFnRTtnQkFDaEUsb0VBQW9FO2dCQUNwRSxnREFBZ0Q7YUFDakQ7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsdUJBQXVCO2dCQUN2Qix1Q0FBdUM7Z0JBQ3ZDLHdCQUF3QjthQUN6QjtTQUNGO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFO2dCQUNKLHVCQUF1QixFQUFFLHVCQUF1QjtnQkFDaEQseUNBQXlDO2dCQUN6QywwQkFBMEIsRUFBRSw4QkFBOEI7Z0JBQzFELDhCQUE4QixFQUFFLHdDQUF3QztnQkFDeEUsOEJBQThCO2dCQUM5Qiw4QkFBOEI7Z0JBQzlCLDJDQUEyQzthQUM1QztZQUNELEtBQUssRUFBRTtnQkFDTCxnQkFBZ0I7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osb0VBQW9FO2dCQUNwRSxnREFBZ0Q7YUFDakQ7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsdUJBQXVCO2FBQ3hCO1NBQ0Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUU7Z0JBQ0osdUJBQXVCLEVBQUUsdUJBQXVCO2dCQUNoRCx5Q0FBeUM7Z0JBQ3pDLDBCQUEwQixFQUFFLDhCQUE4QjtnQkFDMUQsOEJBQThCO2FBQy9CO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLGdCQUFnQjthQUNqQjtZQUNELFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRTtnQkFDYix1QkFBdUI7YUFDeEI7U0FDRjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRTtnQkFDSix1QkFBdUIsRUFBRSx1QkFBdUI7Z0JBQ2hELHlDQUF5QztnQkFDekMsMEJBQTBCLEVBQUUsOEJBQThCO2FBQzNEO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLGdCQUFnQjthQUNqQjtZQUNELFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRTtnQkFDYix1QkFBdUI7YUFDeEI7U0FDRjtLQUNGLENBQUE7SUFFRCxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUE7QUFFTSxNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBNEIsRUFBRSxHQUE2QixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQy9HLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFFeEIsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM1QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDO0lBQzlCLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNsRSxNQUFNLGVBQWUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksbUJBQW1CLEVBQUUsQ0FBQTtJQUM5RCxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsTUFBTSxVQUFVLEdBQUc7UUFDakIsR0FBRyxXQUFXLENBQUMsS0FBSztRQUNwQixHQUFHLFdBQVcsQ0FBQyxJQUFJO1FBQ25CLEdBQUcsV0FBVyxDQUFDLFlBQVk7UUFDM0IsR0FBRyxXQUFXLENBQUMsYUFBYTtLQUM3QixDQUFBO0lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUMxQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBcEJXLFFBQUEsaUJBQWlCLHFCQW9CNUIifQ==