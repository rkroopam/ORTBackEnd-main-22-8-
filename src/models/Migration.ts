import {
  Schema,
  model
} from 'mongoose';
import { IMigrationDocument } from '../typings/migration';

const migration = new Schema<IMigrationDocument>({
  name: String,
  status: {
    type: String,
    enum: ['success', 'inProgress'],
    default: 'inProgress',
  },
  createdAt: Date,
  updatedAt: Date,
});

//pre tasks
migration.pre('save', function () {
  this.updatedAt = Date.now();
  return Promise.resolve(this);
});

model('migration', migration);
