import mongoose from "mongoose";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import User from "./models/User.js";
import { UserInputError } from "apollo-server";
import logger from "./logger.js";

export const resolvers = {
  Query: {
    appName: () => "graphql project clone",

    allProducts: async () => {
      return Product.find({});
    },

    allCategories: async () => {
      return Category.find();
    },

    productsByAuthor: async (_, { authorName }) => {
      const user = await User.findOne({ userName: authorName });
      if (!user) {
        // User does not exist, throwing an error
        throw new UserInputError("User does not exist");
      }
      return Product.find({ authorId: user._id });
    },

    productsByCategory: async (_, { slug }) => {
      const category = await Category.findOne({ slug });
      return Product.find({ categoriesIds: category._id });
    },
  },

  Product: {
    publishedAt: (product) => {
      return product.publishedAt.toISOString();
    },

    author: async (product) => {
      return User.findById(product.authorId);
    },

    categories: async (product) => {
      const allIds = product.categoriesIds;
      return Category.find().where("_id").in(allIds);
    },
  },

  Mutation: {
    createProduct: async (_, { input }) => {
      const author = await User.findOne({ userName: "ellen" }); // later implement authentication
      return Product.create({
        name: input.name,
        description: input.description,
        url: input.url,
        numberOfVotes: 0,
        publishedAt: Date.now(),
        authorId: author._id,
        categoriesIds: input.categoriesIds,
      });
    },
    createCategory: async (_, { input }) => {
      return Category.create({
        name: input.name,
        slug: input.slug,
      });
    },
    upvoteProduct: async (_, { productId }) => {
      return Product.findOneAndUpdate(
        { _id: productId },
        // to specific value {$set: {'numberOfVotes': newVoteCount}},
        { $inc: { numberOfVotes: 1 } },
        { new: true }
      );
    },
  },
};
