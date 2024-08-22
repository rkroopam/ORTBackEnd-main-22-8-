import { authenticateViaToken } from "../middlewares/authentication";
import { userAuthorization } from "../middlewares/authorization";

const userRouter = (app: any) => {
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
            filters: [authenticateViaToken],
        }, {
            action: 'POST',
            method: 'resetPassword',
            url: '/resetPassword',
            filters: [authenticateViaToken],
        }, {
            action: 'GET',
            method: 'testMail',
            url: '/testMail',
            filters: [authenticateViaToken],
        }, {
            action: 'GET',
            method: 'getAllAdmins',
            url: '/getAllAdmins',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'GET',
            method: 'getAllTeachers',
            url: '/getAllTeachers',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'GET',
            method: 'getAllStudents',
            url: '/getAllStudents',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'POST',
            method: 'createAdmin',
            url: '/createAdmin',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'POST',
            method: 'createTeacher',
            url: '/createTeacher',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'PUT',
            method: 'updateTeacher',
            url: '/updateTeacher/:teacherId',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'PUT',
            method: 'updateAdmin',
            url: '/updateAdmin/:adminId',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'DELETE',
            method: 'deleteAdmin',
            url: '/deleteAdmin/:adminId',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'DELETE',
            method: 'deleteTeacher',
            url: '/deleteTeacher/:teacherId',
            filters: [authenticateViaToken, userAuthorization],
        }]);
}

export default userRouter