"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const spotifyCredSchema = new mongoose_1.default.Schema({
    access_token: {
        type: String,
        trim: true
    },
    token_type: {
        type: String,
        trim: true
    },
    expires_in: {
        type: Number,
        trim: true
    }
}, { timestamps: true });
const spotifyCredModel = mongoose_1.default.model("SpotifyCred", spotifyCredSchema);
exports.default = spotifyCredModel;
