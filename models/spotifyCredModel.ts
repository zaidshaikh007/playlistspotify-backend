import mongoose from "mongoose";

const spotifyCredSchema = new mongoose.Schema({
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

const spotifyCredModel = mongoose.model("SpotifyCred", spotifyCredSchema);

export default spotifyCredModel;
