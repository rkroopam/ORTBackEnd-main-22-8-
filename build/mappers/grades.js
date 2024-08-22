"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGradeListModels = exports.toGradeModel = void 0;
const toGradeModel = (userData) => {
    var _a;
    const { label, number, _id, id } = userData;
    const data = {
        id: (_a = (id || _id)) === null || _a === void 0 ? void 0 : _a.toString(),
        label,
        number,
    };
    return data;
};
exports.toGradeModel = toGradeModel;
const toGradeListModels = (grades) => grades.map(item => (0, exports.toGradeModel)(item));
exports.toGradeListModels = toGradeListModels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hcHBlcnMvZ3JhZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVPLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBd0IsRUFBRSxFQUFFOztJQUN4RCxNQUFNLEVBQ0wsS0FBSyxFQUNMLE1BQU0sRUFDTixHQUFHLEVBQ0gsRUFBRSxFQUNGLEdBQUcsUUFBUSxDQUFDO0lBRWIsTUFBTSxJQUFJLEdBQUc7UUFDWixFQUFFLEVBQUUsTUFBQSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsMENBQUUsUUFBUSxFQUFFO1FBQzNCLEtBQUs7UUFDTCxNQUFNO0tBQ04sQ0FBQTtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFBO0FBZlksUUFBQSxZQUFZLGdCQWV4QjtBQUVNLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBQSxvQkFBWSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFBeEYsUUFBQSxpQkFBaUIscUJBQXVFIn0=