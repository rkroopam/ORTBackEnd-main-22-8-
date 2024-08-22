"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMail = exports.deleteTeacher = exports.deleteAdmin = exports.getAllStudents = exports.getAllTeachers = exports.getAllAdmins = exports.updateAdmin = exports.updateTeacher = exports.createTeacher = exports.createAdmin = exports.resetPassword = exports.verifyMail = exports.sendMailforResetPassword = exports.signin = exports.signup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utility_1 = require("../helpers/utility");
const users_1 = require("../mappers/users");
const User_1 = __importDefault(require("../models/User"));
const mail_1 = __importDefault(require("../helpers/mail"));
const config_1 = __importDefault(require("config"));
const signup_1 = __importDefault(require("../teplates/mails/signup"));
const resetPassword_1 = __importDefault(require("../teplates/mails/resetPassword"));
const test_1 = __importDefault(require("../teplates/mails/test"));
const invite_1 = __importDefault(require("../teplates/mails/invite"));
const { user, userRelation } = mongoose_1.default.models;
const mailConfig = config_1.default.get('mail');
const frontConfig = config_1.default.get('front');
// student
const signup = (req, res) => {
    const { age, country, email, fName, gradeId, lName, phoneCountryCode, phoneNumber, password } = req.body;
    const bodyValueResponse = (0, utility_1.checkValueOfKeysIsPresentInData)(req.body, ['age',
        'country',
        'email',
        'fName',
        'gradeId',
        'lName',
        'phoneCountryCode',
        'phoneNumber', 'password']);
    if (!bodyValueResponse.isSuccess) {
        return res === null || res === void 0 ? void 0 : res.failure(bodyValueResponse.error);
    }
    user.findOne({
        'email': email,
    })
        .then((userData) => {
        if (userData) {
            const user = userData.toObject();
            if ((user === null || user === void 0 ? void 0 : user.isEmailVerified) === false) {
                throw 'Your email is not verified.';
            }
            if ((user === null || user === void 0 ? void 0 : user.isEmailVerified) === true) {
                throw 'You are already in system. Try Sign Ip!';
            }
        }
        return new user({
            age,
            country,
            email,
            fName,
            gradeId: (0, utility_1.getObjectId)(gradeId),
            lName,
            phoneCountryCode,
            phoneNumber,
            userType: 'student',
            password: (0, utility_1.getEncryptedPassword)(password),
            createdAt: Date.now(),
        }).save();
    })
        .then((userData) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = (userData.id || userData._id);
        userData.token = yield User_1.default.buildToken(userId);
        yield userData.save();
        return user.findOne({
            userType: 'superAdmin'
        })
            .then(superAdmin => ({ superAdmin, userData }));
    }))
        .then((_a) => __awaiter(void 0, [_a], void 0, function* ({ superAdmin, userData }) {
        // building relation for every new member
        return new userRelation({
            userId: userData,
            superAdminUserId: superAdmin,
            createdAt: Date.now(),
        })
            .save()
            .then(() => userData);
    }))
        .then((userData) => {
        // send email to mail verification
        const { html, subject } = (0, signup_1.default)({
            verifyLink: `${frontConfig.url}/verify-mail`
        });
        (0, mail_1.default)(mailConfig.mailId, email, subject, html);
        return res.data((0, users_1.toUserModel)(userData));
    }).catch((err) => {
        res.failure(err);
    });
};
exports.signup = signup;
// student, teacher, admin, superAdmin
const signin = (req, res) => {
    const { body } = req;
    const { email, password } = body;
    user.findOne({
        'email': email,
    }).then(userData => {
        if (!userData) {
            throw 'no user found in system';
        }
        else if (!userData.isEmailVerified) {
            throw 'Your email is not verified.';
        }
        const isPasswordMatch = (0, utility_1.compareEncryptedPassword)(password, userData.password);
        if (!isPasswordMatch) {
            throw 'Your password is incorrect.';
        }
        return res.data((0, users_1.toSelfUserModel)(userData));
    }).catch((err) => {
        res.failure(err);
    });
};
exports.signin = signin;
const sendMailforResetPassword = (req, res) => {
    const { body } = req;
    const { email, } = body;
    user.findOne({
        'email': email,
    }).then(userData => {
        if (!userData) {
            throw 'User not found, please signup!';
        }
        if (!userData.isEmailVerified) {
            throw 'Your email is not verified.';
        }
        // send email to mail verification
        const { html, subject } = (0, resetPassword_1.default)({
            restPasswordLink: `${frontConfig.url}/reset-password?token=${userData.token}`
        });
        (0, mail_1.default)(mailConfig.mailId, userData.email, subject, html);
        return res.success('Mail sent for reset password');
    }).catch((err) => {
        res.failure(err);
    });
};
exports.sendMailforResetPassword = sendMailforResetPassword;
const verifyMail = (req, res) => {
    const { userData } = req;
    if (!userData) {
        throw 'User not found, please signup!';
    }
    else if (userData.isEmailVerified === true) {
        return res.success('Your mail is already verified');
    }
    userData.isEmailVerified = true;
    return userData.save().then(() => {
        res.success('Your mail is verified');
    }).catch((err) => {
        return res.failure('Someting went wrong, on mail verification: ' + JSON.stringify(err));
    });
};
exports.verifyMail = verifyMail;
const resetPassword = (req, res) => {
    const { body, userData } = req;
    const { password } = body;
    return user.findByIdAndUpdate(userData.id, {
        $set: {
            password: (0, utility_1.getEncryptedPassword)(password),
        }
    }).then(() => {
        return res.success('Your password is updated!');
    }).catch((err) => {
        res.failure(err);
    });
};
exports.resetPassword = resetPassword;
// can do by super admin only
const createAdmin = (req, res) => {
    const { country, email, fName, lName, phoneCountryCode, phoneNumber, password } = req.body;
    const bodyValueResponse = (0, utility_1.checkValueOfKeysIsPresentInData)(req.body, [
        'country',
        'email',
        'fName',
        'lName',
        'phoneCountryCode',
        'phoneNumber', 'password'
    ]);
    if (!bodyValueResponse.isSuccess) {
        return res === null || res === void 0 ? void 0 : res.failure(bodyValueResponse.error);
    }
    user.findOne({
        'email': email,
    })
        .then(userData => {
        if (userData) {
            if (!!(userData === null || userData === void 0 ? void 0 : userData.isEmailVerified) === false) {
                throw `This user is already in system as ${userData === null || userData === void 0 ? void 0 : userData.userType}, but email is not verified.`;
            }
            if (!!(userData === null || userData === void 0 ? void 0 : userData.isEmailVerified) === true) {
                throw `This user is already in system as ${userData === null || userData === void 0 ? void 0 : userData.userType} & Ask user to check for ORT Admin Invitation email!`;
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
            password: (0, utility_1.getEncryptedPassword)(password),
            createdAt: Date.now(),
        }).save();
    })
        .then((userData) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = (userData.id || userData._id);
        userData.token = yield User_1.default.buildToken(userId);
        yield userData.save();
        return user.findOne({
            userType: 'superAdmin'
        })
            .then(superAdmin => ({ superAdmin, userData }));
    }))
        .then((_a) => __awaiter(void 0, [_a], void 0, function* ({ superAdmin, userData }) {
        // building relation for every new member
        return new userRelation({
            userId: userData,
            superAdminUserId: superAdmin,
            createdAt: Date.now(),
        })
            .save()
            .then(() => userData);
    }))
        .then((userData) => {
        // send email to mail verification
        const { html, subject } = (0, invite_1.default)({
            link: `${frontConfig.url}/verify-mail`,
            invitationFor: 'Admin',
            password,
        });
        (0, mail_1.default)(mailConfig.mailId, email, subject, html);
        return res.data((0, users_1.toUserModel)(userData));
    }).catch((err) => {
        res.failure(err);
    });
};
exports.createAdmin = createAdmin;
// can do by super admin and admin only
const createTeacher = (req, res) => {
    const { country, email, fName, lName, phoneCountryCode, phoneNumber, password } = req.body;
    const bodyValueResponse = (0, utility_1.checkValueOfKeysIsPresentInData)(req.body, [
        'country',
        'email',
        'fName',
        'lName',
        'phoneCountryCode',
        'phoneNumber', 'password'
    ]);
    if (!bodyValueResponse.isSuccess) {
        return res === null || res === void 0 ? void 0 : res.failure(bodyValueResponse.error);
    }
    user.findOne({
        'email': email,
    })
        .then(userData => {
        if (userData) {
            if ((userData === null || userData === void 0 ? void 0 : userData.isEmailVerified) === false) {
                throw `This user is already in system as ${userData === null || userData === void 0 ? void 0 : userData.userType}, but email is not verified.`;
            }
            if ((userData === null || userData === void 0 ? void 0 : userData.isEmailVerified) === true) {
                throw `This user is already in system as ${userData === null || userData === void 0 ? void 0 : userData.userType} & Ask user to check for ORT Teacher Invitation email!`;
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
            password: (0, utility_1.getEncryptedPassword)(password),
            createdAt: Date.now(),
        }).save();
    })
        .then((userData) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = (userData.id || userData._id);
        userData.token = yield User_1.default.buildToken(userId);
        yield userData.save();
        return user.findOne({
            userType: 'superAdmin'
        })
            .then(superAdmin => ({ superAdmin, userData }));
    }))
        .then((_a) => __awaiter(void 0, [_a], void 0, function* ({ superAdmin, userData }) {
        // building relation for every new member
        return new userRelation({
            userId: userData,
            superAdminUserId: superAdmin,
            createdAt: Date.now(),
        })
            .save()
            .then(() => userData);
    }))
        .then((userData) => {
        // send email to mail verification
        const { html, subject } = (0, invite_1.default)({
            link: `${frontConfig.url}/verify-mail`,
            invitationFor: 'Teacher',
            password,
        });
        (0, mail_1.default)(mailConfig.mailId, email, subject, html);
        return res.data((0, users_1.toUserModel)(userData));
    }).catch((err) => {
        res.failure(err);
    });
};
exports.createTeacher = createTeacher;
// can do by super admin and admin only
const updateTeacher = (req, res) => {
    const { teacherId } = req.params;
    const { 
    // country,
    fName, lName, } = req.body;
    return user.findById(teacherId)
        .then(teacherUserData => {
        if (!teacherUserData) {
            throw 'No teacher found while update';
        }
        if (teacherUserData.userType !== 'teacher') {
            throw 'The user which you are trying to update is not teacher';
        }
        const updatedTeacherData = (0, utility_1.updateExistingModel)(teacherUserData, {
            // country,
            fName,
            lName,
        });
        return updatedTeacherData.save();
    }).then(teacherUserData => {
        return res.data((0, users_1.toUserModel)(teacherUserData));
    })
        .catch((err) => {
        res.failure(err);
    });
};
exports.updateTeacher = updateTeacher;
// can do by super admin only
const updateAdmin = (req, res) => {
    const { adminId } = req.params;
    const { 
    // country,
    fName, lName, } = req.body;
    return user.findById(adminId)
        .then(adminUserData => {
        if (!adminUserData) {
            throw 'No admin found while update';
        }
        if (adminUserData.userType !== 'admin') {
            throw 'The user which you are trying to update is not admin';
        }
        const updatedAdminData = (0, utility_1.updateExistingModel)(adminUserData, {
            // country,
            fName,
            lName,
        });
        return updatedAdminData.save();
    }).then(adminUserData => {
        return res.data((0, users_1.toUserModel)(adminUserData));
    })
        .catch((err) => {
        res.failure(err);
    });
};
exports.updateAdmin = updateAdmin;
// can do by super admin only
const getAllAdmins = (req, res) => {
    const { country } = req.query;
    const query = {
        userType: 'admin',
        isEmailVerified: true
    };
    if (country)
        query.country = country;
    return user.find(query)
        .then((userList) => {
        res.page((0, users_1.toUserListModels)(userList));
    }).catch(err => res.failure(err));
};
exports.getAllAdmins = getAllAdmins;
// can do by super admin and admin only
const getAllTeachers = (req, res) => {
    const { country } = req.query;
    const query = {
        userType: 'teacher',
        isEmailVerified: true
    };
    if (country)
        query.country = country;
    return user.find(query)
        .then((userList) => {
        res.page((0, users_1.toUserListModels)(userList));
    }).catch(err => res.failure(err));
};
exports.getAllTeachers = getAllTeachers;
// can do by super admin and admin and teachers
const getAllStudents = (req, res) => {
    return user.find({
        userType: 'student',
        isEmailVerified: true
    }).then((userList) => {
        res.page((0, users_1.toUserListModels)(userList));
    }).catch(err => res.failure(err));
};
exports.getAllStudents = getAllStudents;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    return userRelation.find({
        'adminUserId': (0, utility_1.getObjectId)(adminId),
    }).select({ "_id": 1 })
        .then((userRelationList) => {
        const userRelationIds = userRelationList
            .map(userRelation => { var _a; return (0, utility_1.getObjectId)((_a = ((userRelation.id || userRelation._id))) === null || _a === void 0 ? void 0 : _a.toString()); });
        return userRelation.updateMany({
            _id: {
                $in: userRelationIds
            }
        }, {
            $set: {
                adminUserId: null
            }
        });
    }).then(() => {
        return user.deleteOne({
            _id: (0, utility_1.getObjectId)(adminId)
        });
    })
        .then(() => {
        res.success('Admin deleted successfully');
    }).catch(err => res.failure(err));
});
exports.deleteAdmin = deleteAdmin;
const deleteTeacher = (req, res) => {
    const { adminId } = req.params;
    return userRelation.find({
        'adminUserId': (0, utility_1.getObjectId)(adminId),
    }).select({ "_id": 1 })
        .then((userRelationList) => {
        const userRelationIds = userRelationList
            .map(userRelation => { var _a; return (0, utility_1.getObjectId)((_a = ((userRelation.id || userRelation._id))) === null || _a === void 0 ? void 0 : _a.toString()); });
        return userRelation.updateMany({
            _id: {
                $in: userRelationIds
            }
        }, {
            $set: {
                adminUserId: null
            }
        });
    })
        .then(() => {
        return user.deleteOne({
            _id: (0, utility_1.getObjectId)(adminId)
        });
    }).then(() => {
        res.success('Teacher deleted successfully');
    }).catch(err => res.failure(err));
};
exports.deleteTeacher = deleteTeacher;
const testMail = (req, res) => {
    const { html, subject } = (0, test_1.default)();
    (0, mail_1.default)(mailConfig.mailId, 'hardeep.bit@gmail.com', subject, html);
    return res.success('mail sent');
};
exports.testMail = testMail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpcy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMsZ0RBQXVKO0FBRXZKLDRDQUFrRjtBQUNsRiwwREFBdUM7QUFDdkMsMkRBQXVDO0FBQ3ZDLG9EQUE0QjtBQUM1QixzRUFBc0Q7QUFDdEQsb0ZBQW1FO0FBQ25FLGtFQUFrRDtBQUNsRCxzRUFBc0Q7QUFHdEQsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxrQkFBUSxDQUFDLE1BQU0sQ0FBQTtBQUM5QyxNQUFNLFVBQVUsR0FFWixnQkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV2QixNQUFNLFdBQVcsR0FFYixnQkFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUd4QixVQUFVO0FBQ0gsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUE0QixFQUFFLEdBQTZCLEVBQUUsRUFBRTtJQUNwRixNQUFNLEVBQ0osR0FBRyxFQUNILE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxRQUFRLEVBQ1QsR0FBdUIsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUVoQyxNQUFNLGlCQUFpQixHQUFHLElBQUEseUNBQStCLEVBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUs7UUFDeEUsU0FBUztRQUNULE9BQU87UUFDUCxPQUFPO1FBQ1AsU0FBUztRQUNULE9BQU87UUFDUCxrQkFBa0I7UUFDbEIsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFFN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNYLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQztTQUNDLElBQUksQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1FBQ3RCLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxlQUFlLE1BQUssS0FBSyxFQUFFLENBQUM7Z0JBQ3BDLE1BQU0sNkJBQTZCLENBQUE7WUFDckMsQ0FBQztZQUNELElBQUksQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSxNQUFLLElBQUksRUFBRSxDQUFDO2dCQUNuQyxNQUFNLHlDQUF5QyxDQUFBO1lBQ2pELENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxJQUFJLElBQUksQ0FBQztZQUNkLEdBQUc7WUFDSCxPQUFPO1lBQ1AsS0FBSztZQUNMLEtBQUs7WUFDTCxPQUFPLEVBQUUsSUFBQSxxQkFBVyxFQUFDLE9BQU8sQ0FBQztZQUM3QixLQUFLO1lBQ0wsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsSUFBQSw4QkFBb0IsRUFBQyxRQUFRLENBQUM7WUFDeEMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDdEIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ1gsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQU8sUUFBdUIsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFXLENBQUE7UUFDdEQsUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLGNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFFckIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFFBQVEsRUFBRSxZQUFZO1NBQ3ZCLENBQUM7YUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNuRCxDQUFDLENBQUEsQ0FBQztTQUNELElBQUksQ0FBQyxLQUF5RixFQUFFLDRDQUFwRixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQTBEO1FBRTNGLHlDQUF5QztRQUN6QyxPQUFPLElBQUksWUFBWSxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLGdCQUFnQixFQUFFLFVBQVU7WUFDNUIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDdEIsQ0FBQzthQUNDLElBQUksRUFBRTthQUNOLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QixDQUFDLENBQUEsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLFFBQXVCLEVBQUUsRUFBRTtRQUNoQyxrQ0FBa0M7UUFDbEMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFBLGdCQUFjLEVBQUM7WUFDdkMsVUFBVSxFQUFFLEdBQUcsV0FBVyxDQUFDLEdBQUcsY0FBYztTQUM3QyxDQUFDLENBQUE7UUFDRixJQUFBLGNBQVEsRUFBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFakQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQVcsRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUF0RlksUUFBQSxNQUFNLFVBc0ZsQjtBQUVELHNDQUFzQztBQUMvQixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQTRCLEVBQUUsR0FBNkIsRUFBRSxFQUFFO0lBQ3BGLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDckIsTUFBTSxFQUNKLEtBQUssRUFDTCxRQUFRLEVBQ1QsR0FBdUIsSUFBSSxDQUFBO0lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDWCxPQUFPLEVBQUUsS0FBSztLQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2QsTUFBTSx5QkFBeUIsQ0FBQTtRQUNqQyxDQUFDO2FBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNyQyxNQUFNLDZCQUE2QixDQUFBO1FBQ3JDLENBQUM7UUFDRCxNQUFNLGVBQWUsR0FBRyxJQUFBLGtDQUF3QixFQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFN0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sNkJBQTZCLENBQUE7UUFDckMsQ0FBQztRQUVELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFBLHVCQUFlLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtRQUNwQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBekJZLFFBQUEsTUFBTSxVQXlCbEI7QUFFTSxNQUFNLHdCQUF3QixHQUFHLENBQUMsR0FBNEIsRUFBRSxHQUE2QixFQUFFLEVBQUU7SUFDdEcsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNyQixNQUFNLEVBQ0osS0FBSyxHQUNOLEdBQXVCLElBQUksQ0FBQTtJQUU1QixJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ1gsT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNkLE1BQU0sZ0NBQWdDLENBQUE7UUFDeEMsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDOUIsTUFBTSw2QkFBNkIsQ0FBQTtRQUNyQyxDQUFDO1FBRUQsa0NBQWtDO1FBQ2xDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBQSx1QkFBb0IsRUFBQztZQUM3QyxnQkFBZ0IsRUFBRSxHQUFHLFdBQVcsQ0FBQyxHQUFHLHlCQUF5QixRQUFRLENBQUMsS0FBSyxFQUFFO1NBQzlFLENBQUMsQ0FBQTtRQUNGLElBQUEsY0FBUSxFQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFMUQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7UUFDcEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQTNCWSxRQUFBLHdCQUF3Qiw0QkEyQnBDO0FBRU0sTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUE0QixFQUFFLEdBQTZCLEVBQUUsRUFBRTtJQUN4RixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBRXpCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNkLE1BQU0sZ0NBQWdDLENBQUE7SUFDeEMsQ0FBQztTQUFNLElBQUksUUFBUSxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsUUFBUSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUMvQixHQUFHLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUE7SUFDdEMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7UUFDcEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWZZLFFBQUEsVUFBVSxjQWV0QjtBQUVNLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBNEIsRUFBRSxHQUE2QixFQUFFLEVBQUU7SUFDM0YsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDL0IsTUFBTSxFQUNKLFFBQVEsRUFDVCxHQUErQixJQUFJLENBQUE7SUFFcEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBQSw4QkFBb0IsRUFBQyxRQUFRLENBQUM7U0FDekM7S0FDRixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNYLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFmWSxRQUFBLGFBQWEsaUJBZXpCO0FBRUQsNkJBQTZCO0FBQ3RCLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBNEIsRUFBRSxHQUE2QixFQUFFLEVBQUU7SUFDekYsTUFBTSxFQUNKLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFFBQVEsRUFDVCxHQUF1QixHQUFHLENBQUMsSUFBSSxDQUFBO0lBRWhDLE1BQU0saUJBQWlCLEdBQUcsSUFBQSx5Q0FBK0IsRUFBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ2xFLFNBQVM7UUFDVCxPQUFPO1FBQ1AsT0FBTztRQUNQLE9BQU87UUFDUCxrQkFBa0I7UUFDbEIsYUFBYSxFQUFFLFVBQVU7S0FBQyxDQUFDLENBQUE7SUFFN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNYLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQztTQUNDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNmLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsQ0FBQyxDQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxlQUFlLENBQUEsS0FBSyxLQUFLLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxxQ0FBcUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVEsOEJBQThCLENBQUE7WUFDN0YsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGVBQWUsQ0FBQSxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUN6QyxNQUFNLHFDQUFxQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsUUFBUSxzREFBc0QsQ0FBQTtZQUNySCxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sSUFBSSxJQUFJLENBQUM7WUFDZCxPQUFPO1lBQ1AsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsSUFBQSw4QkFBb0IsRUFBQyxRQUFRLENBQUM7WUFDeEMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDdEIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ1gsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQU8sUUFBdUIsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFXLENBQUE7UUFDdEQsUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLGNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFFBQVEsRUFBRSxZQUFZO1NBQ3ZCLENBQUM7YUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNuRCxDQUFDLENBQUEsQ0FBQztTQUNELElBQUksQ0FBQyxLQUF5RixFQUFFLDRDQUFwRixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQTBEO1FBRTNGLHlDQUF5QztRQUN6QyxPQUFPLElBQUksWUFBWSxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLGdCQUFnQixFQUFFLFVBQVU7WUFDNUIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDdEIsQ0FBQzthQUNDLElBQUksRUFBRTthQUNOLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QixDQUFDLENBQUEsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLFFBQXVCLEVBQUUsRUFBRTtRQUNoQyxrQ0FBa0M7UUFDbEMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFBLGdCQUFjLEVBQUM7WUFDdkMsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLEdBQUcsY0FBYztZQUN0QyxhQUFhLEVBQUUsT0FBTztZQUN0QixRQUFRO1NBQ1QsQ0FBQyxDQUFBO1FBQ0YsSUFBQSxjQUFRLEVBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRWpELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFBLG1CQUFXLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtRQUNwQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBbEZZLFFBQUEsV0FBVyxlQWtGdkI7QUFFRCx1Q0FBdUM7QUFDaEMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUE0QixFQUFFLEdBQTZCLEVBQUUsRUFBRTtJQUMzRixNQUFNLEVBQ0osT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsUUFBUSxFQUNULEdBQXVCLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFFaEMsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLHlDQUErQixFQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDbEUsU0FBUztRQUNULE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTztRQUNQLGtCQUFrQjtRQUNsQixhQUFhLEVBQUUsVUFBVTtLQUFDLENBQUMsQ0FBQTtJQUU3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakMsT0FBTyxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ1gsT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDO1NBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2YsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsZUFBZSxNQUFLLEtBQUssRUFBRSxDQUFDO2dCQUN4QyxNQUFNLHFDQUFxQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsUUFBUSw4QkFBOEIsQ0FBQTtZQUM3RixDQUFDO1lBQ0QsSUFBSSxDQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxlQUFlLE1BQUssSUFBSSxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0scUNBQXFDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxRQUFRLHdEQUF3RCxDQUFBO1lBQ3ZILENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxJQUFJLElBQUksQ0FBQztZQUNkLE9BQU87WUFDUCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxnQkFBZ0I7WUFDaEIsV0FBVztZQUNYLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxJQUFBLDhCQUFvQixFQUFDLFFBQVEsQ0FBQztZQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUN0QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDWCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsQ0FBTyxRQUF1QixFQUFFLEVBQUU7UUFDdEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQVcsQ0FBQTtRQUN0RCxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sY0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV0QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEIsUUFBUSxFQUFFLFlBQVk7U0FDdkIsQ0FBQzthQUNDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ25ELENBQUMsQ0FBQSxDQUFDO1NBQ0QsSUFBSSxDQUFDLEtBQXlGLEVBQUUsNENBQXBGLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBMEQ7UUFFM0YseUNBQXlDO1FBQ3pDLE9BQU8sSUFBSSxZQUFZLENBQUM7WUFDdEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsZ0JBQWdCLEVBQUUsVUFBVTtZQUM1QixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUN0QixDQUFDO2FBQ0MsSUFBSSxFQUFFO2FBQ04sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3pCLENBQUMsQ0FBQSxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQUMsUUFBdUIsRUFBRSxFQUFFO1FBQ2hDLGtDQUFrQztRQUNsQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUEsZ0JBQWMsRUFBQztZQUN2QyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsR0FBRyxjQUFjO1lBQ3RDLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLFFBQVE7U0FDVCxDQUFDLENBQUE7UUFDRixJQUFBLGNBQVEsRUFBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFakQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQVcsRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFsRlksUUFBQSxhQUFhLGlCQWtGekI7QUFFRCx1Q0FBdUM7QUFDaEMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUE0QixFQUFFLEdBQTZCLEVBQUUsRUFBRTtJQUMzRixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUNoQyxNQUFNO0lBQ0osV0FBVztJQUNYLEtBQUssRUFDTCxLQUFLLEdBQ04sR0FBdUIsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUVoQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1NBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUN0QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDckIsTUFBTSwrQkFBK0IsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsSUFBSSxlQUFlLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzNDLE1BQU0sd0RBQXdELENBQUE7UUFDaEUsQ0FBQztRQUNELE1BQU0sa0JBQWtCLEdBQUcsSUFBQSw2QkFBbUIsRUFBQyxlQUFlLEVBQUU7WUFDOUQsV0FBVztZQUNYLEtBQUs7WUFDTCxLQUFLO1NBQ04sQ0FBQyxDQUFDO1FBQ0gsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDeEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQVcsRUFBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0lBQy9DLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ2xCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUE1QlksUUFBQSxhQUFhLGlCQTRCekI7QUFFRCw2QkFBNkI7QUFDdEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUE0QixFQUFFLEdBQTZCLEVBQUUsRUFBRTtJQUN6RixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUM5QixNQUFNO0lBQ0osV0FBVztJQUNYLEtBQUssRUFDTCxLQUFLLEdBQ04sR0FBdUIsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUVoQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDbkIsTUFBTSw2QkFBNkIsQ0FBQTtRQUNyQyxDQUFDO1FBQ0QsSUFBSSxhQUFhLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sc0RBQXNELENBQUE7UUFDOUQsQ0FBQztRQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSw2QkFBbUIsRUFBQyxhQUFhLEVBQUU7WUFDMUQsV0FBVztZQUNYLEtBQUs7WUFDTCxLQUFLO1NBQ04sQ0FBQyxDQUFDO1FBQ0gsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQVcsRUFBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ2xCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUE1QlksUUFBQSxXQUFXLGVBNEJ2QjtBQUVELDZCQUE2QjtBQUN0QixNQUFNLFlBQVksR0FBRyxDQUFDLEdBQTRCLEVBQUUsR0FBNkIsRUFBRSxFQUFFO0lBQzFGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO0lBQzdCLE1BQU0sS0FBSyxHQUFRO1FBQ2pCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLGVBQWUsRUFBRSxJQUFJO0tBQ3RCLENBQUE7SUFFRCxJQUFJLE9BQU87UUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUVyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3BCLElBQUksQ0FBQyxDQUFDLFFBQXlCLEVBQUUsRUFBRTtRQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsd0JBQWdCLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUN0QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFBO0FBYlksUUFBQSxZQUFZLGdCQWF4QjtBQUVELHVDQUF1QztBQUNoQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQTRCLEVBQUUsR0FBNkIsRUFBRSxFQUFFO0lBQzVGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO0lBQzdCLE1BQU0sS0FBSyxHQUFRO1FBQ2pCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLGVBQWUsRUFBRSxJQUFJO0tBQ3RCLENBQUE7SUFFRCxJQUFJLE9BQU87UUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUVyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3BCLElBQUksQ0FBQyxDQUFDLFFBQXlCLEVBQUUsRUFBRTtRQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsd0JBQWdCLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUN0QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFBO0FBYlksUUFBQSxjQUFjLGtCQWExQjtBQUVELCtDQUErQztBQUN4QyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQTRCLEVBQUUsR0FBNkIsRUFBRSxFQUFFO0lBQzVGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNmLFFBQVEsRUFBRSxTQUFTO1FBQ25CLGVBQWUsRUFBRSxJQUFJO0tBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUF5QixFQUFFLEVBQUU7UUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFBLHdCQUFnQixFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDdEMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQTtBQVBZLFFBQUEsY0FBYyxrQkFPMUI7QUFFTSxNQUFNLFdBQVcsR0FBRyxDQUFPLEdBQTRCLEVBQUUsR0FBNkIsRUFBRSxFQUFFO0lBQy9GLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBRTlCLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQztRQUN2QixhQUFhLEVBQUUsSUFBQSxxQkFBVyxFQUFDLE9BQU8sQ0FBQztLQUNwQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BCLElBQUksQ0FBQyxDQUFDLGdCQUF5QyxFQUFFLEVBQUU7UUFDbEQsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCO2FBQ3JDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxXQUFDLE9BQUEsSUFBQSxxQkFBVyxFQUFDLE1BQUMsQ0FBQSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFXLDBDQUFFLFFBQVEsRUFBRSxDQUFDLENBQUEsRUFBQSxDQUFDLENBQUE7UUFFbEcsT0FBTyxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQzdCLEdBQUcsRUFBRTtnQkFDSCxHQUFHLEVBQUUsZUFBZTthQUNyQjtTQUNGLEVBQUU7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLElBQUk7YUFDbEI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxJQUFBLHFCQUFXLEVBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVCxHQUFHLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQSxDQUFBO0FBM0JZLFFBQUEsV0FBVyxlQTJCdkI7QUFFTSxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQTRCLEVBQUUsR0FBNkIsRUFBRSxFQUFFO0lBQzNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBRTlCLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQztRQUN2QixhQUFhLEVBQUUsSUFBQSxxQkFBVyxFQUFDLE9BQU8sQ0FBQztLQUNwQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BCLElBQUksQ0FBQyxDQUFDLGdCQUF5QyxFQUFFLEVBQUU7UUFDbEQsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCO2FBQ3JDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxXQUFDLE9BQUEsSUFBQSxxQkFBVyxFQUFDLE1BQUMsQ0FBQSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFXLDBDQUFFLFFBQVEsRUFBRSxDQUFDLENBQUEsRUFBQSxDQUFDLENBQUE7UUFFbEcsT0FBTyxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQzdCLEdBQUcsRUFBRTtnQkFDSCxHQUFHLEVBQUUsZUFBZTthQUNyQjtTQUNGLEVBQUU7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLElBQUk7YUFDbEI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxJQUFBLHFCQUFXLEVBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDWCxHQUFHLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFDN0MsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQTtBQTNCWSxRQUFBLGFBQWEsaUJBMkJ6QjtBQUVNLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBNEIsRUFBRSxHQUE2QixFQUFFLEVBQUU7SUFDdEYsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFBLGNBQVksR0FBRSxDQUFBO0lBQ3hDLElBQUEsY0FBUSxFQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBRW5FLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUE7QUFMWSxRQUFBLFFBQVEsWUFLcEIifQ==