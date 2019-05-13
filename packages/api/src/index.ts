/* tslint:disable */
import { ApolloServer, gql } from "apollo-server-express";
import * as express from "express";
import { deflate } from "graphql-deduplicator";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { merge } from "lodash";
// import { GraphQLModule } from "@graphql-modules/core";
// import { makeExecutableSchema } from "graphql-tools";
import { typeDefs as Job, resolvers as JobResolvers } from "./jobs/jobs";

import authRoutes from "./routes/auth";

// Construct a schema, using GraphQL schema language
const typeDefs = [
  gql`
    scalar JSON
    scalar JSONObject
    type Query {
      _empty: String
    }
  `,
  Job
];
const resolvers = merge(
  {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject
  },
  JobResolvers
);

const context = req => ({
  req
});

const formatResponse = (response, { req: { query } }) => {
  return query.deduplicate && response.data && !response.data.__schema
    ? deflate(response)
    : response;
};

// Provide resolver functions for your schema fields
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  formatResponse
});

const app = express();
app.use("/auth", authRoutes);
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
