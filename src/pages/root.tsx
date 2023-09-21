import React, { FC, ReactNode, useEffect } from "react";
import { Layout, Menu, ConfigProvider, Badge, FloatButton } from "antd";
import type { MenuProps } from "antd";
import { HomeTwoTone, HeartTwoTone } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { useAppSelector } from "store/hook";
import styled from "styled-components";
import pokeBall from "assets/images/pokeball-logo.png";

const IconBall = styled.div`
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  position: absolute;
  top: 15px;
  left: 28px;
  img {
    animation: rotation 6s infinite linear;
    width: 40px;
    height: 40px;
    user-select: none;
  }
`;

type Props = {
  children: ReactNode;
};

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  justifyContent: "center",
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#fff",
  position: "fixed",
  bottom: 0,
  zIndex: 100,
  width: "100%",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  maxWidth: 1200,
  margin: "0 auto",
  minHeight: "100dvh",
  width: "100%",
  paddingBottom: 64,
};

const RootPage: FC<Props> = (props) => {
  const favoriteList = useAppSelector(
    (state) => state.favoriteStore.favoriteList
  );
  useEffect(() => {
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 50);
  }, []);

  useEffect(() => {
    const findIndexNum = document.title.indexOf("(");
    let title = document.title;
    if (findIndexNum > -1) {
      title = document.title.slice(0, findIndexNum);
    }

    if (!favoriteList.length) {
      document.title = title;

      return;
    }

    document.title = `${title} (${favoriteList.length})`;
  }, [favoriteList]);

  const location = useLocation();

  const items: MenuProps["items"] = [
    {
      label: <Link to="/">Home</Link>,
      key: "/",
      icon: <HomeTwoTone />,
    },
    {
      label: (
        <Link to="/fav">
          Favorite
          <Badge count={favoriteList.length} offset={[0, -15]}></Badge>
        </Link>
      ),
      key: "/fav",
      icon: <HeartTwoTone />,
    },
  ];
  return (
    <>
      <ConfigProvider theme={{ hashed: false }}>
        <Layout>
          <Content style={contentStyle}>{props.children}</Content>
          <Header style={headerStyle}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div className="demo-logo" />
              <IconBall>
                <img src={pokeBall} alt="pokeBall" />
              </IconBall>
              <Menu
                style={{ justifyContent: "center" }}
                mode="horizontal"
                defaultSelectedKeys={[location.pathname]}
                items={items}
              />
            </div>
          </Header>
        </Layout>
      </ConfigProvider>
      <FloatButton.BackTop duration={100} />
    </>
  );
};

export default RootPage;
