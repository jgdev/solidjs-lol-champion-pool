import { Champion } from "./business/models";

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
