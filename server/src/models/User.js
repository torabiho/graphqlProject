import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: String,
  fullName: String,
});

export default model("User", UserSchema);
