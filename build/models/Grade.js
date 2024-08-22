"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const grade = new mongoose_1.Schema({
    label: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    number: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    createdAt: Date,
    updatedAt: Date
});
// adding single index
grade.index({ number: 1 });
//pre tasks
grade.pre('save', function () {
    this.updatedAt = Date.now();
    return Promise.resolve(this);
});
(0, mongoose_1.model)('grade', grade);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0dyYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBR2tCO0FBR2xCLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQU0sQ0FBaUI7SUFDckMsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUN6QixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFNBQVMsRUFBRSxJQUFJO0lBQ2YsU0FBUyxFQUFFLElBQUk7Q0FDbEIsQ0FBQyxDQUFBO0FBRUYsc0JBQXNCO0FBQ3RCLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUUzQixXQUFXO0FBQ1gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDLENBQUM7QUFHSCxJQUFBLGdCQUFLLEVBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBIn0=