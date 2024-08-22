import { authenticateViaToken } from "../middlewares/authentication";

const userRouter = (app: any) => {
    const api = app.appRouter;
    api.model('grades')
        .register([{
            action: 'GET',
            method: 'getGrades',
            url: '/',
            filters: [authenticateViaToken],
        }
        ]);
}

export default userRouter