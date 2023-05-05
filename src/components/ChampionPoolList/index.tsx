import { For } from "solid-js";
import styles from "./styles.module.scss";
import ChampionTierList from "../ChampionTierList";
import { getChampionPools } from "../../store";
import { Champion } from "../../business/models";

export const ChampionPoolList = () => {
  return (
    <div class={styles.poolList}>
      <For each={getChampionPools()}>
        {(championPool) => (
          <div class={styles.poolListItem}>
            <ChampionTierList
              championPoolId={championPool.id}
              name={championPool.name}
            />
          </div>
        )}
      </For>
    </div>
  );
};

export default ChampionPoolList;
