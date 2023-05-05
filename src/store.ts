import { createSignal } from "solid-js";
import { Champion, ChampionPool, Tier } from "./business/models";
import { championList } from "./fake-data";

export const [getChampions, setChampions] = createSignal<Champion[]>(
  championList,
  { equals: false }
);
export const [getChampionPools, setChampionPools] = createSignal<
  ChampionPool[]
>([{ id: "top-lane-13.7.1", name: "Top Lane" }]);
export const [getTiers, setTiers] = createSignal<Tier[]>([
  {
    championPoolId: "top-lane-13.7.1",
    id: "mains",
    name: "Mains",
  },
]);
