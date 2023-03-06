import Options, { OptionType } from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import { IOrderSettingComponent } from "../../models/IOrderSettingComponent";
import Button from "react-bootstrap/Button";
import { OrderPhase } from "../../models/Phases";

const OrderEntry = ({ setOrderPhase }: IOrderSettingComponent) => {
  const { totals } = useOrderDetails();
  return (
    <div>
      <Options optionType={OptionType.SCOOPS} />
      <Options optionType={OptionType.TOPPINGS} />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button onClick={() => setOrderPhase(OrderPhase.REVIEW)}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
