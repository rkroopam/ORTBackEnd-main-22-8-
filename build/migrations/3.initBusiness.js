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
const { business } = mongoose_1.default.models;
const runMigrationScript = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield new business({
            name: 'b2b',
            createdAt: Date.now(),
        }).save();
        yield new business({
            name: 'b2c',
            createdAt: Date.now(),
        }).save();
        console.log('Migrations Success: Business Created');
    }
    catch (error) {
        console.log('Migrations Failure: Creating Business', JSON.stringify(error));
    }
});
exports.runMigrationScript = runMigrationScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5pbml0QnVzaW5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlncmF0aW9ucy8zLmluaXRCdXNpbmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3REFBZ0M7QUFHaEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFBO0FBRzdCLE1BQU0sa0JBQWtCLEdBQUcsR0FBUyxFQUFFO0lBQzNDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBSSxRQUFRLENBQUM7WUFDakIsSUFBSSxFQUFFLEtBQUs7WUFDWCxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUN0QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7UUFFVCxNQUFNLElBQUksUUFBUSxDQUFDO1lBQ2pCLElBQUksRUFBRSxLQUFLO1lBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDdEIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1FBRVQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFDO0FBaEJXLFFBQUEsa0JBQWtCLHNCQWdCN0IifQ==