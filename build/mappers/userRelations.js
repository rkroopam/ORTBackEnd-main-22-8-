"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserRelationListModels = exports.toUserRelationModel = void 0;
const utility_1 = require("../helpers/utility");
const users_1 = require("./users");
const toUserRelationModel = (userRelationData) => {
    var _a;
    const { adminUserId, createdAt, superAdminUserId, teacherUserId, updatedAt, userId, _id, id } = userRelationData;
    const data = {
        id: (_a = (id || _id)) === null || _a === void 0 ? void 0 : _a.toString(),
        updatedAt,
        createdAt,
    };
    if (superAdminUserId) {
        if ((0, utility_1.isObjectIdValid)(superAdminUserId) && !superAdminUserId.fName) {
            data.superAdminUserId = superAdminUserId.toString();
        }
        else {
            data.superAdminUserId = (0, users_1.toUserModelShort)(superAdminUserId);
        }
    }
    if (adminUserId) {
        if ((0, utility_1.isObjectIdValid)(adminUserId) && !adminUserId.fName) {
            data.adminUserId = adminUserId.toString();
        }
        else {
            data.adminUserId = (0, users_1.toUserModelShort)(adminUserId);
        }
    }
    if (teacherUserId) {
        if ((0, utility_1.isObjectIdValid)(teacherUserId) && !teacherUserId.fName) {
            data.teacherUserId = teacherUserId.toString();
        }
        else {
            data.teacherUserId = (0, users_1.toUserModelShort)(teacherUserId);
        }
    }
    if (userId) {
        if ((0, utility_1.isObjectIdValid)(userId) && !userId.fName) {
            data.userId = userId.toString();
        }
        else {
            data.userId = (0, users_1.toUserModelShort)(userId);
        }
    }
    return data;
};
exports.toUserRelationModel = toUserRelationModel;
const toUserRelationListModels = (grades) => grades.map(item => (0, exports.toUserRelationModel)(item));
exports.toUserRelationListModels = toUserRelationListModels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlbGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYXBwZXJzL3VzZXJSZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQXFEO0FBR3JELG1DQUEyQztBQUVwQyxNQUFNLG1CQUFtQixHQUFHLENBQUMsZ0JBQXVDLEVBQUUsRUFBRTs7SUFDOUUsTUFBTSxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixTQUFTLEVBQ1QsTUFBTSxFQUNOLEdBQUcsRUFDSCxFQUFFLEVBQ0YsR0FBRyxnQkFBZ0IsQ0FBQztJQUVyQixNQUFNLElBQUksR0FBUTtRQUNqQixFQUFFLEVBQUUsTUFBQSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsMENBQUUsUUFBUSxFQUFFO1FBQzNCLFNBQVM7UUFDVCxTQUFTO0tBQ1QsQ0FBQTtJQUVELElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUEseUJBQWUsRUFBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JELENBQUM7YUFDSSxDQUFDO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUEsd0JBQWdCLEVBQUMsZ0JBQWlDLENBQUMsQ0FBQztRQUM3RSxDQUFDO0lBQ0YsQ0FBQztJQUVELElBQUksV0FBVyxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFBLHlCQUFlLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsQ0FBQzthQUNJLENBQUM7WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUEsd0JBQWdCLEVBQUMsV0FBNEIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDRixDQUFDO0lBRUQsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUEseUJBQWUsRUFBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1RCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQyxDQUFDO2FBQ0ksQ0FBQztZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBQSx3QkFBZ0IsRUFBQyxhQUE4QixDQUFDLENBQUM7UUFDdkUsQ0FBQztJQUNGLENBQUM7SUFFRCxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1osSUFBSSxJQUFBLHlCQUFlLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakMsQ0FBQzthQUNJLENBQUM7WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUEsd0JBQWdCLEVBQUMsTUFBdUIsQ0FBQyxDQUFDO1FBQ3pELENBQUM7SUFDRixDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDLENBQUE7QUF2RFksUUFBQSxtQkFBbUIsdUJBdUQvQjtBQUVNLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxNQUErQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBQSwyQkFBbUIsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQTdHLFFBQUEsd0JBQXdCLDRCQUFxRiJ9