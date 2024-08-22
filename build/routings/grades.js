"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../middlewares/authentication");
const userRouter = (app) => {
    const api = app.appRouter;
    api.model('grades')
        .register([{
            action: 'GET',
            method: 'getGrades',
            url: '/',
            filters: [authentication_1.authenticateViaToken],
        }
    ]);
};
exports.default = userRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRpbmdzL2dyYWRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtFQUFxRTtBQUVyRSxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQzVCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDMUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7U0FDZCxRQUFRLENBQUMsQ0FBQztZQUNQLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLFdBQVc7WUFDbkIsR0FBRyxFQUFFLEdBQUc7WUFDUixPQUFPLEVBQUUsQ0FBQyxxQ0FBb0IsQ0FBQztTQUNsQztLQUNBLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQTtBQUVELGtCQUFlLFVBQVUsQ0FBQSJ9