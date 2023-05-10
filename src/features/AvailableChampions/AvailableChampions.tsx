import { For } from "solid-js";
import { getChampions } from "../../store";
import Champion from "../../components/Champion";

export const AvailableChampions = () => {
  const champions = getChampions();
  return (
    <div class="flex flex-wrap justify-center items-center gap-2">
      <For each={Object.keys(champions)}>
        {(championKey) => <Champion champion={champions[championKey]} />}
      </For>
    </div>
  );
};

export default AvailableChampions;
