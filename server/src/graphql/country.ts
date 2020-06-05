import { gql, IResolvers } from "apollo-server-express";
import { IMonkManager } from "monk";
import { modelPath } from "../env.json";

interface Args {
  ids: string[];
}

interface Context {
  db: IMonkManager;
}

const schema = gql`
  type Country {
    cid: ID!
    name: String!
    model: String
  }
  extend type Query {
    country(ids: [String]): [Country]
  }
`;

const resolver: IResolvers = {
  Country: {
    model: (p: any) => modelPath + p.name + ".obj",
  },
  Query: {
    country: async (p: any, { ids }: Args, { db }: Context) => {
      const aves = db.get("countries");
      let result = null;
      try {
        if (ids) {
          result = await aves.find({ cid: { $in: ids } });
        } else {
          result = await aves.find({});
        }
      } catch (error) {
        console.error(error);
      }
      return result;
    },
  },
};

export { schema, resolver };
