import userEvent from "@testing-library/user-event";
import Options, { OptionType } from "../Options";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

test("update scoops subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={OptionType.SCOOPS} />);

  // make sure total start at 0
  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  //only await amd findBy for first call as api call will be there by now
  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={OptionType.TOPPINGS} />);

  // make sure total start at 0
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
  const mAndM = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  await user.click(mAndM);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  //only await for first call as api call will be there by now
  const hotFudgeElement = screen.getByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeElement);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
  await user.click(hotFudgeElement);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("Grand total ", () => {
  test("grand total starts at 0", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total:/i });
    expect(grandTotal).toHaveTextContent("0.00");
    unmount();
  });
  test("grand total updates properly if scoop is added", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total:/i });
    //scoop
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");
    //topping
    const mAndM = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    await user.click(mAndM);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if topping is added", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total:/i });
    //topping
    const mAndM = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    await user.click(mAndM);
    expect(grandTotal).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total:/i });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");
    await user.type(vanillaInput, "0");
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
