import fs from "fs";
import path from "path";
import mongoose from "mongoose";

const getSumUpMigrations = () => {
  const toRunMigrations: any = [];
  fs.readdirSync(path.join(__dirname, '../migrations'))
    .forEach(file => {
      if (file.indexOf('.js') >= 0) {
        toRunMigrations.push({
          fileName: file,
          fileData: require(path.join(__dirname, '../migrations', file)),
        });
      }
    });
  return toRunMigrations;
};

const configureMigrations = async () => {
  const { migration } = mongoose.models
  const toRunMigrations = getSumUpMigrations();
  console.log('---Running Migrations---');

  try {
    for (const migrationFile of toRunMigrations) {
      let migrationDBDetails = await migration.findOne({
        name: migrationFile.fileName
      });

      if (migrationDBDetails && migrationDBDetails.status === 'success') {
        continue;
      }

      if (!migrationDBDetails) {
        migrationDBDetails = await new migration({
          name: migrationFile.fileName,
          createdAt: Date.now(),
        }).save();
      }


      if (migrationDBDetails && migrationDBDetails.status === 'inProgress') {
        await migrationFile.fileData.runMigrationScript();
        migrationDBDetails.status = 'success';
        await migrationDBDetails.save();
        continue;
      }
    }

    console.log('--- Migrations Done ---');
  } catch (error) {
    console.log('Error on migration --- ');
    throw error;
  }
}

export default configureMigrations;