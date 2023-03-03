import { render, screen } from "../../../test-utils/testing-library-utils";
import Options, { OptionType } from "../Options";

test("Displays image for each scoop option from server", async () => {
  render(<Options optionType={OptionType.SCOOPS} />);
  const scoopImages = (await screen.findAllByRole("img", {
    name: /scoop$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(2);
  // confirm alt text of images
  let altTexts = scoopImages.map((value) => value.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
test("Displays image for each topping option from server", async () => {
  render(<Options optionType={OptionType.TOPPINGS} />);
  const scoopImages = (await screen.findAllByRole("img", {
    name: /topping$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(3);
  // confirm alt text of images
  let altTexts = scoopImages.map((value) => value.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
