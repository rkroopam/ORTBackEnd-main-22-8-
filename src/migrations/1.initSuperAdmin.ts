import config from "config";
import mongoose from "mongoose";
import { getEncryptedPassword } from "../helpers/utility";
import { IUserDocument } from "../typings/user";
import UserModel from "../models/User";

const { user } = mongoose.models
const adminConfig: {
  mailId: string,
  password: string,
} = config.get('admin');

export const runMigrationScript = async () => {

  const userAsSuperAdmin = await user.findOne({
    userType: 'superAdmin'
  });

  if (!userAsSuperAdmin) {
    await new user({
      email: adminConfig.mailId,
      isEmailVerified: true,
      fName: 'Super Admin',
      lName: 'ORT',
      userType: 'superAdmin',
      password: getEncryptedPassword(adminConfig.password),
      createdAt: Date.now(),
    })
      .save()
      .then(async (userData: IUserDocument) => {
        const userId = (userData.id || userData._id) as string
        userData.token = await UserModel.buildToken(userId);
        return userData.save();
      })
      .then(() => {
        console.log('Migrations Success: Created Super Admin');
      })
      .catch((err: any) => {
        console.log('Migrations Failure: Created Super Admin', JSON.stringify(err));
      })
  }
};