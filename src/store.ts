import { createSignal } from "solid-js";
import data from "../data/champions";
import { ChampionType } from "./business/entities";

export const [getChampions, setChampions] = createSignal<{
  [key: string]: ChampionType;
}>(data);
const [getTiers, setTiers] = createSignal([]);
const [getPools, setPools] = createSignal([]);
const [getChampionsWithTiers, setChampionsWithTiers] = createSignal<{
  [key: string]: string;
}>({});
