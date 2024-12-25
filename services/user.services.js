import UserModel from "../model/user.model.js";

export const createUser = async (user) => {
  const { email, username, name, password } = user;

  if (!email || !username || !password || !name) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await UserModel.hashPassword(password);
  const newUser = new UserModel({
    email,
    username,
    name,
    password: hashedPassword,
  });

  return newUser.save();
};

export const findUser = async (email) => {
  const user = await UserModel.findOne({ email }).select('+password');
  return user;
};

export const findUserById = async (id) => {
  const user = await UserModel.findById(id)
  return user;
}
