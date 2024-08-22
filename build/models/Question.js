"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const question = new mongoose_1.Schema({
    gradeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'grade'
    },
    questionDescription: {
        text: mongoose_1.Schema.Types.String,
        audios: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'file'
            }]
    },
    options: [{
            text: mongoose_1.Schema.Types.String,
            isCorrect: mongoose_1.Schema.Types.Boolean,
            audios: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'file'
                }]
        }],
    isMultiple: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    isPublic: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('question', question);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVlc3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1F1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBR2tCO0FBRWxCLE1BQU0sUUFBUSxHQUFHLElBQUksaUJBQU0sQ0FBQztJQUN4QixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsT0FBTztLQUNmO0lBQ0QsbUJBQW1CLEVBQUU7UUFDakIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDekIsTUFBTSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQzNCLEdBQUcsRUFBRSxNQUFNO2FBQ2QsQ0FBQztLQUNMO0lBQ0QsT0FBTyxFQUFFLENBQUM7WUFDTixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUN6QixTQUFTLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTztZQUMvQixNQUFNLEVBQUUsQ0FBQztvQkFDTCxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLE1BQU07aUJBQ2QsQ0FBQztTQUNMLENBQUM7SUFDRixVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTztRQUMxQixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPO1FBQzFCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQUE7QUFFRixJQUFBLGdCQUFLLEVBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBIn0=