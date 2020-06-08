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
    model: Model
    flag: String
    inatId: Int!
    observations: Int!
    # coord: Coordinate
  }

  type Model {
    path: String
  }

  extend type Query {
    countries(ids: [String]): [Country]
  }
`;

const resolver: IResolvers = {
  Country: {
    id: ({ _id }) => _id,
    model: ({ model, _id }) => {
      if (!model) return null;
      else return { path: `${assetsPath}/countries/${_id}.obj` };
    },
    observations: ({ inat: { total_obs } }) => total_obs,
    inatId: ({ inat: { place_id } }) => place_id,
  },
  Query: {
    countries: async (p: any, { ids }: Args, { db }: Context) => {
      const countries = db.get("countries");
      let result: Country[];
      if (ids) {
        console.log(await countries.find({ _id: { $in: ["IND"] } }));
        result = await countries.find({ _id: { $in: ids } });
      } else {
        result = await countries.find({});
      }
      return result;
    },
  },
};

export { schema, resolver };
