export interface OptionCounts {
  scoops: SelectedOption[];
  toppings: SelectedOption[];
}

export interface OptionTotals {
  scoops: number;
  toppings: number;
}

export interface SelectedOption {
  name: string;
  count: number;
}
