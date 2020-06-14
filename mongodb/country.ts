import monk, { IMonkManager } from "monk";
import inquirer from "inquirer";

export interface Country {
  id: string;
  name: string;
  short: string;
  model: boolean;
  coord: number[];
  flag: string;
  inat: Inat;
  appearance: {
    font_size: number;
    font_height: number;
  };
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

// updateCountriesWith(db, shortName).finally(() => db.close());
// updateCountriesWith(db, appearance).finally(() => db.close());

updateAppearance(db);

async function updateAppearance(db: IMonkManager) {
  const collection = db.get("countries");
  const countries = await collection.find({});

  for (let country of countries) {
    let confirm = false;
    do {
      if (country.model) {
        console.log(`Country = ${country.id}-${country.name}`);
        let { size, height } = await inquirer.prompt([
          {
            type: "number",
            message: "Size : ",
            name: "size",
            default: country.appearance.font_size,
          },
          {
            type: "number",
            message: "Height : ",
            name: "height",
            default: country.appearance.font_height,
          },
        ]);
        collection.update(
          { id: country.id },
          { $set: { appearance: { font_size: size, font_height: height } } }
        );
        ({ confirm } = await inquirer.prompt({
          message: `Done with ${country.id}-${country.name} : `,
          type: "confirm",
          name: "confirm",
        }));
      } else {
        collection.update(
          { id: country.id },
          { $set: { appearance: { font_size: 0, font_height: 0 } } }
        );
        confirm = true;
      }
    } while (!confirm);
  }
}

// async function appearance({
//   id,
//   short,
//   model,
// }: // appearance: { font_height, font_size },
// Country) {
//   let height = 0,
//     size = 0;
//   if (model) {
//     ({ height, size } = await inquirer.prompt([
//       {
//         type: "number",
//         message: `Font Size for ${id} : ${short}`,
//         name: "size",
//         default: 0,
//         // default: font_size ? font_size : 0,
//       },
//       {
//         type: "number",
//         message: `Font Height for ${id} : ${short}`,
//         name: "height",
//         default: 0,
//         // default: font_height ? font_height : 0,
//       },
//     ]));
//   }
//   return { appearance: { font_size: size, font_height: height } };
// }

// async function shortName({ id, name }: Country) {
//   const { short } = await inquirer.prompt({
//     message: `Short Name for ${id} : ${name} = `,
//     name: "short",
//     default: name,
//   });
//   return { short };
// }

// async function observations({ id, inat: { place_id } }: Country) {
//   let total_obs;
//   try {
//     let {
//       data: { total_results },
//     } = await axios.get(
//       `${inatAPI}/observations?place_id=${place_id}&iconic_taxa=Aves&per_page=0`
//     );
//     total_obs = total_results;
//   } catch (error) {
//     total_obs = 0;
//   }
//   console.log(
//     `GOT ${id} With ${total_obs} from ${inatAPI}/observations?place_id=${place_id}&iconic_taxa=Aves&per_page=0`
//   );
//   return { "inat.total_obs": total_obs };
// }

// async function updateCountriesWith(
//   db: IMonkManager,
//   fun: (country: Country) => Promise<{ [key: string]: any }>
// ) {
//   const collection = db.get("countries");
//   const countries = await collection.find({});
//   const errors: any[] = [];

//   for (let country of countries) {
//     let result = await fun(country);
//     let confirm: any;
//     try {
//       confirm = await collection.update({ id: country.id }, { $set: result });
//       if (!confirm.ok) throw "Did Not Updated in Database";
//       if (!confirm.nModified) throw "Nothing Changed";
//     } catch (error) {
//       errors.push(`${country.id} has ${error}`);
//     }
//   }
//   db.close();
//   if (errors.length) console.log(errors);
//   return null;
// }

// // const countries = monk(dbCon).get("countries");
// // const prompt$ = new Subject<{ [key: string]: any }>();
// // const updateCountries$ = new Subject<{
// //   query: { [key: string]: any };
// //   update: { [key: string]: any };
// // }>();

// // updateCountries$.subscribe(({ query, update }) =>
// //   countries.update(query, update)
// // );

// // updateCountries$.next({ query: { cid: "AFG" }, update: { test: "hello" } });

// // inquirer
// //   .prompt(prompt$)
// //   .ui.process.subscribe((ans) => setTimeout(() => console.log(ans), 4000));

// // prompt$.next({ message: "Prompt 1? ", name: "test1" });
// // prompt$.next({ message: "Prompt 2? ", name: "test2" });

// // I wrote this do not want to do it again
// async function setInatPlaceID(db: IMonkManager) {
//   const collection = db.get("countries");
// }

// async function updateCountriesWithLatLngFlag(db: IMonkManager) {
//   const collection = db.get("countries");
//   const resp = await axios.get(`${countriesAPI}/all`, {
//     params: "alpha3Code;latlng;flag",
//   });

//   for (let { alpha3Code, latlng: coord, flag } of resp.data) {
//     collection.update({ cid: alpha3Code }, { $set: { coord, flag } });
//   }
// }

// async function fillCountryDataFromInat(db: IMonkManager) {
//   const collection = db.get("countries");

//   const resp = await axios.get(`${countriesAPI}/all`, {
//     params: {
//       fields: "name;alpha3Code;latlng",
//     },
//   });

//   for (let { name, alpha3Code, latlng } of resp.data) {
//     const { valid } = await inquirer.prompt({
//       type: "confirm",
//       message: `Valid Name: ${name} Code: ${alpha3Code}? [n to rename]`,
//       name: "valid",
//     });

//     if (!valid) {
//       ({ name } = await inquirer.prompt({
//         type: "input",
//         message: `Rename ${name} to : `,
//         name: "country",
//       }));
//     }

//     const { model } = await inquirer.prompt({
//       type: "confirm",
//       message: `${name} Have a Model?`,
//       name: "model",
//     });

//     collection.insert({ name, cid: alpha3Code, model });
//     //   .then((v) => console.log(`${v.name} added`));
//   }

//   return null;
// }

// async function insertCountryData(db: IMonkManager) {
//   const data = await new Promise((res, rej) => {
//     readFile(
//       join(__dirname, "../output/countries.json"),
//       { encoding: "utf8" },
//       (err, data) => {
//         if (err) rej(err);
//         else res(data);
//       }
//     );
//   });
// }
