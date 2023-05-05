import { For } from "solid-js";
import { createDroppable, Id, SortableProvider } from "@thisbeyond/solid-dnd";
import { Tier } from "../../business/models";
import styles from "./styles.module.scss";
import ChampionCard from "../ChampionCard";

export type Props = {
  tier: Tier;
};

export const ChampionTier = ({ tier }: Props) => {
  const droppable = createDroppable(tier.id);
  const ids = tier.champions.map((champion) => champion.championId as Id);
  return (
    <div
      class="flex items-center gap-2 p-2"
      ref={(ref) => droppable(ref, () => ({ skipTransform: true }))}
    >
      <SortableProvider ids={ids}>
        <div class="basis-1/6">{tier.name}</div>
        <For each={tier.champions}>
          {(champion) => <ChampionCard class="" champion={champion} />}
        </For>
      </SortableProvider>
    </div>
  );
};

export default ChampionTier;
