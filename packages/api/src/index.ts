/* tslint:disable */
import { ApolloServer, gql } from "apollo-server-express";
import * as express from "express";
import { deflate } from "graphql-deduplicator";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { merge } from "lodash";
import * as cors from "cors";

import { typeDefs as Job, resolvers as JobResolvers } from "./jobs";
import authRoutes from "./routes/auth";
// Construct a schema, using GraphQL schema language
const typeDefs = [
  gql`
    scalar JSON
    scalar JSONObject
    scalar DateTime
    scalar EmailAddress
    scalar NegativeFloat
    scalar NegativeInt
    scalar NonNegativeFloat
    scalar NonNegativeInt
    scalar NonPositiveFloat
    scalar NonPositiveInt
    scalar PhoneNumber
    scalar PositiveFloat
    scalar PositiveInt
    scalar PostalCode
    scalar RegularExpression
    scalar UnsignedFloat
    scalar UnsignedInt
    scalar URL

    input UploadWrapper {
      uid: ID!
      lastModified: DateTime
      name: String
      type: String
      originFileObj: Upload!
    }

    type Query {
      _empty: String
    }

    type Mutation {
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

const context = (req = {}) => ({
  req
});

const formatResponse = (response, { req }) => {
  return req &&
    req.query &&
    req.query.deduplicate &&
    response.data &&
    !response.data.__schema
    ? deflate(response)
    : response;
};

// Provide resolver functions for your schema fields
const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  },
  context,
  formatResponse
});

const app = express();
app.use("/auth", authRoutes);
app.use(cors());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
