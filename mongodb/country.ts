import monk, { IMonkManager } from "monk";
import axios from "axios";
import inquirer from "inquirer";

const db = monk(
  "mongodb://app:letmein@projbirdie.tech:27017/data?authSource=data"
);

// updateCountries(db).then(() => {
//   console.log("Exiting In 10s...");
//   setTimeout(() => db.close(), 10000);
// });

async function updateCountries(db: IMonkManager) {
  const collection = db.get("countries");

  const resp = await axios.get("https://restcountries.eu/rest/v2/all", {
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
