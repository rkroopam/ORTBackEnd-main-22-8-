import fs from "fs";
import path from "path";

export default (app: any) => {
    fs.readdirSync(path.join(__dirname, '../routings'))
        .forEach(file => {
            if (file.indexOf('.js') >= 0) {
                let filePath = path.join(__dirname, '../routings', file);
                const { default: router } = require(filePath);
                router(app)
            }
        });
};