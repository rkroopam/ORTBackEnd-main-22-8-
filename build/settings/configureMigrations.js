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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const getSumUpMigrations = () => {
    const toRunMigrations = [];
    fs_1.default.readdirSync(path_1.default.join(__dirname, '../migrations'))
        .forEach(file => {
        if (file.indexOf('.js') >= 0) {
            toRunMigrations.push({
                fileName: file,
                fileData: require(path_1.default.join(__dirname, '../migrations', file)),
            });
        }
    });
    return toRunMigrations;
};
const configureMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    const { migration } = mongoose_1.default.models;
    const toRunMigrations = getSumUpMigrations();
    console.log('---Running Migrations---');
    try {
        for (const migrationFile of toRunMigrations) {
            let migrationDBDetails = yield migration.findOne({
                name: migrationFile.fileName
            });
            if (migrationDBDetails && migrationDBDetails.status === 'success') {
                continue;
            }
            if (!migrationDBDetails) {
                migrationDBDetails = yield new migration({
                    name: migrationFile.fileName,
                    createdAt: Date.now(),
                }).save();
            }
            if (migrationDBDetails && migrationDBDetails.status === 'inProgress') {
                yield migrationFile.fileData.runMigrationScript();
                migrationDBDetails.status = 'success';
                yield migrationDBDetails.save();
                continue;
            }
        }
        console.log('--- Migrations Done ---');
    }
    catch (error) {
        console.log('Error on migration --- ');
        throw error;
    }
});
exports.default = configureMigrations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlTWlncmF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXR0aW5ncy9jb25maWd1cmVNaWdyYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4Qix3REFBZ0M7QUFFaEMsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7SUFDOUIsTUFBTSxlQUFlLEdBQVEsRUFBRSxDQUFDO0lBQ2hDLFlBQUUsQ0FBQyxXQUFXLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzdCLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQy9ELENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsR0FBUyxFQUFFO0lBQ3JDLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxrQkFBUSxDQUFDLE1BQU0sQ0FBQTtJQUNyQyxNQUFNLGVBQWUsR0FBRyxrQkFBa0IsRUFBRSxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUV4QyxJQUFJLENBQUM7UUFDSCxLQUFLLE1BQU0sYUFBYSxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzVDLElBQUksa0JBQWtCLEdBQUcsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUMvQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7YUFDN0IsQ0FBQyxDQUFDO1lBRUgsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ2xFLFNBQVM7WUFDWCxDQUFDO1lBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3hCLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxTQUFTLENBQUM7b0JBQ3ZDLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtvQkFDNUIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7aUJBQ3RCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLENBQUM7WUFHRCxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxZQUFZLEVBQUUsQ0FBQztnQkFDckUsTUFBTSxhQUFhLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ2xELGtCQUFrQixDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQ3RDLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hDLFNBQVM7WUFDWCxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN2QyxNQUFNLEtBQUssQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVELGtCQUFlLG1CQUFtQixDQUFDIn0=