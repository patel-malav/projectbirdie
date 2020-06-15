import { gql, IResolvers } from "apollo-server-express";
import axios from "axios";
import { IMonkManager, id as monkId, ICollection } from "monk";

const inatAPI = "https://api.inaturalist.org/v1/taxa";

interface Args {
  id: string;
  pid: string;
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
    images: [String]
    extinct: Boolean
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
    ave: async function (_p: any, { id, pid }: Args, { db }: Context) {
      const aves = db.get("aves");
      try {
        let out = await fetchAndUpdateAve(aves, parseInt(id), pid);
        return out;
        // let out = await aves.findOne({ "inat.taxa_id": parseInt(id) });
        // if (!out?._id) {
        //   return fetchAndUpdateAve(aves, parseInt(id));
        // } else {
        //   return out;
        // }
      } catch (err) {
        console.log(err);
      }
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

export async function fetchAndUpdateAve(
  collection: ICollection<any>,
  id: number,
  pid?: any
) {
  const { data } = await axios.get(`${inatAPI}/${id}`);
  let {
    id: taxa_id,
    preferred_common_name: name,
    name: sci,
    rank,
    complete_species_count: species_count,
    extinct,
    default_photo,
    taxon_photos,
    observations_count: obs_count,
    wikipedia_url: wiki,
    wikipedia_summary: descp,
    children,
  } = data.results[0];
  const default_image = default_photo?.square_url
    .split("?")[0]
    .replace(/thumb|square|medium|small|medium|large/, "original");
  const images = taxon_photos?.map(({ photo: { url } }: any) =>
    url
      .split("?")[0]
      .replace(/thumb|square|medium|small|medium|large/, "original")
  );
  children = children.map(({ id }: any) => id);
  let output = {
    name,
    sci,
    rank,
    inat: { taxa_id, obs_count, children },
    pid: pid ? monkId(pid) : null,
    species_count,
    extinct,
    images,
    default_image,
    wiki,
    descp,
  };
  return collection.findOneAndUpdate(
    { "inat.taxa_id": id },
    { $set: output },
    {
      upsert: true,
      returnNewDocument: true,
    }
  );
}
