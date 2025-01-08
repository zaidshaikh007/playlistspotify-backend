import mongoose from "mongoose";

// Reference the Song schema to associate songs with playlists
const playlistSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  songs: []
}, { timestamps: true });

const PlaylistModel = mongoose.model("Playlist", playlistSchema);

export default PlaylistModel;