import userEvent from "@testing-library/user-event";
import Options, { OptionType } from "../Options";
import { render, screen } from "../../../test-utils/testing-library-utils";

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
  //update valina scoops 1 and check
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // update chocolate scoops to 2 and check
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
