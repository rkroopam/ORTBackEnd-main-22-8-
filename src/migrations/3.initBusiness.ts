import config from "config";
import mongoose from "mongoose";
import { getEncryptedPassword } from "../helpers/utility";

const { business } = mongoose.models


export const runMigrationScript = async () => {
  try {
    await new business({
      name: 'b2b',
      createdAt: Date.now(),
    }).save()

    await new business({
      name: 'b2c',
      createdAt: Date.now(),
    }).save()

    console.log('Migrations Success: Business Created');
  } catch (error) {
    console.log('Migrations Failure: Creating Business', JSON.stringify(error));
  }
};