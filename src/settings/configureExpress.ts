import {
    generate as generateApp
} from 'express-app-generator';
import config from "config";
import cors from "cors";
import express from "express";
import path from "path";
// import passport from '../helpers/passport';
// import wrapper from '../middlewares/wrapper'

const serverConfig: {
    port: number
} = config.get('server');
const pid = process.pid;

const addConfigurations = (app: any) => {
    app.use(cors());
    app.use("/static", express.static(path.join(__dirname, 'public')));

    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.all('*', wrapper); // middleware for all requests
};

const generateExpress = () => {
    return new Promise((res, rej) => {
        generateApp(serverConfig?.port, 'build/apis', (err: any, app: any) => {
            if (err) return rej(err);
            console.log(`listening on ${serverConfig?.port}`);
            console.log(`environment is ${process.env.NODE_ENV?.toUpperCase()}`);
            console.log(`Started Process ${pid}`);
            addConfigurations(app);
            // global.app = app as any;
            return res({ app });
        });
    });
};

const expressSettings = async () => {
    return await generateExpress();
};

export default expressSettings;