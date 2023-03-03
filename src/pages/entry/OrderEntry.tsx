import Options, { OptionType } from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";

const OrderEntry = () => {
  const { totals } = useOrderDetails();
  return (
    <div>
      <Options optionType={OptionType.SCOOPS} />
      <Options optionType={OptionType.TOPPINGS} />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
};

export default OrderEntry;
