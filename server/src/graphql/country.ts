import { gql, IResolvers, ApolloError } from "apollo-server-express";
import { IMonkManager } from "monk";
import { assetsPath } from "../env.json";

interface Country {
  cid: string;
  name: string;
  model: string;
}

interface Args {
  ids: string[];
  names: string[];
}

interface Context {
  db: IMonkManager;
}

const schema = gql`
  type Country {
    id: ID!
    name: String!
    short: String
    model: Model
    flag: String
    inatId: Int!
    observations: Int!
    # coord: Coordinate
  }

  type Model {
    path: String
    level: Float
    fontHeight: Float
    fontSize: Float
  }

  extend type Query {
    countries(ids: [String]): [Country]
  }
`;

const resolver: IResolvers = {
  Model: {
    path: ({ id }) => `${assetsPath}/countries/${id}.obj`,
    level: ({ inat: { total_obs } }) => Math.ceil(Math.log10(total_obs + 1)),
    fontHeight: ({ appearance: { font_height } }) => font_height,
    fontSize: ({ appearance: { font_size } }) => font_size,
  },
  Country: {
    id: ({ id }) => id,
    inatId: ({ inat: { place_id } }) => place_id,
    observations: ({ inat: { total_obs } }) => total_obs,
    model: ({ model, id, inat, appearance }) => {
      if (!model) return null;
      else return { id, inat, appearance };
    },
  },
  Query: {
    countries: async (p: any, { ids }: Args, { db }: Context) => {
      const countries = db.get("countries");
      let result: Country[];
      if (ids) {
        result = await countries.find({ id: { $in: ids } });
      } else {
        result = await countries.find({});
      }
      return result;
    },
  },
};

export { schema, resolver };
