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
const configureExpress_1 = __importDefault(require("./settings/configureExpress"));
const configureMongoDB_1 = __importDefault(require("./settings/configureMongoDB"));
const configureDBModels_1 = __importDefault(require("./settings/configureDBModels"));
const configureRoutes_1 = __importDefault(require("./settings/configureRoutes"));
const configureMigrations_1 = __importDefault(require("./settings/configureMigrations"));
// import os from "os";
// const cluster = require('cluster');
const runXpRateApp = () => {
    (0, configureExpress_1.default)()
        .then((data) => {
        const { app } = data;
        (0, configureMongoDB_1.default)(app);
        app.on('dbConnected', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const updatedAppWithDB = yield (0, configureDBModels_1.default)(app);
                (0, configureRoutes_1.default)(updatedAppWithDB);
                yield (0, configureMigrations_1.default)();
            });
        });
    }).catch((err) => {
        console.log(err);
    });
};
runXpRateApp();
// if (cluster.isMaster) {
// 	const numberOfCPUs = os.cpus().length;
// 	console.log(`Master cluster setting up ${numberOfCPUs} workers...`);
// 	for(var i = 0; i < numberOfCPUs; i++) {
// 			cluster.fork();
// 	}
// 	cluster.on('online', function(worker) {
// 			console.log(`Worker ${worker.process.pid} is online`);
// 	});
// 	cluster.on('exit', function(worker, code, signal) {
// 			console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
// 			console.log('Starting a new worker');
// 			cluster.fork();
// 	});
// } else {
// 	runXpRateApp();
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG1GQUFrRDtBQUNsRCxtRkFBc0Q7QUFDdEQscUZBQTZEO0FBQzdELGlGQUF5RDtBQUN6RCx5RkFBaUU7QUFFakUsdUJBQXVCO0FBQ3ZCLHNDQUFzQztBQUV0QyxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDeEIsSUFBQSwwQkFBTyxHQUFFO1NBQ04sSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDbEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNwQixJQUFBLDBCQUFXLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7O2dCQUNwQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBQSwyQkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEQsSUFBQSx5QkFBZSxFQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sSUFBQSw2QkFBbUIsR0FBRSxDQUFDO1lBQzlCLENBQUM7U0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBRUQsWUFBWSxFQUFFLENBQUM7QUFFZiwwQkFBMEI7QUFDMUIsMENBQTBDO0FBRTFDLHdFQUF3RTtBQUV4RSwyQ0FBMkM7QUFDM0MscUJBQXFCO0FBQ3JCLEtBQUs7QUFFTCwyQ0FBMkM7QUFDM0MsNERBQTREO0FBQzVELE9BQU87QUFFUCx1REFBdUQ7QUFDdkQsaUdBQWlHO0FBQ2pHLDJDQUEyQztBQUMzQyxxQkFBcUI7QUFDckIsT0FBTztBQUNQLFdBQVc7QUFDWCxtQkFBbUI7QUFDbkIsSUFBSSJ9