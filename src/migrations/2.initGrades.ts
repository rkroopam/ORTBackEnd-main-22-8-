import config from "config";
import mongoose from "mongoose";
import { getEncryptedPassword } from "../helpers/utility";

const { grade } = mongoose.models


export const runMigrationScript = async () => {
  try {
    for (let index = 1; index <= 12; index++) {
      const gradeData = await grade.findOne({
        number: index
      });

      if (!gradeData) {
        await new grade({
          number: index,
          label: `Grade ${index}`,
          createdAt: Date.now(),
        }).save()
      }
    }

    console.log('Migrations Success: Grades Created');
  } catch (error) {
    console.log('Migrations Failure: Creating Grades', JSON.stringify(error));
  }
};