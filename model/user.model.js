import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSechema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSechema.statics.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

userSechema.methods.comparePassword = async function(password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

userSechema.methods.generateToken = function () {
  const token = jwt.sign({ email: this.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const UserModel = mongoose.model("user", userSechema);

export default UserModel;
