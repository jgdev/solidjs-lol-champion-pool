import { dndzone } from "solid-dnd-directive";
import { For, JSX, onCleanup } from "solid-js";
import {
  getChampionSearch,
  getChampions,
  setChampionSearch,
  setChampions,
} from "../../store";
import Champion from "../../components/Champion";
import { ChampionType } from "../../business/entities";

export const AvailableChampions = (
  props: JSX.HTMLAttributes<HTMLDivElement>
) => {
  function handleDndColumnsSorted(e: any) {
    setChampionSearch("");
    setChampions(
      (e.detail.items as ChampionType[]).reduce<{
        [key: string]: ChampionType;
      }>((result, champion) => {
        return {
          ...result,
          [champion.id]: champion,
        };
      }, {})
    );
  }
  function handleDndCardsSorted(cid: any, e: any) {
    console.log(
      "columnItems",
      (column: any) => column.id === cid,
      "items",
      e.detail.items
    );
  }

  return (
    <section
      class={
        "flex flex-wrap justify-center items-center gap-2 " + props.class || ""
      }
      ref={(ref) => {
        dndzone(ref, () => ({
          items: () =>
            Object.keys(getChampions()).map((c) => getChampions()[c]),
          type: "column",
        }));
        ref.addEventListener("consider", handleDndColumnsSorted, false);
        ref.addEventListener("finalize", handleDndColumnsSorted, false);
        onCleanup(() => {
          ref.removeEventListener("consider", handleDndColumnsSorted, false);
          ref.removeEventListener("finalize", handleDndColumnsSorted, false);
        });
      }}
    >
      <For each={Object.keys(getChampions())}>
        {(championKey) => (
          <Champion
            champion={getChampions()[championKey]}
            search={getChampionSearch()}
          />
        )}
      </For>
    </section>
  );
};

export default AvailableChampions;
