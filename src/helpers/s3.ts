import fs from "fs";
import config from "config";
import { S3 } from 'aws-sdk';

import {
  s3InvoicesFolderName,
  s3QuestionOptionsDumpFolderName
} from "../constants";

const awsConfig: {
  AWS_ACCESS_KEY: string
  AWS_SECRET_ACCESS_KEY: string
} = config.get('aws');

const s3 = new S3({
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
}

const getFolderNameByFileType = (fileType: string) => {
  switch (fileType) {
    case 'invoices':
      return s3InvoicesFolderName;
    case 'questionOptionsDump':
      return s3QuestionOptionsDumpFolderName;
    default:
      break;
  }
}

export const uploadFileOnS3 = (
  { fileName, filePath,
    fileType, contentType
  }: {
    fileName: string, filePath: string,
    fileType: string, contentType: string
  }) => {
  return new Promise((res, rej) => {
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      const bucketPath = `${getBucket()}/${getFolderNameByFileType(fileType)}`;
      const params = {
        Bucket: bucketPath,
        Key: fileName,
        Body: data,
        ContentType: contentType,
        ACL: "public-read",
      };

      s3.upload(params, function (err: any, data: any) {
        if (err) return rej(err);

        console.log(`File uploaded successfully at ${data.Location}`);
        return res(data.Location);
      });
    });
  })
};
