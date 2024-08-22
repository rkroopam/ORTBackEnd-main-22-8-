import mongoose from "mongoose";
import { IUserDocument, IUserPasswordChangeBodyReq, IUserSignInBodyReq, IUserSignUpBodyReq } from "../typings/user";
import { checkValueOfKeysIsPresentInData, compareEncryptedPassword, getEncryptedPassword, getObjectId, updateExistingModel } from "../helpers/utility";
import { IExpressModifiedRequest, IExpressModifiedResponse } from "../typings/utiltity";
import { toSelfUserModel, toUserListModels, toUserModel } from "../mappers/users";
import UserModel from "../models/User";
import sendMail from "../helpers/mail";
import config from "config";
import signUpTemplate from "../teplates/mails/signup";
import restPasswordTemplate from "../teplates/mails/resetPassword";
import testTemplate from "../teplates/mails/test";
import inviteTemplate from "../teplates/mails/invite";
import { IUserRelationDocument } from "../typings/userRelation";

const { user, userRelation } = mongoose.models
const mailConfig: {
  mailId: string
} = config.get('mail');

const frontConfig: {
  url: string
} = config.get('front');


// student
export const signup = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const {
    age,
    country,
    email,
    fName,
    gradeId,
    lName,
    phoneCountryCode,
    phoneNumber,
    password
  }: IUserSignUpBodyReq = req.body

  const bodyValueResponse = checkValueOfKeysIsPresentInData(req.body, ['age',
    'country',
    'email',
    'fName',
    'gradeId',
    'lName',
    'phoneCountryCode',
    'phoneNumber', 'password'])

  if (!bodyValueResponse.isSuccess) {
    return res?.failure(bodyValueResponse.error)
  }

  user.findOne({
    'email': email,
  })
    .then((userData: any) => {
      if (userData) {
        const user = userData.toObject();
        if (user?.isEmailVerified === false) {
          throw 'Your email is not verified.'
        }
        if (user?.isEmailVerified === true) {
          throw 'You are already in system. Try Sign Ip!'
        }
      }

      return new user({
        age,
        country,
        email,
        fName,
        gradeId: getObjectId(gradeId),
        lName,
        phoneCountryCode,
        phoneNumber,
        userType: 'student',
        password: getEncryptedPassword(password),
        createdAt: Date.now(),
      }).save()
    })
    .then(async (userData: IUserDocument) => {
      const userId = (userData.id || userData._id) as string
      userData.token = await UserModel.buildToken(userId);
      await userData.save()

      return user.findOne({
        userType: 'superAdmin'
      })
        .then(superAdmin => ({ superAdmin, userData }))
    })
    .then(async ({ superAdmin, userData }: { superAdmin: IUserDocument, userData: IUserDocument }) => {

      // building relation for every new member
      return new userRelation({
        userId: userData,
        superAdminUserId: superAdmin,
        createdAt: Date.now(),
      })
        .save()
        .then(() => userData)
    })
    .then((userData: IUserDocument) => {
      // send email to mail verification
      const { html, subject } = signUpTemplate({
        verifyLink: `${frontConfig.url}/verify-mail`
      })
      sendMail(mailConfig.mailId, email, subject, html)

      return res.data(toUserModel(userData));
    }).catch((err: any) => {
      res.failure(err);
    });
}

// student, teacher, admin, superAdmin
export const signin = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { body } = req;
  const {
    email,
    password
  }: IUserSignInBodyReq = body

  user.findOne({
    'email': email,
  }).then(userData => {
    if (!userData) {
      throw 'no user found in system'
    } else if (!userData.isEmailVerified) {
      throw 'Your email is not verified.'
    }
    const isPasswordMatch = compareEncryptedPassword(password, userData.password)

    if (!isPasswordMatch) {
      throw 'Your password is incorrect.'
    }

    return res.data(toSelfUserModel(userData));
  }).catch((err: any) => {
    res.failure(err);
  })
}

export const sendMailforResetPassword = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { body } = req;
  const {
    email,
  }: IUserSignInBodyReq = body

  user.findOne({
    'email': email,
  }).then(userData => {
    if (!userData) {
      throw 'User not found, please signup!'
    }

    if (!userData.isEmailVerified) {
      throw 'Your email is not verified.'
    }

    // send email to mail verification
    const { html, subject } = restPasswordTemplate({
      restPasswordLink: `${frontConfig.url}/reset-password?token=${userData.token}`
    })
    sendMail(mailConfig.mailId, userData.email, subject, html)

    return res.success('Mail sent for reset password');
  }).catch((err: any) => {
    res.failure(err);
  })
}

