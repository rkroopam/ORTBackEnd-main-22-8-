
import { IExpressModifiedRequest, IExpressModifiedResponse, NextCBFn } from "../typings/utiltity";
import UserModel from "../models/User";

//verifyToken
export const authenticateViaToken = (req: IExpressModifiedRequest, res: IExpressModifiedResponse, next: NextCBFn) => {
  const token = req.headers['x-access-token'] || req.query['x-access-token'] || req.params['token'];

  if (!token) return next('no token found');
  UserModel.verifyToken(token)
    .then((data: any) => {
      return UserModel.findById(data.userId)
    })
    .then((userData) => {
      if (!userData) return next('no user found');

      req.userData = userData;
      next(null);
    })
    .catch(err => {
      res.failure(err);
    })
};