import { render, screen } from "../../../test-utils/testing-library-utils";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";
import { OptionCounts } from "../../../models/OptionCounts";

test("Initial conditions", () => {
  render(<SummaryForm setOrderPhase={jest.fn} />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
  const user = userEvent.setup();
  const defaultInitialState: OptionCounts = {
    scoops: [{ name: "Vanilla", count: 1 }], //example {Chocolate: 1, Vanilla: 2}
    toppings: [{ name: "M&Ms", count: 1 }], //example {"Gummi Bears":1}
  };
  render(<SummaryForm setOrderPhase={jest.fn} />, {
    defaults: defaultInitialState,
  });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm setOrderPhase={jest.fn} />);
  let nullPopover = screen.queryByText(
    /no ice cream will actually by delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  let termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  let popover = screen.getByText(/no ice cream will actually by delivered/i);
  expect(popover).toBeInTheDocument();
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
test("Order button is disabled if there are no scoops", async () => {
  const user = userEvent.setup();
  const defaultInitialState: OptionCounts = {
    scoops: [], //example {Chocolate: 1, Vanilla: 2}
    toppings: [{ name: "M&Ms", count: 1 }], //example {"Gummi Bears":1}
  };
  render(<SummaryForm setOrderPhase={jest.fn} />, {
    defaults: defaultInitialState,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(checkbox);
  const noScoopsError = screen.getByRole("alert");
  expect(noScoopsError).toBeInTheDocument();
  expect(confirmButton).toBeDisabled();
});
