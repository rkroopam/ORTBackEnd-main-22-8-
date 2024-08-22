import express from "./settings/configureExpress";
import configureDB from "./settings/configureMongoDB";
import configureDBModels from "./settings/configureDBModels";
import configureRoutes from "./settings/configureRoutes";
import configureMigrations from "./settings/configureMigrations";

// import os from "os";
// const cluster = require('cluster');

const runXpRateApp = () => {
  express()
    .then((data: any) => {
      const { app } = data
      configureDB(app);
      app.on('dbConnected', async function () {
        const updatedAppWithDB = await configureDBModels(app);
        configureRoutes(updatedAppWithDB);
        await configureMigrations();
      });
    }).catch((err: any) => {
      console.log(err);
    });
}

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