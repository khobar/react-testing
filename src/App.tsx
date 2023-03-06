import React, { SetStateAction, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderPhase } from "./models/Phases";
import { OrderSummary } from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { Order } from "./models/Order";
import { IOrderSettingComponent } from "./models/IOrderSettingComponent";

function App() {
  const [orderPhase, setOrderPhase] = useState<OrderPhase>(
    OrderPhase.IN_PROGRESS
  );
  let Component: (props: IOrderSettingComponent) => JSX.Element;
  switch (orderPhase) {
    case OrderPhase.IN_PROGRESS:
      Component = OrderEntry;
      break;
    case OrderPhase.REVIEW:
      Component = OrderSummary;
      break;
    case OrderPhase.COMPLETED:
      Component = OrderConfirmation;
      break;
    default:
      Component = OrderEntry;
  }

  return (
    <OrderDetailsProvider>
      <Container>
        <Component setOrderPhase={(phase) => setOrderPhase(phase)} />
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;