export const verifyMail = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { userData } = req;

  if (!userData) {
    throw 'User not found, please signup!'
  } else if (userData.isEmailVerified === true) {
    return res.success('Your mail is already verified')
  }

  userData.isEmailVerified = true;
  return userData.save().then(() => {
    res.success('Your mail is verified')
  }).catch((err: any) => {
    return res.failure('Someting went wrong, on mail verification: ' + JSON.stringify(err));
  })
}

export const resetPassword = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { body, userData } = req;
  const {
    password
  }: IUserPasswordChangeBodyReq = body

  return user.findByIdAndUpdate(userData.id, {
    $set: {
      password: getEncryptedPassword(password),
    }
  }).then(() => {
    return res.success('Your password is updated!');
  }).catch((err: any) => {
    res.failure(err);
  })
}

// can do by super admin only
export const createAdmin = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const {
    country,
    email,
    fName,
    lName,
    phoneCountryCode,
    phoneNumber,
    password
  }: IUserSignUpBodyReq = req.body

  const bodyValueResponse = checkValueOfKeysIsPresentInData(req.body, [
    'country',
    'email',
    'fName',
    'lName',
    'phoneCountryCode',
    'phoneNumber', 'password'])

  if (!bodyValueResponse.isSuccess) {
    return res?.failure(bodyValueResponse.error)
  }

  user.findOne({
    'email': email,
  })
    .then(userData => {
      if (userData) {
        if (!!userData?.isEmailVerified === false) {
          throw `This user is already in system as ${userData?.userType}, but email is not verified.`
        }
        if (!!userData?.isEmailVerified === true) {
          throw `This user is already in system as ${userData?.userType} & Ask user to check for ORT Admin Invitation email!`
        }
      }

      return new user({
        country,
        email,
        fName,
        lName,
        phoneCountryCode,
        phoneNumber,
        userType: 'admin',
        password: getEncryptedPassword(password),
        createdAt: Date.now(),
      }).save()
    })
    .then(async (userData: IUserDocument) => {
      const userId = (userData.id || userData._id) as string
      userData.token = await UserModel.buildToken(userId);
      await userData.save();

      return user.findOne({
        userType: 'superAdmin'
      })
        .then(superAdmin => ({ superAdmin, userData }))
    })
    .then(async ({ superAdmin, userData }: { superAdmin: IUserDocument, userData: IUserDocument }) => {

      // building relation for every new member
      return new userRelation({
        userId: userData,
        superAdminUserId: superAdmin,
        createdAt: Date.now(),
      })
        .save()
        .then(() => userData)
    })
    .then((userData: IUserDocument) => {
      // send email to mail verification
      const { html, subject } = inviteTemplate({
        link: `${frontConfig.url}/verify-mail`,
        invitationFor: 'Admin',
        password,
      })
      sendMail(mailConfig.mailId, email, subject, html)

      return res.data(toUserModel(userData));
    }).catch((err: any) => {
      res.failure(err);
    });
}

// can do by super admin and admin only
export const createTeacher = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const {
    country,
    email,
    fName,
    lName,
    phoneCountryCode,
    phoneNumber,
    password
  }: IUserSignUpBodyReq = req.body

  const bodyValueResponse = checkValueOfKeysIsPresentInData(req.body, [
    'country',
    'email',
    'fName',
    'lName',
    'phoneCountryCode',
    'phoneNumber', 'password'])

  if (!bodyValueResponse.isSuccess) {
    return res?.failure(bodyValueResponse.error)
  }

  user.findOne({
    'email': email,
  })
    .then(userData => {
      if (userData) {
        if (userData?.isEmailVerified === false) {
          throw `This user is already in system as ${userData?.userType}, but email is not verified.`
        }
        if (userData?.isEmailVerified === true) {
          throw `This user is already in system as ${userData?.userType} & Ask user to check for ORT Teacher Invitation email!`
        }
      }

      return new user({
        country,
        email,
        fName,
        lName,
        phoneCountryCode,
        phoneNumber,
        userType: 'teacher',
        password: getEncryptedPassword(password),
        createdAt: Date.now(),
      }).save()
    })
    .then(async (userData: IUserDocument) => {
      const userId = (userData.id || userData._id) as string
      userData.token = await UserModel.buildToken(userId);
      await userData.save();

      return user.findOne({
        userType: 'superAdmin'
      })
        .then(superAdmin => ({ superAdmin, userData }))
    })
    .then(async ({ superAdmin, userData }: { superAdmin: IUserDocument, userData: IUserDocument }) => {

      // building relation for every new member
      return new userRelation({
        userId: userData,
        superAdminUserId: superAdmin,
        createdAt: Date.now(),
      })
        .save()
        .then(() => userData)
    })
    .then((userData: IUserDocument) => {
      // send email to mail verification
      const { html, subject } = inviteTemplate({
        link: `${frontConfig.url}/verify-mail`,
        invitationFor: 'Teacher',
        password,
      })
      sendMail(mailConfig.mailId, email, subject, html)

      return res.data(toUserModel(userData));
    }).catch((err: any) => {
      res.failure(err);
    });
}

