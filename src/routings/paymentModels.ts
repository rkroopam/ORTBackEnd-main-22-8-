import { authenticateViaToken } from "../middlewares/authentication";
import { userAuthorization } from "../middlewares/authorization";

const userRouter = (app: any) => {
    const api = app.appRouter;
    api.model('paymentModels')
        .register([{
            action: 'POST',
            method: 'createPaymentModel',
            url: '/',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'PUT',
            method: 'updatePaymentModel',
            url: '/:paymentModelId',
            filters: [authenticateViaToken, userAuthorization],
        }, {
            action: 'GET',
            method: 'getPaymentModels',
            url: '/',
            filters: [authenticateViaToken, userAuthorization],
        },
        ]);
}

export default userRouter