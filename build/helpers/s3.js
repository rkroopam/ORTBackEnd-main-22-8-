"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileOnS3 = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("config"));
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../constants");
const awsConfig = config_1.default.get('aws');
const s3 = new aws_sdk_1.S3({
    accessKeyId: awsConfig.AWS_ACCESS_KEY,
    secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY,
});
const getBucket = () => {
    const env = process.env.NODE_ENV;
    switch (env) {
        case ('development'):
            return 'ort-develop';
        case 'production':
            return 'ort-production';
        default:
            return 'ort-develop';
    }
};
const getFolderNameByFileType = (fileType) => {
    switch (fileType) {
        case 'invoices':
            return constants_1.s3InvoicesFolderName;
        case 'questionOptionsDump':
            return constants_1.s3QuestionOptionsDumpFolderName;
        default:
            break;
    }
};
const uploadFileOnS3 = ({ fileName, filePath, fileType, contentType }) => {
    return new Promise((res, rej) => {
        fs_1.default.readFile(filePath, (err, data) => {
            if (err)
                throw err;
            const bucketPath = `${getBucket()}/${getFolderNameByFileType(fileType)}`;
            const params = {
                Bucket: bucketPath,
                Key: fileName,
                Body: data,
                ContentType: contentType,
                ACL: "public-read",
            };
            s3.upload(params, function (err, data) {
                if (err)
                    return rej(err);
                console.log(`File uploaded successfully at ${data.Location}`);
                return res(data.Location);
            });
        });
    });
};
exports.uploadFileOnS3 = uploadFileOnS3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9zMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsb0RBQTRCO0FBQzVCLHFDQUE2QjtBQUU3Qiw0Q0FHc0I7QUFFdEIsTUFBTSxTQUFTLEdBR1gsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFdEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFFLENBQUM7SUFDaEIsV0FBVyxFQUFFLFNBQVMsQ0FBQyxjQUFjO0lBQ3JDLGVBQWUsRUFBRSxTQUFTLENBQUMscUJBQXFCO0NBQ2pELENBQUMsQ0FBQztBQUVILE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRTtJQUNyQixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUNqQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ1osS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUNsQixPQUFPLGFBQWEsQ0FBQztRQUN2QixLQUFLLFlBQVk7WUFDZixPQUFPLGdCQUFnQixDQUFDO1FBQzFCO1lBQ0UsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDbkQsUUFBUSxRQUFRLEVBQUUsQ0FBQztRQUNqQixLQUFLLFVBQVU7WUFDYixPQUFPLGdDQUFvQixDQUFDO1FBQzlCLEtBQUsscUJBQXFCO1lBQ3hCLE9BQU8sMkNBQStCLENBQUM7UUFDekM7WUFDRSxNQUFNO0lBQ1YsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVNLE1BQU0sY0FBYyxHQUFHLENBQzVCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUFFLFdBQVcsRUFJdEIsRUFBRSxFQUFFO0lBQ0wsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM5QixZQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNsQyxJQUFJLEdBQUc7Z0JBQUUsTUFBTSxHQUFHLENBQUM7WUFDbkIsTUFBTSxVQUFVLEdBQUcsR0FBRyxTQUFTLEVBQUUsSUFBSSx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ3pFLE1BQU0sTUFBTSxHQUFHO2dCQUNiLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixHQUFHLEVBQUUsUUFBUTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsV0FBVztnQkFDeEIsR0FBRyxFQUFFLGFBQWE7YUFDbkIsQ0FBQztZQUVGLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsR0FBUSxFQUFFLElBQVM7Z0JBQzdDLElBQUksR0FBRztvQkFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzlELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUM7QUEzQlcsUUFBQSxjQUFjLGtCQTJCekIifQ==