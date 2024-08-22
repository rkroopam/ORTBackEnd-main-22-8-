"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateViaToken = void 0;
const User_1 = __importDefault(require("../models/User"));
//verifyToken
const authenticateViaToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query['x-access-token'] || req.params['token'];
    if (!token)
        return next('no token found');
    User_1.default.verifyToken(token)
        .then((data) => {
        return User_1.default.findById(data.userId);
    })
        .then((userData) => {
        if (!userData)
            return next('no user found');
        req.userData = userData;
        next(null);
    })
        .catch(err => {
        res.failure(err);
    });
};
exports.authenticateViaToken = authenticateViaToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZXMvYXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsMERBQXVDO0FBRXZDLGFBQWE7QUFDTixNQUFNLG9CQUFvQixHQUFHLENBQUMsR0FBNEIsRUFBRSxHQUE2QixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQ2xILE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsRyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUMsY0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDekIsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDbEIsT0FBTyxjQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN4QyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNqQixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNYLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUM7QUFqQlcsUUFBQSxvQkFBb0Isd0JBaUIvQiJ9