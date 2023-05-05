import { For } from "solid-js";
import { ChampionPool } from "../../business/models";
import styles from "./styles.module.scss";
import ChampionTierList from "../ChampionTierList";

export type Props = {
  pools: ChampionPool[];
};

export const ChampionPoolList = (props: Props) => {
  return (
    <div class={styles.poolList}>
      <For each={props.pools}>
        {(championPool) => (
          <div class={styles.poolListItem}>
            <ChampionTierList
              name={championPool.name}
              tiers={championPool.tiers}
            />
          </div>
        )}
      </For>
    </div>
  );
};

export default ChampionPoolList;
