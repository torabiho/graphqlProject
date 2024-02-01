import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  description: String,
  url: String,
  numberOfVotes: Number,
  publishedAt: Date,
  authorId: Schema.Types.ObjectId,
  categoriesIds: [Schema.Types.ObjectId],
});

export default model("Product", ProductSchema);
