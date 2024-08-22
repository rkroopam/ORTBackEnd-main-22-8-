"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../middlewares/authentication");
const authorization_1 = require("../middlewares/authorization");
const userRouter = (app) => {
    const api = app.appRouter;
    api.model('userRelations')
        .register([
        {
            action: 'GET',
            method: 'getUserRelations',
            url: '/getUserRelations/:userId',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'PUT',
            method: 'assignAdminToStudent',
            url: '/assignAdminToStudent/:studentId/:adminId',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        }, {
            action: 'PUT',
            method: 'assignTeacherToStudent',
            url: '/assignTeacherToStudent/:studentId/:teacherId',
            filters: [authentication_1.authenticateViaToken, authorization_1.userAuthorization],
        },
    ]);
};
exports.default = userRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlbGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0aW5ncy91c2VyUmVsYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0VBQXFFO0FBQ3JFLGdFQUFpRTtBQUVqRSxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQzVCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDMUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7U0FDckIsUUFBUSxDQUFDO1FBQ047WUFDSSxNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsR0FBRyxFQUFFLDJCQUEyQjtZQUNoQyxPQUFPLEVBQUUsQ0FBQyxxQ0FBb0IsRUFBRSxpQ0FBaUIsQ0FBQztTQUNyRCxFQUFFO1lBQ0MsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsc0JBQXNCO1lBQzlCLEdBQUcsRUFBRSwyQ0FBMkM7WUFDaEQsT0FBTyxFQUFFLENBQUMscUNBQW9CLEVBQUUsaUNBQWlCLENBQUM7U0FDckQsRUFBRTtZQUNDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLHdCQUF3QjtZQUNoQyxHQUFHLEVBQUUsK0NBQStDO1lBQ3BELE9BQU8sRUFBRSxDQUFDLHFDQUFvQixFQUFFLGlDQUFpQixDQUFDO1NBQ3JEO0tBQ0osQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsVUFBVSxDQUFBIn0=