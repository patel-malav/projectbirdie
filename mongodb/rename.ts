import monk from "monk";
import fs, { fchmod } from "fs";
import path from "path";

const dbCon =
  "mongodb://app:letmein@projbirdie.tech:27017/data?authSource=data";
const countriesAPI = "https://restcountries.eu/rest/v2";
const inatAPI = "https://api.inaturalist.org/v1";

const db = monk(dbCon);

const countries = db.get("countries");

countries.find({}, "-_id name id model").then(async (countries) => {
  for (let country of countries) {
    if (country.model) {
      fs.promises.rename(
        path.join(__dirname, "../../../Copy", `${country.name}.obj`),
        path.join(__dirname, "../../../Copy", `${country.id}.obj`)
      );
    }
  }
});
