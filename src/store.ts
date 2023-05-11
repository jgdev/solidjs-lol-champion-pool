import { createSignal } from "solid-js";
import data from "../data/champions";
import { ChampionType, TierType } from "./business/entities";

export const [getChampions, setChampions] = createSignal<{
  [key: string]: ChampionType;
}>(data);
export const [getTiers, setTiers] = createSignal<TierType[]>([
  {
    id: self.crypto.randomUUID(),
    name: "test",
  },
]);
export const [getPools, setPools] = createSignal([]);
export const [getSelectedTier, setSelectedTier] = createSignal<
  string | null | undefined
>();
export const [getChampionSearch, setChampionSearch] = createSignal<
  string | null | undefined
>();
export const [getChampionTiers, setChampionTiers] = createSignal<{
  [key: string]: ChampionType[];
}>({});
