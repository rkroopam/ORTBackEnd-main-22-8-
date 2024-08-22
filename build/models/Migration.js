"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const migration = new mongoose_1.Schema({
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
(0, mongoose_1.model)('migration', migration);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9NaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FHa0I7QUFHbEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxpQkFBTSxDQUFxQjtJQUMvQyxJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztRQUMvQixPQUFPLEVBQUUsWUFBWTtLQUN0QjtJQUNELFNBQVMsRUFBRSxJQUFJO0lBQ2YsU0FBUyxFQUFFLElBQUk7Q0FDaEIsQ0FBQyxDQUFDO0FBRUgsV0FBVztBQUNYLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO0lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzVCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsZ0JBQUssRUFBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMifQ==