import fs from "fs";
import path from "path";
import mongoose from "mongoose";

export default (app: any) => {
    // const app = global?.app;
    return new Promise((res) => {
        fs.readdirSync(path.join(__dirname, '../models'))
            .forEach(file => {
                if (file.indexOf('.js') >= 0) {
                    require(path.join(__dirname, '../models', file));
                }
            });
        app.db = mongoose.models;
        return res(app);
    });
};