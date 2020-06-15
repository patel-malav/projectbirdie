import monk, { IMonkManager, IObjectID, id as monkID } from "monk";
import inquirer from "inquirer";
import axios from "axios";
import chalk from "chalk";

const dbCon =
  "mongodb://app:letmein@projbirdie.tech:27017/data?authSource=data";
const db = monk(dbCon);
const aves = db.get("aves");
const inatAPI = "https://api.inaturalist.org/v1";

inquirer
  .prompt({
    type: "number",
    name: "id",
    message: "INat TaxaId : ",
  })
  .then(async ({ id }) => {
    let next = [{ query: id, _id: null }];
    do {
      let run = next.shift();
      try {
        //@ts-ignore
        next = next.concat(await fetchTaxa(run.query, run._id));
      } catch (err) {
        console.log("End Possibly");
      }
    } while (next.length !== 0);
  });

async function fetchTaxa(id: number | string, pid?: any) {
  const { data } = await axios.get<Response>(`${inatAPI}/taxa/${id}`);
  let nextQuery = [];
  for (let result of data.results) {
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
      children,
    } = result;
    let default_image = default_photo?.square_url.split("?")[0];
    let output = {
      name,
      sci,
      rank,
      inat: { taxa_id },
      pid: pid ? monkID(pid) : null,
      species_count,
      extinct,
      default_image,
      wiki,
      descp,
    };
    let _id = await aves
      .insert(output)
      .then(({ _id, name, rank, sci, inat: { taxa_id } }) => {
        console.log(
          chalk`{red ${taxa_id}}: \t {green ${rank}} \t {yellow ${sci}} \t\t Name: {blue ${name}}`
        );
        return _id;
      });
    if (children?.length) {
      let childIds = children.map(({ id }) => id);
      while (childIds.length !== 0) {
        nextQuery.push({ _id, query: childIds.splice(0, 30).join(",") });
      }
    }
  }
  return nextQuery;
}

// ======================== Types =========================== \\
export interface Response {
  total_results: number;
  page: number;
  per_page: number;
  results: Result[];
}

export interface Ancestor {
  observations_count: number;
  taxon_schemes_count: number;
  ancestry: string;
  is_active: boolean;
  wikipedia_url: string;
  current_synonymous_taxon_ids: null;
  iconic_taxon_id: number;
  rank_level: number;
  taxon_changes_count: number;
  atlas_id: null;
  complete_species_count: number | null;
  parent_id: number;
  complete_rank: string;
  name: string;
  rank: string;
  extinct: boolean;
  id: number;
  default_photo: DefaultPhoto;
  ancestor_ids: number[];
  iconic_taxon_name: string;
  preferred_common_name: string;
}

export interface Child {
  observations_count: number;
  taxon_schemes_count: number;
  is_active: boolean;
  wikipedia_url: string;
  current_synonymous_taxon_ids: null;
  iconic_taxon_id: number;
  rank_level: number;
  taxon_changes_count: number;
  atlas_id: null;
  complete_species_count: number;
  parent_id: number;
  complete_rank: string;
  name: string;
  rank: string;
  extinct: boolean;
  id: number;
  default_photo: DefaultPhoto;
  ancestor_ids: number[];
  iconic_taxon_name: string;
  preferred_common_name: string;
  conservation_status?: ConservationStatus;
}

export interface Result {
  photos_locked: boolean;
  taxon_schemes_count: number;
  ancestry: string;
  wikipedia_url: string;
  current_synonymous_taxon_ids: null;
  iconic_taxon_id: number;
  taxon_changes_count: number;
  complete_species_count: number;
  rank: string;
  extinct: boolean;
  id: number;
  ancestor_ids: number[];
  observations_count: number;
  is_active: boolean;
  taxon_photos?: TaxonPhoto[];
  rank_level: number;
  atlas_id: null;
  parent_id: number;
  complete_rank: string;
  name: string;
  default_photo: DefaultPhoto;
  iconic_taxon_name: string;
  preferred_common_name: string;
  ancestors?: Ancestor[];
  children?: Child[];
  conservation_statuses?: any[];
  listed_taxa_count?: number;
  listed_taxa?: ListedTaxa[];
  wikipedia_summary?: string;
  created_at?: string;
  universal_search_rank?: number;
  min_species_taxon_id?: number;
}

export interface TaxonPhoto {
  taxon_id: number;
  photo: Photo;
  taxon: Result;
}

export interface DefaultPhoto {
  square_url: string;
  attribution: string;
  flags: any[];
  medium_url: string;
  id: number;
  license_code: LicenseCode | null;
  original_dimensions: OriginalDimensions | null;
  url: string;
}

export interface Photo {
  flags: any[];
  type: string;
  url: string;
  square_url: string;
  native_page_url: string;
  native_photo_id: string;
  small_url: string;
  original_url: string;
  attribution: string;
  medium_url: string;
  id: number;
  license_code: LicenseCode | null;
  original_dimensions: OriginalDimensions;
  large_url: string;
}

export enum LicenseCode {
  CcBy = "cc-by",
  CcByNc = "cc-by-nc",
  CcByNcNd = "cc-by-nc-nd",
  CcByNcSa = "cc-by-nc-sa",
  CcBySa = "cc-by-sa",
}

export interface OriginalDimensions {
  width: number;
  height: number;
}

export interface ConservationStatus {
  user_id: null;
  status_name: string;
  iucn: number;
  authority: null;
  geoprivacy: string;
  source_id: null;
  place_id: null;
  status: string;
}

export interface ListedTaxa {
  id: number;
  taxon_id: number;
  establishment_means: string;
  place: Place;
  list: List;
}

export interface Place {
  id: number;
  name: string;
  display_name: string;
  admin_level: number | null;
  ancestor_place_ids: number[];
}

export interface List {
  id: number;
  title: string;
}
