import fs from "node:fs/promises";

const {
  API_LOL_PATCH_VERSIONS_URL,
  LOL_ASSETS_BASE_URL,
  API_LOL_CHAMPIONS_URL,
} = process.env;

const getArg = (arg) => {
  const argIndex = process.argv.findIndex((a) => a === arg);
  return process.argv[argIndex > -1 ? argIndex + 1 : -1];
};

const [currentLolPatchVersion] = await fetch(API_LOL_PATCH_VERSIONS_URL).then(
  (r) => r.json()
);
const patchVersion =
  getArg("-p") || getArg("--patch-version") || currentLolPatchVersion;

console.info(
  `Using patch version ${patchVersion}, current lol version: ${currentLolPatchVersion}`
);

console.info("Checking champions data...");

let champions;

const downloadedData = await fs
  .readFile("./data/champions.json")
  .catch(() => null);

if (!downloadedData) {
  const championsDataUrl = API_LOL_CHAMPIONS_URL.replace(
    ":version",
    patchVersion
  );
  console.log("Downloading champions data...");
  const { data } = await fetch(championsDataUrl).then((res) => res.json());
  await fs.mkdir("./data").catch(() => null);
  await fs.writeFile("./data/champions.json", JSON.stringify(data));
  champions = data;
} else {
  console.log("Using cached data for version", patchVersion);
  champions = JSON.parse(downloadedData.toString("utf-8"));
}

console.log("Fetching champions images ...");

const championKeys = Object.keys(champions);

let count = 0;

for await (let championKey of championKeys) {
  const champion = champions[championKey];
  const imageUrl = LOL_ASSETS_BASE_URL.replace(":patch", patchVersion).replace(
    ":championKey",
    champion.key
  );
  const imageData = await fetch(imageUrl).then((res) => res.arrayBuffer());
  await fs.mkdir("./src/assets/champions").catch(() => null);
  await fs.writeFile(
    `./src/assets/champions/${champion.id}.png`,
    Buffer.from(imageData)
  );
  console.log(
    `[${++count}/${championKeys.length}]`,
    champion.name,
    imageUrl,
    "image downloaded"
  );
}
