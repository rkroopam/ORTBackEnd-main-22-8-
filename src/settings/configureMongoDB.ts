import config from "config";
import mongoose from "mongoose";

const databaseConfig: {
    url: string
} = config.get('database');

export default (app: any) => {
    const db = mongoose.connection;

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
        mongoose.connect(databaseConfig?.url, {});
    };

    connect();
};