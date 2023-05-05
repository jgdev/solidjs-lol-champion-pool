import { Champion, ChampionPool } from "./business/models";

export const buildChampion = (championId: string, name: string): Champion => {
  return {
    championId,
    name,
    pictureUrl: `https://cdn.communitydragon.org/13.7.1/champion/${championId}/square`,
  };
};

export const championList: Champion[] = [
  buildChampion("mordekaiser", "Mordekaiser"),
  buildChampion("garen", "Garen"),
  buildChampion("shen", "Shen"),
  buildChampion("nasus", "Nasus"),
  buildChampion("darius", "Darius"),
  buildChampion("sett", "Sett"),
  buildChampion("malphite", "Malphite"),
  buildChampion("drmundo", "Dr. Mundo"),
  buildChampion("illaoi", "Illaoi"),
];

export const userChampionPools = [
  {
    id: "top-lane-pool-1",
    name: "Top Lane 13.7.1",
    tiers: [
      {
        championPoolId: "top-lane-pool-1",
        id: "mains",
        name: "Mains",
        champions: [],
      },
      {
        championPoolId: "top-lane-pool-1",
        id: "good-to-play",
        name: "Good to play",
        champions: [],
      },
      {
        championPoolId: "top-lane-pool-1",
        id: "want-to-play",
        name: "Want to play",
        champions: [],
      },
    ],
  },
] as ChampionPool[];
