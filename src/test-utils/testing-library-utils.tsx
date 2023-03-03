import { render, RenderOptions } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";
import { ReactElement } from "react";

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: OrderDetailsProvider, ...options });

export * from "@testing-library/react";
export { renderWithContext as render };
