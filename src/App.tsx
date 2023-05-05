import {
  DragDropProvider,
  DragDropSensors,
  closestCenter,
  Draggable,
  Droppable,
} from "@thisbeyond/solid-dnd";

import AvailableChampions from "./components/AvailableChampions";
import ChampionPoolList from "./components/ChampionPoolList";

import { Tier } from "./business/models";
import { produce } from "solid-js/store";
import { getTiers } from "./store";

export const App = () => {
  const containers = getTiers().reduce<{ [key: string]: Tier }>(
    (result, tier) => {
      return {
        ...result,
        [`${tier.championPoolId}-${tier.id}`]: tier,
      };
    },
    {}
  );

  const containerIds = () => Object.keys(containers);

  const isContainer = (id: string) => containerIds().includes(id);

  const getContainer = (id: string) => {
    for (const [key, tier] of Object.entries(containers)) {
      if (tier.id === id) return tier;
    }
  };

  const closestContainerOrItem = (
    draggable: any,
    droppables: Droppable[],
    context: any
  ) => {
    const closestContainer = closestCenter(
      draggable,
      droppables.filter((droppable: any) => isContainer(droppable.id)),
      context
    );
    if (closestContainer) {
      const containerItemIds = containers[closestContainer.id];
      const closestItem = closestCenter(
        draggable,
        droppables.filter((droppable) =>
          containerItemIds.champions.find(
            (champion) => champion.championId === droppable.id
          )
        ),
        context
      );

      if (!closestItem) {
        return closestContainer;
      }

      if (
        !getContainer(draggable.id)?.champions.some(
          (champion) => champion.championId === closestContainer.id
        )
      ) {
        const isLastItem =
          containerItemIds.champions.findIndex(
            (champion) => champion.championId === closestItem.id
          ) ===
          containerItemIds.champions.length - 1;

        if (isLastItem) {
          const belowLastItem =
            draggable.transformed.center.y > closestItem.transformed.center.y;

          if (belowLastItem) {
            return closestContainer;
          }
        }
      }
      return closestItem;
    }
  };

  const move = (draggable: Draggable, droppable: Droppable) => {
    let tier = containers[droppable.id];
    if (tier.champions.find((champion) => champion.championId === draggable.id))
      return;
    if (tier) {
      setData(
        produce((data) => {
          const championPoolIndex = data.findIndex(
            (championPool) => championPool.id === tier.championPoolId!
          );
          const tierIndex = data[championPoolIndex].tiers.findIndex(
            (tier) => tier.id === droppable.id
          );

          if (
            data[championPoolIndex]!.tiers[tierIndex]!.champions.findIndex(
              (c) => c.championId === draggable.id
            ) > -1
          )
            return;

          data[championPoolIndex]!.tiers[tierIndex]!.champions = [
            ...data[championPoolIndex]!.tiers[tierIndex]!.champions,
          ].concat({
            ...championList.find(
              (champion) => champion.championId === draggable.id
            )!,
            championPoolId: data[championPoolIndex]?.id,
            tierId: data[championPoolIndex]?.tiers[tierIndex]?.id,
          });

          return data;
        })
      );

      /*console.log(tier);
      let championPoolId = tier.championPoolId!;

      const championAlreadyInTier =
        tier.champions.findIndex(
          (champion) => champion.championId === draggable.id
        ) > -1;

      if (!championAlreadyInTier) {
        setContainers((containers) => {
          containers[droppable.id].champions.push({
            ...championList.find(
              (champion) => champion.championId === draggable.id
            )!,
            championPoolId,
            tierId: tier.id,
          });
          return containers;
        });
      }
      }*/
    }
  };

  const onDragOver = ({ draggable, droppable }: any) => {
    if (draggable && droppable) {
      move(draggable, droppable);
    }
  };

  const onDragEnd = ({ draggable, droppable }: any) => {
    if (draggable && droppable) {
      move(draggable, droppable);
    }
  };

  return (
    <DragDropProvider
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      collisionDetector={closestContainerOrItem}
    >
      <DragDropSensors>
        <ChampionPoolList />
        <AvailableChampions />
      </DragDropSensors>
    </DragDropProvider>
  );
};

export default App;
