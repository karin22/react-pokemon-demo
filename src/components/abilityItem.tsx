import { useState, FC, useEffect } from "react";
import { List } from "antd";
import API from "service/http";

type Props = {
  name: string;
};

interface FetchAbility {
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
  name: string;
}

const AbilityItem: FC<Props> = (props) => {
  const [effect, setEffect] = useState({
    name: "",
    effect: "",
  });
  const getAbility = async (name: string) => {
    const res = await API.get(`ability/${name}`);
    const _data = res as FetchAbility;
    const findEffect = _data.effect_entries?.find(
      (f) => f.language.name === "en"
    );
    const objectAbility = {
      name: name,
      effect: findEffect?.effect ?? "",
    };
    setEffect(objectAbility);
  };

  useEffect(() => {
    getAbility(props.name);
  }, [props.name]);

  return (
    <>
      <List.Item.Meta title={effect.name} description={effect.effect} />
    </>
  );
};
export default AbilityItem;
