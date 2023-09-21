import { FC, useEffect, useState } from "react";
import { Card, Image, Skeleton } from "antd";
import type { ItemList, DetailsPokemon } from "@/types/index.interface";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";
import API from "service/http";
import { useAppSelector, useAppDispatch } from "store/hook";
import { addFavorite, deFavorite } from "store/favorite";
import includes from "lodash/includes";
import PokemonDetailModal from "components/pokemonDetailModal";
import pokeBall from "assets/images/pokeball-logo.png";

const { Meta } = Card;
export interface PropItem {
  index: number;
  item: ItemList;
}
const IconBall = styled.div`
  cursor: pointer;
  position: absolute;
  left: 30%;
  left: 20px;
  img {
    width: 18px;
    height: 18px;
    user-select: none;
  }
`;

const IconHeart = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: fit-content;
  position: absolute;
  top: 30%;
  right: 20px;
  &:hover {
    transform: scale(2);
    color: red;
  }
`;
const PokemonCardStyle = styled.div`
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const PokemonCard: FC<PropItem> = (props) => {
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [img, setImg] = useState("");

  const [pokemonData, setPokemonData] = useState<DetailsPokemon>({
    abilities: [],
    name: "",
    sprites: {
      other: {
        home: {
          front_default: "",
        },
        "official-artwork": {
          front_default: "",
        },
      },
    },
  });

  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(
    (state) => state.favoriteStore.favoriteList
  );

  useEffect(() => {
    const nameList = favoriteList.map((e) => e.pokemon.name);
    setIsFav(includes(nameList, props.item.pokemon.name));
  }, [props.item, favoriteList]);

  useEffect(() => {
    const fetchDataImage = async () => {
      setLoading(true);
      const url = props.item.pokemon.url.replace(
        "https://pokeapi.co/api/v2",
        ""
      );
      const res = await API.get(url);
      const _data = res as DetailsPokemon;
      const spirit = _data.sprites;
      setPokemonData(_data);

      const imgUrl =
        spirit.other.home.front_default ||
        spirit.other["official-artwork"].front_default;
      setImg(imgUrl);

      setTimeout(() => {
        setLoading(false);
      }, 50);
    };
    fetchDataImage();
  }, [props.item]);

  const addFavoriteFn = () => {
    if (isFav) {
      dispatch(deFavorite(props.item));
      return;
    }
    dispatch(addFavorite(props.item));
  };
  return (
    <PokemonCardStyle>
      <Card
        hoverable
        style={{
          backgroundColor: "var(--color-yellow-primary)",
          width: 240,
          margin: "0 auto ",
          contentVisibility: "auto",
          cursor: "default",
        }}
        cover={
          loading || !img ? (
            <Skeleton.Image />
          ) : (
            <Image
              style={{
                userSelect: "none",
              }}
              alt={props.item.pokemon.name}
              src={img}
              fallback="https://facesconsent.com/images/default-vendor-image.png"
              preview={{
                src: img,
              }}
            />
          )
        }
      >
        <PokemonDetailModal img={img} item={pokemonData}>
          <IconBall>
            <img src={pokeBall} alt="pokeBall" />
          </IconBall>
        </PokemonDetailModal>
        <Meta title={props.item.pokemon.name.toUpperCase()} />
        {isFav ? (
          <IconHeart style={{ color: "red" }} onClick={() => addFavoriteFn()}>
            <HeartFilled />
          </IconHeart>
        ) : (
          <IconHeart onClick={() => addFavoriteFn()}>
            <HeartOutlined />
          </IconHeart>
        )}
      </Card>
    </PokemonCardStyle>
  );
};

export default PokemonCard;
