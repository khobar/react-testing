import { useOrderDetails } from "../../contexts/OrderDetails";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Order } from "../../models/Order";
import { OrderPhase } from "../../models/Phases";
import Button from "react-bootstrap/Button";
import { IOrderSettingComponent } from "../../models/IOrderSettingComponent";

const OrderConfirmation = ({ setOrderPhase }: IOrderSettingComponent) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState<number>();

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response: AxiosResponse<Order>) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((reason) => console.error(reason));
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase(OrderPhase.IN_PROGRESS);
  };

  return orderNumber ? (
    <div style={{ textAlign: "center" }}>
      <h1>Thank you!</h1>
      <p>Your order number is {orderNumber}</p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  ) : (
    <div>Loading</div>
  );
};
export default OrderConfirmation;
