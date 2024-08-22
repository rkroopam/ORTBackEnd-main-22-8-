"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userRelation = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    teacherUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    adminUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    superAdminUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('userRelation', userRelation);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlbGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Vc2VyUmVsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FHa0I7QUFHbEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxpQkFBTSxDQUF3QjtJQUNuRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsTUFBTTtRQUNYLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLE1BQU07UUFDWCxPQUFPLEVBQUUsSUFBSTtLQUNoQjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxNQUFNO1FBQ1gsT0FBTyxFQUFFLElBQUk7S0FDaEI7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxNQUFNO0tBQ2Q7SUFDRCxTQUFTLEVBQUUsSUFBSTtJQUNmLFNBQVMsRUFBRSxJQUFJO0NBQ2xCLENBQUMsQ0FBQTtBQUVGLElBQUEsZ0JBQUssRUFBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUMifQ==