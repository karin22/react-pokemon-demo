import { FC } from "react";
import RootPage from "./root";
import { Col, Row, Divider, Button, Empty } from "antd";
import PokemonCard from "@/components/pokemonCard";
import { useAppSelector, useAppDispatch } from "store/hook";
import { CloseCircleOutlined } from "@ant-design/icons";
import { clearFavorite } from "store/favorite";
import { useNavigate } from "react-router-dom";

const FavPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoriteList = useAppSelector(
    (state) => state.favoriteStore.favoriteList
  );
  return (
    <RootPage>
      {favoriteList.length ? (
        <Divider orientation="right" plain style={{ marginTop: 24 }}>
          <Button
            danger
            shape="round"
            icon={<CloseCircleOutlined />}
            onClick={() => dispatch(clearFavorite())}
          >
            CLEAR
          </Button>
        </Divider>
      ) : (
        <div style={{ display: "grid", alignItems: "center", height: "78dvh" }}>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 200 }}
            description={<span></span>}
          >
            <Button type="primary" onClick={() => navigate("/")}>
              ADD FAVORITE
            </Button>
          </Empty>
        </div>
      )}

      <Row
        gutter={[24, 24]}
        style={{ margin: "40px 0" }}
        justify={{ ["xs"]: "center" }}
      >
        {favoriteList.map((i, ind) => {
          return (
            <Col lg={6} md={8} sm={24} key={i.pokemon.name}>
              <PokemonCard index={ind} item={i} />
            </Col>
          );
        })}
      </Row>
    </RootPage>
  );
};

export default FavPage;
