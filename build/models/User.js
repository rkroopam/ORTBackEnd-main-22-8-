"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const jwtConfig = config_1.default.get('jwt');
const UserSchema = new mongoose_1.Schema({
    fName: mongoose_1.Schema.Types.String,
    lName: mongoose_1.Schema.Types.String,
    username: mongoose_1.Schema.Types.String,
    email: mongoose_1.Schema.Types.String,
    isEmailVerified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    age: mongoose_1.Schema.Types.Number,
    country: mongoose_1.Schema.Types.String,
    phoneCountryCode: mongoose_1.Schema.Types.String,
    phoneNumber: mongoose_1.Schema.Types.String,
    password: mongoose_1.Schema.Types.String,
    token: mongoose_1.Schema.Types.String,
    gradeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'grade',
        default: null
    },
    userType: {
        type: String,
        enum: ['superAdmin', 'admin',
            'teacher', 'student'],
    },
    userRelationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'userRelation'
    },
    isLicensed: mongoose_1.Schema.Types.Boolean,
    businessId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'business'
    },
    createdAt: Date,
    updatedAt: Date
});
// adding single index
UserSchema.index({ email: 1 });
//pre tasks
UserSchema.pre('save', function () {
    this.updatedAt = Date.now();
    return Promise.resolve(this);
});
UserSchema.statics.buildToken = (userId) => {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.sign({
            userId,
            date: new Date(),
        }, jwtConfig.secret, 
        // { expiresIn: jwtConfig.expiredTime }
        (err, data) => {
            if (err)
                return rej(err);
            return res(data);
        });
    });
};
UserSchema.statics.verifyToken = (token) => {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.verify(token, jwtConfig.secret, function (err, data) {
            if (err) {
                console.log(err);
                if (err.name === "TokenExpiredError") {
                    return rej('user is unauthorized');
                }
                else {
                    return rej('Oops! Something Went wrong!');
                }
            }
            res(data);
        });
    });
};
const UserModel = (0, mongoose_1.model)('user', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUdrQjtBQUNsQixnRUFBK0I7QUFDL0Isb0RBQTRCO0FBRzVCLE1BQU0sU0FBUyxHQUdYLGdCQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXRCLE1BQU0sVUFBVSxHQUFHLElBQUksaUJBQU0sQ0FBNEI7SUFDdkQsS0FBSyxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDMUIsS0FBSyxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDMUIsUUFBUSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDN0IsS0FBSyxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDMUIsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU87UUFDMUIsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEdBQUcsRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQ3hCLE9BQU8sRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQzVCLGdCQUFnQixFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDckMsV0FBVyxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDaEMsUUFBUSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDN0IsS0FBSyxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07SUFDMUIsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLE9BQU87UUFDWixPQUFPLEVBQUUsSUFBSTtLQUNkO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVB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