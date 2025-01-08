"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Reference the Song schema to associate songs with playlists
const playlistSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please Enter the Playlist title"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    songs: []
}, { timestamps: true });
const PlaylistModel = mongoose_1.default.model("Playlist", playlistSchema);
exports.default = PlaylistModel;
