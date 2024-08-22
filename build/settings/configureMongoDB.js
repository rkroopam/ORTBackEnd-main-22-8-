"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const databaseConfig = config_1.default.get('database');
exports.default = (app) => {
    const db = mongoose_1.default.connection;
    // listeners
    db.on('connected', () => {
        console.info('DB Connected');
        app.emit('dbConnected');
    });
    db.on('error', (err) => {
        throw ('Mongoose default connection error: ' + err);
    });
    db.on('disconnected', () => {
        console.info('Again going to connect DB');
        connect();
    });
    const connect = () => {
        mongoose_1.default.connect(databaseConfig === null || databaseConfig === void 0 ? void 0 : databaseConfig.url, {});
    };
    connect();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlTW9uZ29EQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXR0aW5ncy9jb25maWd1cmVNb25nb0RCLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLHdEQUFnQztBQUVoQyxNQUFNLGNBQWMsR0FFaEIsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFM0Isa0JBQWUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUN4QixNQUFNLEVBQUUsR0FBRyxrQkFBUSxDQUFDLFVBQVUsQ0FBQztJQUUvQixZQUFZO0lBQ1osRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDbkIsTUFBTSxDQUFDLHFDQUFxQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxQyxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLGtCQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0lBRUYsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDLENBQUMifQ==