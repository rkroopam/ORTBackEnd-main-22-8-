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
const mongoose_1 = __importDefault(require("mongoose"));
const { grade } = mongoose_1.default.models;
const runMigrationScript = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let index = 1; index <= 12; index++) {
            const gradeData = yield grade.findOne({
                number: index
            });
            if (!gradeData) {
                yield new grade({
                    number: index,
                    label: `Grade ${index}`,
                    createdAt: Date.now(),
                }).save();
            }
        }
        console.log('Migrations Success: Grades Created');
    }
    catch (error) {
        console.log('Migrations Failure: Creating Grades', JSON.stringify(error));
    }
});
exports.runMigrationScript = runMigrationScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5pbml0R3JhZGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZ3JhdGlvbnMvMi5pbml0R3JhZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdEQUFnQztBQUdoQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsa0JBQVEsQ0FBQyxNQUFNLENBQUE7QUFHMUIsTUFBTSxrQkFBa0IsR0FBRyxHQUFTLEVBQUU7SUFDM0MsSUFBSSxDQUFDO1FBQ0gsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDcEMsTUFBTSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQztvQkFDZCxNQUFNLEVBQUUsS0FBSztvQkFDYixLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7b0JBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO2lCQUN0QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDWCxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQXBCVyxRQUFBLGtCQUFrQixzQkFvQjdCIn0=