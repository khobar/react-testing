import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import ScoopOption from "./ScoopOption";
import { Option } from "../../models/Option";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utils";
import { useOrderDetails } from "../../contexts/OrderDetails";

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
  const { totals } = useOrderDetails();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((response: AxiosResponse<Option[]>) => {
        setItems(response.data);
        setError(false);
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setError(true);
        }
      });
    //abort axios call on component umount
    return () => {
      controller.abort();
    };
  }, [optionType]);

  const ItemComponent =
    optionType === OptionType.SCOOPS ? ScoopOption : ToppingOption;
  const title =
    optionType.charAt(0).toUpperCase() + optionType.slice(1).toLowerCase();

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
  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};
export default Options;
