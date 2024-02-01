import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  slug: String,
  name: String,
});

export default model("Category", CategorySchema);
