import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

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
  render(<SummaryForm setOrderPhase={jest.fn} />);
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