// can do by super admin and admin only
export const updateTeacher = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { teacherId } = req.params
  const {
    // country,
    fName,
    lName,
  }: IUserSignUpBodyReq = req.body

  return user.findById(teacherId)
    .then(teacherUserData => {
      if (!teacherUserData) {
        throw 'No teacher found while update'
      }
      if (teacherUserData.userType !== 'teacher') {
        throw 'The user which you are trying to update is not teacher'
      }
      const updatedTeacherData = updateExistingModel(teacherUserData, {
        // country,
        fName,
        lName,
      });
      return updatedTeacherData.save();
    }).then(teacherUserData => {
      return res.data(toUserModel(teacherUserData))
    })
    .catch((err: any) => {
      res.failure(err);
    });
}

// can do by super admin only
export const updateAdmin = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { adminId } = req.params
  const {
    // country,
    fName,
    lName,
  }: IUserSignUpBodyReq = req.body

  return user.findById(adminId)
    .then(adminUserData => {
      if (!adminUserData) {
        throw 'No admin found while update'
      }
      if (adminUserData.userType !== 'admin') {
        throw 'The user which you are trying to update is not admin'
      }
      const updatedAdminData = updateExistingModel(adminUserData, {
        // country,
        fName,
        lName,
      });
      return updatedAdminData.save();
    }).then(adminUserData => {
      return res.data(toUserModel(adminUserData))
    })
    .catch((err: any) => {
      res.failure(err);
    });
}

// can do by super admin only
export const getAllAdmins = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { country } = req.query
  const query: any = {
    userType: 'admin',
    isEmailVerified: true
  }

  if (country) query.country = country;

  return user.find(query)
    .then((userList: IUserDocument[]) => {
      res.page(toUserListModels(userList))
    }).catch(err => res.failure(err))
}

// can do by super admin and admin only
export const getAllTeachers = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { country } = req.query
  const query: any = {
    userType: 'teacher',
    isEmailVerified: true
  }

  if (country) query.country = country;

  return user.find(query)
    .then((userList: IUserDocument[]) => {
      res.page(toUserListModels(userList))
    }).catch(err => res.failure(err))
}

// can do by super admin and admin and teachers
export const getAllStudents = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  return user.find({
    userType: 'student',
    isEmailVerified: true
  }).then((userList: IUserDocument[]) => {
    res.page(toUserListModels(userList))
  }).catch(err => res.failure(err))
}

export const deleteAdmin = async (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { adminId } = req.params

  return userRelation.find({
    'adminUserId': getObjectId(adminId),
  }).select({ "_id": 1 })
    .then((userRelationList: IUserRelationDocument[]) => {
      const userRelationIds = userRelationList
        .map(userRelation => getObjectId(((userRelation.id || userRelation._id) as string)?.toString()))

      return userRelation.updateMany({
        _id: {
          $in: userRelationIds
        }
      }, {
        $set: {
          adminUserId: null
        }
      })
    }).then(() => {
      return user.deleteOne({
        _id: getObjectId(adminId)
      })
    })
    .then(() => {
      res.success('Admin deleted successfully')
    }).catch(err => res.failure(err))
}

export const deleteTeacher = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { adminId } = req.params

  return userRelation.find({
    'adminUserId': getObjectId(adminId),
  }).select({ "_id": 1 })
    .then((userRelationList: IUserRelationDocument[]) => {
      const userRelationIds = userRelationList
        .map(userRelation => getObjectId(((userRelation.id || userRelation._id) as string)?.toString()))

      return userRelation.updateMany({
        _id: {
          $in: userRelationIds
        }
      }, {
        $set: {
          adminUserId: null
        }
      })
    })
    .then(() => {
      return user.deleteOne({
        _id: getObjectId(adminId)
      })
    }).then(() => {
      res.success('Teacher deleted successfully')
    }).catch(err => res.failure(err))
}

export const testMail = (req: IExpressModifiedRequest, res: IExpressModifiedResponse) => {
  const { html, subject } = testTemplate()
  sendMail(mailConfig.mailId, 'hardeep.bit@gmail.com', subject, html)

  return res.success('mail sent')
}
