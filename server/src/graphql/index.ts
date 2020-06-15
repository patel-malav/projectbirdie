import { gql, IResolvers } from "apollo-server-express";
import { DocumentNode, GraphQLScalarType, Kind } from "graphql";

import { schema as aveSchema, resolver as aveResolver } from "./ave";
import {
  schema as countrySchema,
  resolver as countryResolver,
} from "./country";
import {
  schema as observationSchema,
  resolver as observationResolver,
} from "./observation";
import { schema as userSchema, resolver as userResolver } from "./user";

const queryType = gql`
  scalar Date
  type Query {
    hello: String!
  }
`;

export const typeDefs: DocumentNode[] = [
  aveSchema,
  countrySchema,
  observationSchema,
  userSchema,
  queryType,
];

export const resolvers: IResolvers[] = [
  aveResolver,
  countryResolver,
  observationResolver,
  userResolver,
  {
    Date: new GraphQLScalarType({
      name: "Date",
      description: "Date custom scalar type",
      parseValue(value) {
        return new Date(value); // value from the client
      },
      serialize(value) {
        return value.toISOString(); // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
      },
    }),
    Query: {
      hello: () =>
        new Promise((res) => setTimeout(res, 10000, "Delayed Message")),
    },
  },
];
