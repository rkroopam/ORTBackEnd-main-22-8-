"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = (app) => {
    // const app = global?.app;
    return new Promise((res) => {
        fs_1.default.readdirSync(path_1.default.join(__dirname, '../models'))
            .forEach(file => {
            if (file.indexOf('.js') >= 0) {
                require(path_1.default.join(__dirname, '../models', file));
            }
        });
        app.db = mongoose_1.default.models;
        return res(app);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlREJNb2RlbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2V0dGluZ3MvY29uZmlndXJlREJNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBQ3hCLHdEQUFnQztBQUVoQyxrQkFBZSxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQ3hCLDJCQUEyQjtJQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdkIsWUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxHQUFHLENBQUMsRUFBRSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=