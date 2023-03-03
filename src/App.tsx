import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderSummary } from "./pages/summary/OrderSummary";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        <OrderSummary />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
