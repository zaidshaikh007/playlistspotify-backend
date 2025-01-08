"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter Your First Name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please Enter Your Last Name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
    },
    mobile: {
        type: Number
    }
}, { timestamps: true });
module.exports = mongoose_1.default.model("User", userSchema);
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
