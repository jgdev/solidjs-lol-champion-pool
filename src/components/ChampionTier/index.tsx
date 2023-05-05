import { createEffect, createSignal, For } from "solid-js";
import { createDroppable, Id, SortableProvider } from "@thisbeyond/solid-dnd";
import { Champion, Tier } from "../../business/models";
import ChampionCard from "../ChampionCard";
import { getChampions as getChampionsStore } from "../../store";

export type Props = {
  tier: Tier;
};

const getChampionsFilteredByTier = (championList: Champion[], tierId: string) =>
  championList.filter((champion) => champion.tierId === tierId);

export const ChampionTier = ({ tier }: Props) => {
  const [getChampions, setChampions] = createSignal<Champion[]>([], {
    equals: false,
  });
  const droppable = createDroppable(tier.id);
  const ids = getChampions().map((champion) => champion.championId as Id);

  createEffect(() => {
    setChampions(getChampionsFilteredByTier(getChampionsStore(), tier.id));
    console.log("here", getChampions());
  });

  return (
    <div
      class="flex items-center gap-2 p-2"
      ref={(ref) => droppable(ref, () => ({ skipTransform: true }))}
    >
      <SortableProvider ids={ids}>
        <div class="basis-1/6">{tier.name}</div>
        {!getChampions().length && <ChampionCard />}
        <For each={getChampions()}>
          {(champion) => <ChampionCard champion={champion} />}
        </For>
      </SortableProvider>
    </div>
  );
};

export default ChampionTier;
