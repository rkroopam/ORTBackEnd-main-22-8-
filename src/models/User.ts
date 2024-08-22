import {
  Schema,
  model,
} from 'mongoose';
import jwt from 'jsonwebtoken';
import config from "config";
import { IUserDocument, IUserModel } from '../typings/user';

const jwtConfig: {
  secret: string,
  expiredTime: string
} = config.get('jwt');

const UserSchema = new Schema<IUserDocument, IUserModel>({
  fName: Schema.Types.String,
  lName: Schema.Types.String,
  username: Schema.Types.String,
  email: Schema.Types.String,
  isEmailVerified: {
    type: Schema.Types.Boolean,
    default: false,
  },
  age: Schema.Types.Number,
  country: Schema.Types.String,
  phoneCountryCode: Schema.Types.String,
  phoneNumber: Schema.Types.String,
  password: Schema.Types.String,
  token: Schema.Types.String,
  gradeId: {
    type: Schema.Types.ObjectId,
    ref: 'grade',
    default: null
  },
  userType: {
    type: String,
    enum: ['superAdmin', 'admin',
      'teacher', 'student'],
  },
  userRelationId: {
    type: Schema.Types.ObjectId,
    ref: 'userRelation'
  },
  isLicensed: Schema.Types.Boolean,
  businessId: {
    type: Schema.Types.ObjectId,
    ref: 'business'
  },
  createdAt: Date,
  updatedAt: Date
})


// adding single index
UserSchema.index({ email: 1 });

//pre tasks
UserSchema.pre('save', function () {
  this.updatedAt = Date.now();
  return Promise.resolve(this);
});


UserSchema.statics.buildToken = (userId: string) => {
  return new Promise((res, rej) => {
    jwt.sign({
      userId,
      date: new Date(),
    },
      jwtConfig.secret,
      // { expiresIn: jwtConfig.expiredTime }
      (err: any, data: any) => {
        if (err) return rej(err);
        return res(data);
      });
  });
}

UserSchema.statics.verifyToken = (token: string) => {
  return new Promise((res, rej) => {
    jwt.verify(token, jwtConfig.secret, function (err, data) {
      if (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
          return rej('user is unauthorized');
        } else {
          return rej('Oops! Something Went wrong!');
        }
      }
      res(data);
    })
  });
}

const UserModel = model<IUserDocument, IUserModel>('user', UserSchema);

export default UserModel;

