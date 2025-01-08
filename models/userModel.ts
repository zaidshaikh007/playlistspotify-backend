import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
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

module.exports = mongoose.model("User", userSchema);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;