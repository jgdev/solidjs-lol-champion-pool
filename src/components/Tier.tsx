import { dndzone } from "solid-dnd-directive";
import { For, JSX, createSignal, Ref, onCleanup, createEffect } from "solid-js";
import { ChampionType, TierType } from "../business/entities";
import Champion from "./Champion";
import { getChampions, setChampionTiers } from "../store";
import { styled } from "solid-styled-components";
import { clickOutside } from "../bindings";
import { getChampionTiers } from "../store";

export type Props = JSX.InsHTMLAttributes<HTMLDivElement> & {
  tier?: TierType;
  children?: JSX.Element;
  onCreateTier?: (tierName: string) => void;
  onClick?: (e: any) => void;
};

export const StyledTier = styled.div`
  min-height: 150px;

  .title {
    color: white;
    font-weight: 500;
    font-size: 1.2rem / 2rem;
    letter-spacing: 0.025rem;
    text-transform: uppercase;
  }
`;

export const Tier = (props: Props) => {
  const [getTierChampions, setTierChampions] = createSignal<ChampionType[]>([]);
  const [getCreate, setCreate] = createSignal(false);

  let createTierNameInputRef: HTMLInputElement;

  const handleCreateTier = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setCreate(false);
      return;
    }
    if (e.key === "Enter" && props.onCreateTier) {
      props.onCreateTier(createTierNameInputRef.value);
      setCreate(false);
    }
  };

  const createTierClasses =
    (!props.tier &&
      "border-dashed p-8 border-white/10 bg-purple-900/10 flex justify-center items-center") ||
    "";

  createEffect(() => console.log(getChampionTiers()));
  createEffect(() => {
    setTierChampions((props.tier && getChampionTiers()[props.tier!.id]) || []);
  });

  function handleDndColumnsSorted(e: any) {
    const tier = props.tier!;
    const items: ChampionType[] = e.detail.items;

    setChampionTiers((tiers) => {
      const championsToAdd: ChampionType[] = items.filter(
        (c) =>
          !(tiers[tier.id] || []).some(
            (_c) => c.id === _c.id || c.id === "id:dnd-shadow-placeholder-0000"
          )
      );

      return {
        ...tiers,
        [tier.id]: items,
      };
    });
  }

  return (
    <StyledTier
      class={`bg-purple-900 border border-purple-800 hover:border-gold drop-shadow hover:drop-shadow-white rounded-lg cursor-pointer transition-all ${createTierClasses} ${
        props.class || ""
      }`}
      onClick={(e) => {
        if (!props.tier) {
          setCreate(true);
          createTierNameInputRef.focus();
          return;
        }
        props.onClick && props.onClick(e);
      }}
      ref={(ref) => {
        clickOutside(ref, () => {
          setCreate(false);
        });
      }}
    >
      {props.tier && (
        <>
          <div class="title border-b border-white/20 p-4 text-center">
            {props.tier.name}
          </div>
          <div
            class={`p-4 flex flex-nowrap gap-2 overflow-hidden overflow-x-auto ${
              !getTierChampions().length && "items-center justify-center"
            }`}
            ref={(ref) => {
              dndzone(ref, () => ({
                items: () => getTierChampions(),
                type: "column",
              }));
              ref.addEventListener("consider", handleDndColumnsSorted, false);
              ref.addEventListener("finalize", handleDndColumnsSorted, false);
              onCleanup(() => {
                ref.removeEventListener(
                  "consider",
                  handleDndColumnsSorted,
                  false
                );
                ref.removeEventListener(
                  "finalize",
                  handleDndColumnsSorted,
                  false
                );
              });
            }}
          >
            <For each={getTierChampions()} fallback={<Champion />}>
              {(champion) => <Champion champion={champion} />}
            </For>
          </div>
        </>
      )}
      {!props.tier && (
        <input
          value={!getCreate() ? "+ Create tier" : ""}
          disabled={!getCreate()}
          class="bg-transparent outline-none title text-center cursor-pointer"
          placeholder="Type the tier name"
          ref={createTierNameInputRef!}
          onKeyDown={handleCreateTier}
        />
      )}
    </StyledTier>
  );
};

export default Tier;
