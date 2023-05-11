import { createSignal } from "solid-js";
import data from "../data/champions";
import { ChampionType, TierType } from "./business/entities";

export const [getChampions, setChampions] = createSignal<{
  [key: string]: ChampionType;
}>(data);
export const [getTiers, setTiers] = createSignal<TierType[]>([]);
export const [getPools, setPools] = createSignal([]);
export const [getChampionsWithTiers, setChampionsWithTiers] = createSignal<{
  [key: string]: string;
}>({});
