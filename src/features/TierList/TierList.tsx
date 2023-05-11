import { For, JSX } from "solid-js";
import Tier from "../../components/Tier";
import { getTiers, setTiers } from "../../store";

export type Props = JSX.HTMLAttributes<HTMLDivElement> & {};

export const TierList = (props: Props) => {
  return (
    <div
      {...props}
      class={
        "mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 " + (props.class || "")
      }
    >
      <For each={getTiers()}>{(tier) => <Tier tier={tier} />}</For>
      <Tier
        onCreateTier={(tierName) => {
          setTiers((tiers) =>
            tiers.concat([
              {
                id: globalThis.crypto.randomUUID(),
                name: tierName,
              },
            ])
          );
        }}
      />
    </div>
  );
};

export default TierList;
