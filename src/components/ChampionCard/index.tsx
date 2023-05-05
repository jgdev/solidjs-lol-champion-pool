import { createSortable } from "@thisbeyond/solid-dnd";
import { BiRegularPlus } from "solid-icons/bi";

import { JSX } from "solid-js";
import { Champion } from "../../business/models";
import { styled } from "solid-styled-components";

export type Props = JSX.InsHTMLAttributes<HTMLDivElement> & {
  champion?: Champion | null;
};

export const ChampionCardStyled = styled.div`
  user-select: none;
  .image {
    user-select: none;
    width: 64px;
    height: 64px;
    background-size: cover;
  }
`;

export const ChampionCard = ({ champion, ...otherProps }: Props) => {
  if (champion) {
    let sortableId = champion.championId;

    if (champion.tierId)
      sortableId = `${champion.championPoolId}-${champion.tierId}-${champion.championId}`;

    const sortable = createSortable(sortableId);
    return (
      <ChampionCardStyled
        {...otherProps}
        class={`${
          otherProps.class || ""
        } group cursor-pointer relative sortable`}
        ref={(ref) => sortable(ref)}
        id={`${sortableId}-card`}
      >
        <div
          class="image border rounded-lg border-2 border-white/50"
          style={{ "background-image": `url(${champion.pictureUrl})` }}
        />
        <div
          class="opacity-0 group-hover:opacity-100 ease-in duration-100 absolute text-center text-xs w-full bg-black/60"
          style={{ bottom: "0px" }}
        >
          {champion.name}
        </div>
      </ChampionCardStyled>
    );
  }

  return (
    <ChampionCardStyled
      {...otherProps}
      class={`${otherProps.class || ""} group cursor-pointer relative sortable`}
    >
      <div class="image border-dashed rounded-lg border-2 border-white/50 flex justify-center items-center" />
    </ChampionCardStyled>
  );
};

export default ChampionCard;
