import { render, RenderOptions } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";
import { ReactElement } from "react";
import { OptionCounts } from "../models/OptionCounts";

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { defaults: OptionCounts }
) => {
  return render(ui, {
    wrapper: (props) => (
      <OrderDetailsProvider {...props} defaults={options?.defaults} />
    ),
  });
};

export * from "@testing-library/react";
export { renderWithContext as render };
