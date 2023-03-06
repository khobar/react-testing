import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Order phases for happy path", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);
  //add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  //click order button
  const orderSummary = screen.getByRole("button", { name: /order sundae/i });
  //check summary
  await user.click(orderSummary);
  const orderSummaryHeading = screen.getByRole("heading", {
    name: "Order Summary",
  });
  expect(orderSummaryHeading).toBeInTheDocument();
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();
  // accept terms and conditions and confirm order
  const termCheckbox = await screen.findByTestId("confirm-terms");
  await user.click(termCheckbox);
  // confirm order number on confirmation page
  const confirmOrder = screen.getByRole("button", { name: /confirm order/i });
  //check summary
  await user.click(confirmOrder);
  // new order clicked
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //check that scoops and topics are reset
  const newOrder = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrder);
  //new order

  const totalScoopsNew = await screen.findByText("Scoops total: $0.00");
  expect(totalScoopsNew).toBeInTheDocument();

  unmount();
});
