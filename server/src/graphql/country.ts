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
    cid: ID!
    name: String!
    model: Model
    flag: String
    coord: Coordinate
  }
  extend type Query {
    countries(ids: [String]): [Country]
  }
`;

const resolver: IResolvers = {
  Country: {
    model: ({ model, cid }) => {
      if (!model) return null;
      else return { path: `${assetsPath}/countries/${cid}.obj` };
    },
  },
  Query: {
    countries: async (p: any, { ids }: Args, { db }: Context) => {
      const aves = db.get("countries");
      let result: Country[];
      if (ids) {
        result = await aves.find({ cid: { $in: ids } });
      } else {
        result = await aves.find({});
      }
      return result;
    },
  },
};

export { schema, resolver };
