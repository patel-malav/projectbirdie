import { gql, IResolvers } from "apollo-server-express";
import { IMonkManager } from "monk";
import { assetsPath } from "../env.json";

interface Args {
  codes: string[];
  names: string[];
}

interface Context {
  db: IMonkManager;
}

const schema = gql`
  type Country {
    id: ID!
    code: ID!
    name: String!
    short: String
    model: Model
    flag: String
    inatId: Int!
    # observations(limit: Int = 45): [Observation]
    # aves(limit: Int = 10): [Ave]
  }

  type Model {
    path: String
    level: Float
    fontHeight: Float
    fontSize: Float
  }

  extend type Query {
    countries(codes: [String]): [Country]
  }
`;

const resolver: IResolvers = {
  Country: {
    id: ({ _id }) => _id,
    model: ({ model, code, inat, appearance }) => {
      if (model) return { code, inat, appearance };
      return null;
    },
    inatId: ({ inat: { place_id } }) => place_id,
    // observations: ({}, { limit }) => {
    //   return [];
    // },
    // aves: ({}, { limit }) => {
    //   return [];
    // },
  },
  Model: {
    path: ({ code }) => `${assetsPath}/countries/${code}.obj`,
    level: ({ inat: { total_obs } }) => Math.ceil(Math.log10(total_obs + 1)),
    fontHeight: ({ appearance: { font_height } }) => font_height,
    fontSize: ({ appearance: { font_size } }) => font_size,
  },
  Query: {
    countries: async (p: any, { codes }: Args, { db }: Context) => {
      const countries = db.get("countries");
      let result: any[];
      if (codes) {
        result = await countries.find({ code: { $in: codes } });
      } else {
        result = await countries.find({});
      }
      return result;
    },
  },
};

export { schema, resolver };
