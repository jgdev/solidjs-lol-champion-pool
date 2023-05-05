import { For } from "solid-js";
import ChampionTier from "../ChampionTier";
import { getTiers } from "../../store";

export type Props = {
  name: string;
  championPoolId: string;
};

export const ChampionTierList = (props: Props) => {
  return (
    <div class="flex flex-col flex-start">
      <p class="flex-1">{props.name}</p>
      <For each={getTiers()}>{(tier) => <ChampionTier tier={tier} />}</For>
    </div>
  );
};

export default ChampionTierList;
