import { useState, FC, ReactNode } from "react";
import { Modal, Button, Image, List } from "antd";
import type { DetailsPokemon } from "@/types/index.interface";
import AbilityItem from "components/abilityItem";

type Props = {
  children: ReactNode;
  img: string;
  item: DetailsPokemon;
};

const App: FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const footer = () => {
    return (
      <Button type="primary" shape="round" onClick={handleOk}>
        OK
      </Button>
    );
  };
  return (
    <>
      <div onClick={showModal}>{props.children}</div>
      <Modal
        style={{ top: 20 }}
        title={props.item.name.toUpperCase()}
        open={isModalOpen}
        onCancel={handleOk}
        footer={footer}
      >
        <div
          style={{
            userSelect: "none",
            height: 200,
            width: 200,
            margin: "0px auto 16px auto",
          }}
        >
          <Image
            preview={false}
            style={{ filter: "drop-shadow(rgb(68, 68, 221) 20px 4px 16px)" }}
            alt={props.item.name}
            src={props.img}
            fallback="https://facesconsent.com/images/default-vendor-image.png"
          />
        </div>{" "}
        <h2
          style={{
            textTransform: "uppercase",
            color: "var(--color-primary)",
            textAlign: "center",
          }}
        >
          abilities
        </h2>
        <div
          style={{
            userSelect: "none",
            minHeight: "calc(80dvh - 300px)",
            maxHeight: "calc(80dvh - 300px)",
            overflow: "auto",
            margin: "0px auto 16px auto",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={props.item.abilities}
            renderItem={(item) => (
              <List.Item>
                <AbilityItem name={item.ability.name} />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default App;
