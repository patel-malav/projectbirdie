import { gql, IResolvers } from "apollo-server-express";
import axios from "axios";
import monk, { IMonkManager, ICollection, id as monkId } from "monk";
import { fetchAndUpdateAve } from "./ave";

const iNatAPI = "https://api.inaturalist.org/v1/observations";

interface Args {
  ids: number[];
}
interface Context {
  db: IMonkManager;
}

const schema = gql`
  extend type Query {
    observations(ids: [Int]!): [Observation]
  }
  type Observation {
    id: ID!
    date: Date
    quality: String
    coord: [Float]
    images: [String]
    createdAt: Date
    ave: Ave
    country: Country
  }
`;
const resolver: IResolvers = {
  Query: {
    observations: async (_p: any, { ids }: Args, { db }: Context) => {
      const observations = db.get("observations");
      let out: any[] | null = null;
      try {
        out = await observations.find({ "inat.obs_id": { $in: ids } });
        if (out.length !== ids.length) {
          const missing = ids.filter(
            (id) => !out?.some(({ inat: { obs_id } }) => obs_id === id)
          );
          console.log("missing", missing);
          if (missing.length) {
            const resp = await fetchAndUpdateObservations(
              missing,
              observations
            );
            return out.concat(resp);
          }
        } else {
          return out;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  Observation: {
    id: ({ _id }) => _id,
    ave: ({ inat: { taxa_id } }, _args: Args, { db }: Context) => {
      const aves = db.get("aves");
      console.log(`Getting : ${taxa_id}`);
      return fetchAndUpdateAve(aves, taxa_id);
    },
    country: async (
      { _id, inat: { place_ids } },
      _args: Args,
      { db }: Context
    ) => {
      const countries = db.get("countries");
      const result = await countries.findOne({
        "inat.place_id": { $in: place_ids },
      });
      if (result?._id) {
        const countries = db.get("countries");
        return countries.findOneAndUpdate(
          { _id: result._id },
          { $addToSet: { observations: monkId(_id) } },
          { returnNewDocument: true }
        );
      } else {
        return null;
      }
    },
  },
};

export { schema, resolver };

async function fetchAndUpdateObservations(
  ids: number[],
  collection: ICollection<any>
) {
  const { data } = await axios.get(`${iNatAPI}/${ids.join(",")}`);
  let output = [];
  for (const result of data.results) {
    let {
      id: obs_id,
      time_observed_at,
      created_at,
      place_ids,
      location,
      quality_grade: quality,
      taxon: { id: taxa_id },
      user: { id: user_id },
      observation_photos,
    } = result;
    const coord = location.split(",");
    const images = observation_photos?.map(({ photo: { url } }: any) =>
      url
        .split("?")[0]
        .replace(/thumb|square|medium|small|medium|large/, "original")
    );
    output.push({
      date: new Date(time_observed_at),
      quality,
      coord,
      images,
      createdAt: new Date(created_at),
      inat: { obs_id, taxa_id, user_id, place_ids },
    });
  }
  return collection.insert(output);
}
