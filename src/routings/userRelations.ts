import { authenticateViaToken } from "../middlewares/authentication";
import { userAuthorization } from "../middlewares/authorization";

const userRouter = (app: any) => {
    const api = app.appRouter;
    api.model('userRelations')
        .register([
            {
                action: 'GET',
                method: 'getUserRelations',
                url: '/getUserRelations/:userId',
                filters: [authenticateViaToken, userAuthorization],
            }, {
                action: 'PUT',
                method: 'assignAdminToStudent',
                url: '/assignAdminToStudent/:studentId/:adminId',
                filters: [authenticateViaToken, userAuthorization],
            }, {
                action: 'PUT',
                method: 'assignTeacherToStudent',
                url: '/assignTeacherToStudent/:studentId/:teacherId',
                filters: [authenticateViaToken, userAuthorization],
            },
        ]);
}

export default userRouter