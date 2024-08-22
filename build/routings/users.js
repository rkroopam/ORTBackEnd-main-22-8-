"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../middlewares/authentication");
const authorization_1 = require("../middlewares/authorization");
const userRouter = (app) => {
    const api = app.appRouter;
    api.model('users')
        .register([{
            action: 'POST',
            method: 'signup',
            url: '/signup',
            filters: [],
        }, {
            action: 'POST',
            method: 'signin',
            url: '/signin',
            filters: [],
        }, {
            action: 'POST',
            method: 'sendMailforResetPassword',
            url: '/sendMailforResetPassword',
            filters: [],
        }, {
            action: 'GET',
            method: 'verifyMail',
            url: '/verifyMail',
            filters: [authentication_1.authenticateViaToken],
        }, {
            action: 'POST',
            method: 'resetPassword',
            url: '/resetPassword',
            filters: [authentication_1.authenticateViaToken],
        }, {
            action: 'GET',
            method: 'testMail',
            url: '/testMail',
            filters: [authentication_1.authenticateViaToken],
        }, {
            action: 'GET',
            method: 'getAllAdmins',
            url: '/getAllAdmins',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'GET',
            method: 'getAllTeachers',
            url: '/getAllTeachers',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'GET',
            method: 'getAllStudents',
            url: '/getAllStudents',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'POST',
            method: 'createAdmin',
            url: '/createAdmin',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'POST',
            method: 'createTeacher',
            url: '/createTeacher',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'PUT',
            method: 'updateTeacher',
            url: '/updateTeacher/:teacherId',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'PUT',
            method: 'updateAdmin',
            url: '/updateAdmin/:adminId',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'DELETE',
            method: 'deleteAdmin',
            url: '/deleteAdmin/:adminId',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'DELETE',
            method: 'deleteTeacher',
            url: '/deleteTeacher/:teacherId',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }]);
};
exports.default = userRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGluZ3MvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrRUFBcUU7QUFDckUsZ0VBQWlFO0FBRWpFLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDNUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUMxQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUNiLFFBQVEsQ0FBQyxDQUFDO1lBQ1AsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsUUFBUTtZQUNoQixHQUFHLEVBQUUsU0FBUztZQUNkLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFBRTtZQUNDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLFFBQVE7WUFDaEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQUU7WUFDQyxNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSwwQkFBMEI7WUFDbEMsR0FBRyxFQUFFLDJCQUEyQjtZQUNoQyxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQUU7WUFDQyxNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLE9BQU8sRUFBRSxDQUFDLHFDQUFvQixDQUFDO1NBQ2xDLEVBQUU7WUFDQyxNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0I7WUFDckIsT0FBTyxFQUFFLENBQUMscUNBQW9CLENBQUM7U0FDbEMsRUFBRTtZQUNDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLFVBQVU7WUFDbEIsR0FBRyxFQUFFLFdBQVc7WUFDaEIsT0FBTyxFQUFFLENBQUMscUNBQW9CLENBQUM7U0FDbEMsRUFBRTtZQUNDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLGNBQWM7WUFDdEIsR0FBRyxFQUFFLGVBQWU7WUFDcEIsT0FBTyxFQUFFLENBQUMscUNBQW9CLEVBQUUsaUNBQWlCLENBQUM7U0FDckQsRUFBRTtZQUNDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixHQUFHLEVBQUUsaUJBQWlCO1lBQ3RCLE9BQU8sRUFBRSxDQUFDLHFDQUFvQixFQUFFLGlDQUFpQixDQUFDO1NBQ3JELEVBQUU7WUFDQyxNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsR0FBRyxFQUFFLGlCQUFpQjtZQUN0QixPQUFPLEVBQUUsQ0FBQyxxQ0FBb0IsRUFBRSxpQ0FBaUIsQ0FBQztTQUNyRCxFQUFFO1lBQ0MsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsYUFBYTtZQUNyQixHQUFHLEVBQUUsY0FBYztZQUNuQixPQUFPLEVBQUUsQ0FBQyxxQ0FBb0IsRUFBRSxpQ0FBaUIsQ0FBQztTQUNyRCxFQUFFO1lBQ0MsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsZUFBZTtZQUN2QixHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLE9BQU8sRUFBRSxDQUFDLHFDQUFvQixFQUFFLGlDQUFpQixDQUFDO1NBQ3JELEVBQUU7WUFDQyxNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLEdBQUcsRUFBRSwyQkFBMkI7WUFDaEMsT0FBTyxFQUFFLENBQUMscUNBQW9CLEVBQUUsaUNBQWlCLENBQUM7U0FDckQsRUFBRTtZQUNDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLGFBQWE7WUFDckIsR0FBRyxFQUFFLHVCQUF1QjtZQUM1QixPQUFPLEVBQUUsQ0FBQyxxQ0FBb0IsRUFBRSxpQ0FBaUIsQ0FBQztTQUNyRCxFQUFFO1lBQ0MsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLGFBQWE7WUFDckIsR0FBRyxFQUFFLHVCQUF1QjtZQUM1QixPQUFPLEVBQUUsQ0FBQyxxQ0FBb0IsRUFBRSxpQ0FBaUIsQ0FBQztTQUNyRCxFQUFFO1lBQ0MsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsR0FBRyxFQUFFLDJCQUEyQjtZQUNoQyxPQUFPLEVBQUUsQ0FBQyxxQ0FBb0IsRUFBRSxpQ0FBaUIsQ0FBQztTQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQTtBQUVELGtCQUFlLFVBQVUsQ0FBQSJ9