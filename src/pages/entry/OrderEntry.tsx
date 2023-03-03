import Options, { OptionType } from "./Options";

const OrderEntry = () => (
  <div>
    <Options optionType={OptionType.SCOOPS} />
    <Options optionType={OptionType.TOPPINGS} />
  </div>
);

export default OrderEntry;
