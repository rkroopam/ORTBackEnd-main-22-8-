"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const business = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        enum: ['b2b', 'b2c'],
        required: true,
    },
    createdAt: Date,
    updatedAt: Date
});
(0, mongoose_1.model)('business', business);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVzaW5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0J1c2luZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBR2tCO0FBRWxCLE1BQU0sUUFBUSxHQUFHLElBQUksaUJBQU0sQ0FBQztJQUN4QixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUN6QixJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBQ3BCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQUE7QUFFRixJQUFBLGdCQUFLLEVBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBIn0=