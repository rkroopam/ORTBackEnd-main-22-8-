"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExistingModel = exports.isObjectIdValid = exports.getObjectId = exports.compareEncryptedPassword = exports.getEncryptedPassword = exports.checkValueOfKeysIsPresentInData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const checkValueOfKeysIsPresentInData = (data = {}, requiredKeys = []) => {
    const value = {
        isSuccess: true,
        error: ''
    };
    for (const key in data) {
        const isInRequiredCheck = requiredKeys.includes(key);
        const keyValue = typeof data[key] === 'number' ? data[key] : data[key].trim();
        if (isInRequiredCheck && !keyValue) {
            value.isSuccess = false;
            value.error = `${key} is required`;
            break;
        }
    }
    return value;
};
exports.checkValueOfKeysIsPresentInData = checkValueOfKeysIsPresentInData;
const getEncryptedPassword = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(12);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    return hash;
};
exports.getEncryptedPassword = getEncryptedPassword;
const compareEncryptedPassword = (password, passwordHash) => {
    const isPasswordMatch = bcryptjs_1.default.compareSync(password, passwordHash);
    return isPasswordMatch;
};
exports.compareEncryptedPassword = compareEncryptedPassword;
const getObjectId = (id) => new mongoose_1.default.Types.ObjectId(id);
exports.getObjectId = getObjectId;
const isObjectIdValid = (id) => {
    const isValidObjectId = mongoose_1.default.Types.ObjectId.isValid(id);
    return isValidObjectId;
};
exports.isObjectIdValid = isObjectIdValid;
const updateExistingModel = (existingModel, newProperties) => {
    for (const key in newProperties) {
        existingModel[key] = newProperties[key];
    }
    return existingModel;
};
exports.updateExistingModel = updateExistingModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3V0aWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQThCO0FBQzlCLHdEQUFnQztBQUV6QixNQUFNLCtCQUErQixHQUFHLENBQUMsT0FBWSxFQUFFLEVBQUUsZUFBeUIsRUFBRSxFQUFFLEVBQUU7SUFDM0YsTUFBTSxLQUFLLEdBQUc7UUFDVixTQUFTLEVBQUUsSUFBSTtRQUNmLEtBQUssRUFBRSxFQUFFO0tBQ1osQ0FBQztJQUNGLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDckIsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sUUFBUSxHQUFHLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7UUFFN0UsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQztZQUVuQyxNQUFNO1FBQ1YsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDLENBQUE7QUFsQlksUUFBQSwrQkFBK0IsbUNBa0IzQztBQUVNLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDckQsTUFBTSxJQUFJLEdBQUcsa0JBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsTUFBTSxJQUFJLEdBQUcsa0JBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQTtBQUpZLFFBQUEsb0JBQW9CLHdCQUloQztBQUVNLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUMvRSxNQUFNLGVBQWUsR0FBRyxrQkFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbkUsT0FBTyxlQUFlLENBQUE7QUFDMUIsQ0FBQyxDQUFBO0FBSFksUUFBQSx3QkFBd0IsNEJBR3BDO0FBRU0sTUFBTSxXQUFXLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksa0JBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQTdELFFBQUEsV0FBVyxlQUFrRDtBQUVuRSxNQUFNLGVBQWUsR0FBRyxDQUFDLEVBQU8sRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sZUFBZSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUQsT0FBTyxlQUFlLENBQUM7QUFDM0IsQ0FBQyxDQUFBO0FBSFksUUFBQSxlQUFlLG1CQUczQjtBQUVNLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxhQUFrQixFQUFFLGFBQWtCLEVBQUUsRUFBRTtJQUMxRSxLQUFLLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQzlCLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUMsQ0FBQTtBQUxZLFFBQUEsbUJBQW1CLHVCQUsvQiJ9