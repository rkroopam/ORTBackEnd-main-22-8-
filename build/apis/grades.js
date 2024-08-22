"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGrades = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const grades_1 = require("../mappers/grades");
const { grade } = mongoose_1.default.models;
const getGrades = (req, res) => {
    try {
        return grade.find().then((grades) => res.page((0, grades_1.toGradeListModels)(grades)));
    }
    catch (error) {
        res.failure(error);
    }
};
exports.getGrades = getGrades;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaXMvZ3JhZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUFnQztBQUVoQyw4Q0FBb0U7QUFFcEUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFBO0FBRTFCLE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBNEIsRUFBRSxHQUE2QixFQUFFLEVBQUU7SUFDdkYsSUFBSSxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsMEJBQWlCLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEIsQ0FBQztBQUNILENBQUMsQ0FBQTtBQU5ZLFFBQUEsU0FBUyxhQU1yQiJ9