import { gql, IResolvers } from "apollo-server-express";
import axios from "axios";
import { IMonkManager, ICollection } from "monk";

const iNatAPI = "https://api.inaturalist.org/v1/users";

interface Args {
  id: number;
}
interface Context {
  db: IMonkManager;
}

const schema = gql`
  extend type Query {
    user(id: Int!): User
  }
  type User {
    id: ID
    name: String
    image: String
    descp: String
    inatId: Int
    # observations: [Observation]
    # lists: [List]
  }
  type List {
    id: ID!
    name: String!
    items: [Ave]!
  }
`;
const resolver: IResolvers = {
  Query: {
    user: async (_p: any, { id }: Args, { db }: Context) => {
      const users = db.get("users");
      let out: any = null;
      try {
        out = await users.findOne({ "inat.user_id": id });
        if (!out?._id) {
          out = await fetchAndUpdateUser(id, users);
        }
      } catch (err) {
        console.log(err);
      }
      return out;
    },
  },
  User: {
    id: ({ _id }) => _id,
    descp: ({ inat: { login } }) => `User ${login} from Inaturalist`,
    inatId: ({ inat: { user_id } }) => user_id,
  },
};

export { schema, resolver };

async function fetchAndUpdateUser(id: number, collection: ICollection<any>) {
  const { data } = await axios.get(`${iNatAPI}/${id}`);
  let [{ id: user_id, login, name, created_at, icon_url }] = data.results;
  let output = {
    name,
    image: icon_url
      .split("?")[0]
      .replace(/thumb|square|medium|small|medium|large/, "original"),
    joinedAt: new Date(created_at),
    inat: { user_id, login },
  };
  return collection.insert(output);
}
