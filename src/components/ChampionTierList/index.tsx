import { For } from "solid-js";
import { Tier } from "../../business/models";
import ChampionTier from "../ChampionTier";

export type Props = {
  name: string;
  tiers: Tier[];
};

export const ChampionTierList = (props: Props) => {
  return (
    <div class="flex flex-col flex-start">
      <p class="flex-1">{props.name}</p>
      <For each={props.tiers}>{(tier) => <ChampionTier tier={tier} />}</For>
    </div>
  );
};

export default ChampionTierList;
