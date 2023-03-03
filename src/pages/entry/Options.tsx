import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import ScoopOption from "./ScoopOption";
import { Option } from "../../models/Option";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

interface IOptions {
  optionType: OptionType;
}

export enum OptionType {
  SCOOPS = "scoops",
  TOPPINGS = "toppings",
}

const Options = ({ optionType }: IOptions) => {
  const [items, setItems] = useState<Option[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response: AxiosResponse<Option[]>) => {
        setItems(response.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [optionType]);

  const ItemComponent =
    optionType === OptionType.SCOOPS ? ScoopOption : ToppingOption;

  const optionItems = items?.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  if (error) {
    return <AlertBanner />;
  }
  return <Row>{optionItems}</Row>;
};
export default Options;
