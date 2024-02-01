import "./mongo.js";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { readSchema } from "./schema.js";
import { resolvers } from "./resolvers.js";
import logger from "./logger.js";
import Product from "./models/Product.js";

const typeDefs = readSchema();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  debug: true,
});

server.listen().then(() => {
  logger.info("Listening on port 4000");
});

async function test() {
  const res = await Product.find();
  logger.info(`Result: ${JSON.stringify(res)}`);
}

test();
