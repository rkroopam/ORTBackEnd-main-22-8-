"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserListModels = exports.toUserModel = exports.toUserModelShort = exports.toSelfUserModel = void 0;
const utility_1 = require("../helpers/utility");
const toSelfUserModel = (userData) => {
    const { token, password, } = userData;
    const data = Object.assign(Object.assign({}, (0, exports.toUserModel)(userData)), { token,
        password });
    return data;
};
exports.toSelfUserModel = toSelfUserModel;
const toUserModelShort = (userData) => {
    var _a;
    const { id, _id, fName, lName, userType, } = userData;
    const data = {
        id: (_a = (id || _id)) === null || _a === void 0 ? void 0 : _a.toString(),
        fName,
        lName,
        userType,
    };
    return data;
};
exports.toUserModelShort = toUserModelShort;
const toUserModel = (userData) => {
    var _a, _b, _c;
    const { id, _id, age, businessId, country, createdAt, email, fName, grade, gradeId, isLicensed, lName, phoneCountryCode, phoneNumber, updatedAt, userType, username } = userData;
    const data = {
        id: (_a = (id || _id)) === null || _a === void 0 ? void 0 : _a.toString(),
        age,
        businessId: null,
        country,
        createdAt,
        email, fName, grade,
        gradeId: null,
        isLicensed,
        lName, phoneCountryCode, phoneNumber,
        updatedAt, userType, username
    };
    if (businessId) {
        if ((0, utility_1.isObjectIdValid)(businessId)) {
            data.businessId = businessId.toString();
        }
        else {
            data.businessId = {
                id: (_b = (businessId.id || businessId._id)) === null || _b === void 0 ? void 0 : _b.toString(),
                name: businessId.name,
            };
        }
    }
    if (gradeId) {
        if ((0, utility_1.isObjectIdValid)(gradeId)) {
            data.gradeId = gradeId.toString();
        }
        else {
            data.gradeId = {
                id: (_c = (gradeId._id || gradeId._id)) === null || _c === void 0 ? void 0 : _c.toString(),
                label: gradeId.label,
                number: gradeId.number,
            };
        }
    }
    return data;
};
exports.toUserModel = toUserModel;
const toUserListModels = (userList) => userList.map(user => (0, exports.toUserModel)(user));
exports.toUserListModels = toUserListModels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFwcGVycy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBcUQ7QUFJOUMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxRQUF1QixFQUFFLEVBQUU7SUFDMUQsTUFBTSxFQUNMLEtBQUssRUFDTCxRQUFRLEdBQ1IsR0FBRyxRQUFRLENBQUM7SUFFYixNQUFNLElBQUksbUNBQ04sSUFBQSxtQkFBVyxFQUFDLFFBQVEsQ0FBQyxLQUN4QixLQUFLO1FBQ0wsUUFBUSxHQUNSLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQTtBQUNaLENBQUMsQ0FBQTtBQVpZLFFBQUEsZUFBZSxtQkFZM0I7QUFFTSxNQUFNLGdCQUFnQixHQUFHLENBQUMsUUFBdUIsRUFBRSxFQUFFOztJQUMzRCxNQUFNLEVBQ0wsRUFBRSxFQUNGLEdBQUcsRUFDSCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFFBQVEsR0FDUixHQUFHLFFBQVEsQ0FBQztJQUViLE1BQU0sSUFBSSxHQUFHO1FBQ1osRUFBRSxFQUFFLE1BQUEsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLDBDQUFFLFFBQVEsRUFBRTtRQUMzQixLQUFLO1FBQ0wsS0FBSztRQUNMLFFBQVE7S0FDUixDQUFBO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDLENBQUE7QUFqQlksUUFBQSxnQkFBZ0Isb0JBaUI1QjtBQUVNLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBdUIsRUFBRSxFQUFFOztJQUN0RCxNQUFNLEVBQ0wsRUFBRSxFQUNGLEdBQUcsRUFDSCxHQUFHLEVBQ0gsVUFBVSxFQUNWLE9BQU8sRUFDUCxTQUFTLEVBQ1QsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFDeEMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFDcEMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQzdCLEdBQUcsUUFBUSxDQUFDO0lBRWIsTUFBTSxJQUFJLEdBQVE7UUFDakIsRUFBRSxFQUFFLE1BQUEsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLDBDQUFFLFFBQVEsRUFBRTtRQUMzQixHQUFHO1FBQ0gsVUFBVSxFQUFFLElBQUk7UUFDaEIsT0FBTztRQUNQLFNBQVM7UUFDVCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDbkIsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVO1FBQ1YsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFdBQVc7UUFDcEMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRO0tBQzdCLENBQUE7SUFFRCxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2hCLElBQUksSUFBQSx5QkFBZSxFQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekMsQ0FBQzthQUNJLENBQUM7WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHO2dCQUNqQixFQUFFLEVBQUUsTUFBQSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxRQUFRLEVBQUU7Z0JBQ2pELElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTthQUNyQixDQUFDO1FBQ0gsQ0FBQztJQUNGLENBQUM7SUFFRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2IsSUFBSSxJQUFBLHlCQUFlLEVBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQVksQ0FBQztRQUM3QyxDQUFDO2FBQ0ksQ0FBQztZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUc7Z0JBQ2QsRUFBRSxFQUFFLE1BQUEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQUUsUUFBUSxFQUFFO2dCQUM1QyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTthQUN0QixDQUFDO1FBQ0gsQ0FBQztJQUNGLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQTtBQXBEWSxRQUFBLFdBQVcsZUFvRHZCO0FBRU0sTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFFBQXlCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUF6RixRQUFBLGdCQUFnQixvQkFBeUUifQ==