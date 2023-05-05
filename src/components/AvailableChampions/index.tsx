import { For } from "solid-js";
import { createDroppable, Id, SortableProvider } from "@thisbeyond/solid-dnd";
import { Champion } from "../../business/models";
import ChampionCard from "../ChampionCard";

export type Props = {
  champions: Champion[];
};

export const AvailableChampions = ({ champions }: Props) => {
  const droppable = createDroppable("main-champion-list");
  const ids = champions.map((champion) => champion.championId as Id);

  return (
    <div
      class="flex flex-wrap justify-center items-center gap-2 p-2"
      ref={(ref) => droppable(ref, () => ({ skipTransform: true }))}
    >
      <SortableProvider ids={ids}>
        <For each={champions}>
          {(champion) => <ChampionCard champion={champion} />}
        </For>
      </SortableProvider>
    </div>
  );
};

export default AvailableChampions;
