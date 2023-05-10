import { For, JSX } from "solid-js";
import { TierType } from "../business/entities";
import Champion from "./Champion";
import { getChampions } from "../store";
import { styled } from "solid-styled-components";

export type Props = {
  tier: TierType;
  children?: JSX.Element;
  championsIds?: string[];
};

export const StyledTier = styled.div`
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
  return (
    <StyledTier class="bg-purple-900 border border-purple-800 hover:border-gold drop-shadow hover:drop-shadow-white rounded-lg cursor-pointer transition-all">
      <div class="title border-b border-white/20 p-4 text-center">
        {props.tier.name}
      </div>
      <div
        class={`p-4 flex flex-nowrap gap-2 overflow-hidden ${
          !championsIds.length && "items-center justify-center"
        }`}
      >
        <For each={championsIds} fallback={<Champion />}>
          {(championId) => <Champion champion={getChampions()[championId]} />}
        </For>
      </div>
    </StyledTier>
  );
};

export default Tier;
