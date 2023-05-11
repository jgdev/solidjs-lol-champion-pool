import { dndzone } from "solid-dnd-directive";
import { For, JSX } from "solid-js";
import Tier from "../../components/Tier";
import {
  getTiers,
  getSelectedTier,
  setSelectedTier,
  setTiers,
  setChampionSearch,
} from "../../store";

export type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  onSelectTier?: (id: string) => void;
};

export const TierList = (props: Props) => {
  return (
    <div
      {...props}
      class={
        "mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 " + (props.class || "")
      }
    >
      <For each={getTiers()}>
        {(tier) => (
          <Tier
            tier={tier}
            onClick={() => {
              // setSelectedTier(
              //   getSelectedTier() === tier.id ? undefined : tier.id
              // );
            }}
            class={
              typeof getSelectedTier() !== "undefined"
                ? (getSelectedTier() === tier.id && "border-gold") ||
                  "opacity-40"
                : ""
            }
          />
        )}
      </For>
      <Tier
        onCreateTier={(tierName) => {
          const id = globalThis.crypto.randomUUID();
          setTiers((tiers) =>
            tiers.concat([
              {
                id,
                name: tierName,
              },
            ])
          );
          // setSelectedTier(id);
        }}
      />
    </div>
  );
};

export default TierList;
