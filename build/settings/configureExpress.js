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
const express_app_generator_1 = require("express-app-generator");
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// import passport from '../helpers/passport';
// import wrapper from '../middlewares/wrapper'
const serverConfig = config_1.default.get('server');
const pid = process.pid;
const addConfigurations = (app) => {
    app.use((0, cors_1.default)());
    app.use("/static", express_1.default.static(path_1.default.join(__dirname, 'public')));
    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.all('*', wrapper); // middleware for all requests
};
const generateExpress = () => {
    return new Promise((res, rej) => {
        (0, express_app_generator_1.generate)(serverConfig === null || serverConfig === void 0 ? void 0 : serverConfig.port, 'build/apis', (err, app) => {
            var _a;
            if (err)
                return rej(err);
            console.log(`listening on ${serverConfig === null || serverConfig === void 0 ? void 0 : serverConfig.port}`);
            console.log(`environment is ${(_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toUpperCase()}`);
            console.log(`Started Process ${pid}`);
            addConfigurations(app);
            // global.app = app as any;
            return res({ app });
        });
    });
};
const expressSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield generateExpress();
});
exports.default = expressSettings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlRXhwcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXR0aW5ncy9jb25maWd1cmVFeHByZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBRStCO0FBQy9CLG9EQUE0QjtBQUM1QixnREFBd0I7QUFDeEIsc0RBQThCO0FBQzlCLGdEQUF3QjtBQUN4Qiw4Q0FBOEM7QUFDOUMsK0NBQStDO0FBRS9DLE1BQU0sWUFBWSxHQUVkLGdCQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRSxrQ0FBa0M7SUFDbEMsK0JBQStCO0lBQy9CLHdEQUF3RDtBQUM1RCxDQUFDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7SUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM1QixJQUFBLGdDQUFXLEVBQUMsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7O1lBQ2pFLElBQUksR0FBRztnQkFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSwwQ0FBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN0QyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QiwyQkFBMkI7WUFDM0IsT0FBTyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBRyxHQUFTLEVBQUU7SUFDL0IsT0FBTyxNQUFNLGVBQWUsRUFBRSxDQUFDO0FBQ25DLENBQUMsQ0FBQSxDQUFDO0FBRUYsa0JBQWUsZUFBZSxDQUFDIn0=