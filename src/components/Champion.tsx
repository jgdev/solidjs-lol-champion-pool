import GenericChampionImage from "../assets/generic-champion.png";

import { JSX } from "solid-js";
import { styled } from "solid-styled-components";
import { ChampionType } from "../business/entities";

export type Props = JSX.InsHTMLAttributes<HTMLDivElement> & {
  champion?: ChampionType | null;
  search?: string;
};

export const ChampionCardStyled = styled.div`
  user-select: none;
  width: 64px;
  height: 64px;
  color: white;
  .image {
    user-select: none;
    width: 64px;
    height: 64px;
    background-size: cover;
  }
`;

export const Champion = (props: Props) => {
  if (props.champion) {
    return (
      <ChampionCardStyled
        class={`${
          props.class || ""
        } group cursor-pointer relative sortable transition-all rounded-lg`}
        id={`${props.champion?.key}-card`}
      >
        <div
          class={`image border border-white/20 rounded-lg ${
            props.search &&
            (props
              .champion!.name.toLocaleLowerCase()
              .includes(props.search!.toLocaleLowerCase())
              ? ""
              : "opacity-20")
          }`}
          style={{
            "background-image": `url('/src/assets/champions/${props.champion.id}.png'), url(${GenericChampionImage})`,
          }}
        />
        <div
          class=" rounded-lg opacity-0 group-hover:opacity-100 ease-in duration-100 absolute text-center text-xs w-full bg-black/60"
          style={{ bottom: "0px" }}
        >
          {props.champion.name}
        </div>
      </ChampionCardStyled>
    );
  }

  return (
    <ChampionCardStyled
      {...props}
      class={`${props.class || ""} group cursor-pointer relative`}
    >
      <div
        class="image border-dashed rounded-lg border-2"
        style={{
          "background-image": `url(${GenericChampionImage})`,
          opacity: 0.2,
        }}
      />
    </ChampionCardStyled>
  );
};

export default Champion;
