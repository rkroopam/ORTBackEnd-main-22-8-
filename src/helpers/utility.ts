import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const checkValueOfKeysIsPresentInData = (data: any = {}, requiredKeys: string[] = []) => {
    const value = {
        isSuccess: true,
        error: ''
    };
    for (const key in data) {
        const isInRequiredCheck = requiredKeys.includes(key);
        const keyValue = typeof data[key] === 'number' ? data[key] : data[key].trim()

        if (isInRequiredCheck && !keyValue) {
            value.isSuccess = false;
            value.error = `${key} is required`;

            break;
        }
    }

    return value;
}

export const getEncryptedPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const compareEncryptedPassword = (password: string, passwordHash: string) => {
    const isPasswordMatch = bcrypt.compareSync(password, passwordHash);
    return isPasswordMatch
}

export const getObjectId = (id: string) => new mongoose.Types.ObjectId(id)

export const isObjectIdValid = (id: any) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    return isValidObjectId;
}

export const updateExistingModel = (existingModel: any, newProperties: any) => {
    for (const key in newProperties) {
        existingModel[key] = newProperties[key];
    }
    return existingModel;
}