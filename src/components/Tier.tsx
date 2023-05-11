import { For, JSX, createSignal, Ref } from "solid-js";
import { TierType } from "../business/entities";
import Champion from "./Champion";
import { getChampions } from "../store";
import { styled } from "solid-styled-components";
import { clickOutside } from "../bindings";

export type Props = {
  tier?: TierType;
  children?: JSX.Element;
  championsIds?: string[];
  onCreateTier?: (tierName: string) => void;
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
  const championsIds = props.championsIds || [];

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

  return (
    <StyledTier
      class={
        "bg-purple-900 border border-purple-800 hover:border-gold drop-shadow hover:drop-shadow-white rounded-lg cursor-pointer transition-all " +
        createTierClasses
      }
      onClick={() => {
        if (!props.tier) {
          setCreate(true);
          createTierNameInputRef.focus();
        }
      }}
      ref={(ref) =>
        clickOutside(ref, () => {
          setCreate(false);
        })
      }
    >
      {props.tier && (
        <>
          <div class="title border-b border-white/20 p-4 text-center">
            {props.tier.name}
          </div>
          <div
            class={`p-4 flex flex-nowrap gap-2 overflow-hidden ${
              !championsIds.length && "items-center justify-center"
            }`}
          >
            <For each={championsIds} fallback={<Champion />}>
              {(championId) => (
                <Champion champion={getChampions()[championId]} />
              )}
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
