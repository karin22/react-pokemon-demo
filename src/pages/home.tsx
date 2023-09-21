import { FC, useEffect, useState } from "react";
import RootPage from "./root";
import API from "service/http";
import { Col, Row, Spin, Divider, Segmented } from "antd";
import type { ItemList } from "@/types/index.interface";
import PokemonCard from "@/components/pokemonCard";

const HomePage: FC = () => {
  const [res, setRes] = useState<ItemList[]>([]);
  const [loading, setLoading] = useState(false);
  const [pokemonType, setPokemonType] = useState("normal");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await API.get(`type/${pokemonType}`);

      setRes(res.pokemon);
      setTimeout(() => {
        setLoading(false);
      }, 50);
    };
    fetchData();
  }, [pokemonType]);

  const listType = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
  ];

  const onChangeType = (value: string | number) => {
    setPokemonType(value.toString());
  };
  return (
    <RootPage>
      <div style={{ margin: "0 24px", overflow: "auto" }}>
        <Segmented
          value={pokemonType}
          onChange={onChangeType}
          options={listType}
        ></Segmented>
      </div>

      <Divider orientation="left" plain style={{ marginTop: 24 }}>
        <p>{pokemonType.toUpperCase()}</p>
      </Divider>

      <Row
        gutter={[24, 24]}
        style={{ margin: "40px 0" }}
        justify={{ ["xs"]: "center" }}
      >
        {loading ? (
          <Col span={24}>
            <div
              style={{
                display: "grid",
                alignItems: "center",
                minHeight: "calc(100dvh - 250px)",
              }}
            >
              <div style={{ width: 60, margin: "auto" }}>
                <Spin tip="Loading" size="large">
                  <div className="content" />
                </Spin>
              </div>
            </div>
          </Col>
        ) : (
          res?.map((i, ind) => {
            return (
              <Col lg={6} md={8} sm={24} key={i.pokemon.name}>
                <PokemonCard index={ind} item={i} />
              </Col>
            );
          })
        )}
      </Row>
    </RootPage>
  );
};

export default HomePage;
