import { For, JSX, createSignal } from "solid-js";
import { getChampions } from "../../store";
import Champion from "../../components/Champion";

export const AvailableChampions = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  const [getShowList, setShowList] = createSignal(false)
  const champions = getChampions();
  return (
    <div class={"flex flex-wrap justify-center items-center gap-2 " + props.class || ''}>
      <For each={Object.keys(champions)}>
        {(championKey) => <Champion champion={champions[championKey]} />}
      </For>
    </div>
  );
};

export default AvailableChampions;
