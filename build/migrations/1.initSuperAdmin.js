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
exports.runMigrationScript = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const utility_1 = require("../helpers/utility");
const User_1 = __importDefault(require("../models/User"));
const { user } = mongoose_1.default.models;
const adminConfig = config_1.default.get('admin');
const runMigrationScript = () => __awaiter(void 0, void 0, void 0, function* () {
    const userAsSuperAdmin = yield user.findOne({
        userType: 'superAdmin'
    });
    if (!userAsSuperAdmin) {
        yield new user({
            email: adminConfig.mailId,
            isEmailVerified: true,
            fName: 'Super Admin',
            lName: 'ORT',
            userType: 'superAdmin',
            password: (0, utility_1.getEncryptedPassword)(adminConfig.password),
            createdAt: Date.now(),
        })
            .save()
            .then((userData) => __awaiter(void 0, void 0, void 0, function* () {
            const userId = (userData.id || userData._id);
            userData.token = yield User_1.default.buildToken(userId);
            return userData.save();
        }))
            .then(() => {
            console.log('Migrations Success: Created Super Admin');
        })
            .catch((err) => {
            console.log('Migrations Failure: Created Super Admin', JSON.stringify(err));
        });
    }
});
exports.runMigrationScript = runMigrationScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5pbml0U3VwZXJBZG1pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWdyYXRpb25zLzEuaW5pdFN1cGVyQWRtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLHdEQUFnQztBQUNoQyxnREFBMEQ7QUFFMUQsMERBQXVDO0FBRXZDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxrQkFBUSxDQUFDLE1BQU0sQ0FBQTtBQUNoQyxNQUFNLFdBQVcsR0FHYixnQkFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVqQixNQUFNLGtCQUFrQixHQUFHLEdBQVMsRUFBRTtJQUUzQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxRQUFRLEVBQUUsWUFBWTtLQUN2QixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN0QixNQUFNLElBQUksSUFBSSxDQUFDO1lBQ2IsS0FBSyxFQUFFLFdBQVcsQ0FBQyxNQUFNO1lBQ3pCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLEtBQUssRUFBRSxhQUFhO1lBQ3BCLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLElBQUEsOEJBQW9CLEVBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNwRCxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUN0QixDQUFDO2FBQ0MsSUFBSSxFQUFFO2FBQ04sSUFBSSxDQUFDLENBQU8sUUFBdUIsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFXLENBQUE7WUFDdEQsUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLGNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFBLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFDO0FBN0JXLFFBQUEsa0JBQWtCLHNCQTZCN0IifQ==