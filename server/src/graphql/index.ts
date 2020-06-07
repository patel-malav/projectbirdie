import { gql, IResolvers } from "apollo-server-express";
import { DocumentNode } from "graphql";
import {
  schema as countrySchema,
  resolver as countryResolver,
} from "./country";
import { schema as modelSchema } from "./model";
import { schema as coordinateSchema } from "./coordinate";

const queryType = gql`
  type Query {
    hello: String!
  }
`;

export const typeDefs: DocumentNode[] = [
  countrySchema,
  modelSchema,
  coordinateSchema,
  queryType,
];

export const resolvers: IResolvers[] = [
  countryResolver,
  {
    Query: {
      hello: () =>
        Promise.resolve<string>("GraphQL Server For 🐦 Project Birdie 🐦"),
    },
  },
];
