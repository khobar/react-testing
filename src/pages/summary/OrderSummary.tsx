import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";

export const OrderSummary = () => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopList = optionCounts?.scoops.map((option) => (
    <li key={option.name}>
      {option.count} {option.name}
    </li>
  ));
  const toppingsList = optionCounts?.toppings.map((option) => (
    <li key={option.name}>{option.name}</li>
  ));

  return (
    <>
      <h1>Order Summary</h1>
      {scoopList && scoopList.length > 0 ? (
        <>
          <h2>Scoops : {formatCurrency(totals.scoops)}</h2>
          <ul>{scoopList}</ul>
        </>
      ) : null}
      {toppingsList && toppingsList.length > 0 ? (
        <>
          <h2>Toppings : {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingsList}</ul>
        </>
      ) : null}

      <SummaryForm />
    </>
  );
};
