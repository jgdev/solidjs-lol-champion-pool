import { createSortable } from "@thisbeyond/solid-dnd";

import { JSX } from "solid-js";
import { Champion } from "../../business/models";
import { styled } from "solid-styled-components";

export type Props = JSX.InsHTMLAttributes<HTMLDivElement> & {
  champion: Champion;
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
  const sortable = createSortable(champion.championId);
  return (
    <ChampionCardStyled
      {...otherProps}
      class={`${otherProps.class || ""} group cursor-pointer relative sortable`}
      ref={(ref) => sortable(ref)}
    >
      <div
        class="image"
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
};

export default ChampionCard;
