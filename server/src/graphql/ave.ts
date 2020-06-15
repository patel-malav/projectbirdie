import { gql, IResolvers } from "apollo-server-express";
import axios from "axios";
import { IMonkManager, id as monkId, ICollection } from "monk";

const inatAPI = "https://api.inaturalist.org/v1";

interface Args {
  id: number;
}
interface Context {
  db: IMonkManager;
}

const schema = gql`
  extend type Query {
    ave(id: ID!): Ave
  }
  type Ave {
    id: ID!
    sci: String!
    name: String
    rank: String
    defaultImage: String
    # images: [String]
    inatId: Int!
    wiki: String
    descp: String
    speciesCount: Int
    parent: Ave
    # observations: [Observation]
    # articles: Articles
  }
`;
const resolver: IResolvers = {
  Query: {
    ave: async (_p: any, { id }: Args, { db }: Context) => {
      const aves = db.get("aves");
      let out: any = null;
      try {
        out = await aves.findOne({ "inat.taxa_id": id });
        if (!out?._id) {
          out = await fetchAndUpdateAve(aves, id);
        }
      } catch (err) {
        console.log(err);
      }
      return out;
    },
  },
  Ave: {
    id: ({ _id }) => _id,
    sci: ({ rank, sci }) =>
      rank.charAt(0).toUpperCase() + rank.slice(1) + " " + sci,
    defaultImage: ({ default_image }) => default_image,
    inatId: ({ inat: { taxa_id } }) => taxa_id,
    speciesCount: ({ species_count }) => species_count,
    parent: async ({ pid }, _args: Args, { db }: Context) => {
      if (!pid) return null;
      const aves = db.get("aves");
      let result: any;
      result = await aves.findOne({ _id: monkId(pid) });
      return result;
    },
  },
};

export { schema, resolver };

async function fetchAndUpdateAve(
  collection: ICollection<any>,
  id: number,
  pid?: any
) {
  const { data } = await axios.get(`${inatAPI}/taxa/${id}`);
  let {
    id: taxa_id,
    preferred_common_name: name,
    name: sci,
    rank,
    complete_species_count: species_count,
    extinct,
    default_photo,
    wikipedia_url: wiki,
    wikipedia_summary: descp,
    // children,
  } = data.results[0];
  let default_image = default_photo?.square_url.split("?")[0];
  let output = {
    name,
    sci,
    rank,
    inat: { taxa_id },
    pid: pid ? monkId(pid) : null,
    species_count,
    extinct,
    default_image,
    wiki,
    descp,
  };
  return collection.insert(output);
}
