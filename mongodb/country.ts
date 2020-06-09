import monk, { IMonkManager } from "monk";
import axios from "axios";
import inquirer from "inquirer";
import { readFile } from "fs";
import { join } from "path";

export interface Country {
  _id: string;
  name: string;
  cid: string;
  model: boolean;
  coord: number[];
  flag: string;
  inat: Inat;
  test: number;
}

export interface Inat {
  place_id: number;
}

const dbCon =
  "mongodb://app:letmein@projbirdie.tech:27017/data?authSource=data";
const countriesAPI = "https://restcountries.eu/rest/v2";
const inatAPI = "https://api.inaturalist.org/v1";

const db = monk(dbCon);
const countries = db.get("countries");

async function observations({ _id, inat: { place_id } }: Country) {
  let total_obs;
  try {
    let {
      data: { total_results },
    } = await axios.get(
      `${inatAPI}/observations?place_id=${place_id}&iconic_taxa=Aves&per_page=0`
    );
    total_obs = total_results;
  } catch (error) {
    total_obs = 0;
  }
  console.log(
    `GOT ${_id} With ${total_obs} from ${inatAPI}/observations?place_id=${place_id}&iconic_taxa=Aves&per_page=0`
  );
  return { "inat.total_obs": total_obs };
}

async function updateCountriesWith(
  db: IMonkManager,
  fun: (country: Country) => Promise<{ [key: string]: any }>
) {
  const collection = db.get("countries");
  const countries = await collection.find({});
  const errors: any[] = [];

  for (let country of countries) {
    let result = await fun(country);
    let confirm: any;
    try {
      confirm = await collection.update({ _id: country._id }, { $set: result });
      if (!confirm.ok) throw "Did Not Updated in Database";
      if (!confirm.nModified) throw "Nothing Changed";
    } catch (error) {
      errors.push(`${country._id} has ${error}`);
    }
  }
  db.close();
  if (errors.length) console.log(errors);
  return null;
}

// const countries = monk(dbCon).get("countries");
// const prompt$ = new Subject<{ [key: string]: any }>();
// const updateCountries$ = new Subject<{
//   query: { [key: string]: any };
//   update: { [key: string]: any };
// }>();

// updateCountries$.subscribe(({ query, update }) =>
//   countries.update(query, update)
// );

// updateCountries$.next({ query: { cid: "AFG" }, update: { test: "hello" } });

// inquirer
//   .prompt(prompt$)
//   .ui.process.subscribe((ans) => setTimeout(() => console.log(ans), 4000));

// prompt$.next({ message: "Prompt 1? ", name: "test1" });
// prompt$.next({ message: "Prompt 2? ", name: "test2" });

// I wrote this do not want to do it again
async function setInatPlaceID(db: IMonkManager) {
  const collection = db.get("countries");
}

async function updateCountriesWithLatLngFlag(db: IMonkManager) {
  const collection = db.get("countries");
  const resp = await axios.get(`${countriesAPI}/all`, {
    params: "alpha3Code;latlng;flag",
  });

  for (let { alpha3Code, latlng: coord, flag } of resp.data) {
    collection.update({ cid: alpha3Code }, { $set: { coord, flag } });
  }
}

async function fillCountryDataFromInat(db: IMonkManager) {
  const collection = db.get("countries");

  const resp = await axios.get(`${countriesAPI}/all`, {
    params: {
      fields: "name;alpha3Code;latlng",
    },
  });

  for (let { name, alpha3Code, latlng } of resp.data) {
    const { valid } = await inquirer.prompt({
      type: "confirm",
      message: `Valid Name: ${name} Code: ${alpha3Code}? [n to rename]`,
      name: "valid",
    });

    if (!valid) {
      ({ name } = await inquirer.prompt({
        type: "input",
        message: `Rename ${name} to : `,
        name: "country",
      }));
    }

    const { model } = await inquirer.prompt({
      type: "confirm",
      message: `${name} Have a Model?`,
      name: "model",
    });

    collection.insert({ name, cid: alpha3Code, model });
    //   .then((v) => console.log(`${v.name} added`));
  }

  return null;
}

async function insertCountryData(db: IMonkManager) {
  const data = await new Promise((res, rej) => {
    readFile(
      join(__dirname, "../output/countries.json"),
      { encoding: "utf8" },
      (err, data) => {
        if (err) rej(err);
        else res(data);
      }
    );
  });
  
}
