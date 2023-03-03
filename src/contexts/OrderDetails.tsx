import { createContext, useContext, useState } from "react";
import { OptionType } from "../pages/entry/Options";
import { OptionCounts, OptionTotals } from "../models/OptionCounts";
import * as _ from "lodash";
import { pricePerItem } from "../constants";

type OrderDetailsType = {
  optionCounts?: OptionCounts;
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) => void;
  resetOrder: () => void;
  totals: OptionTotals;
};

const OrderDetails = createContext<OrderDetailsType | undefined>(undefined);

// check if within provider
export function useOrderDetails() {
  let context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      "userOrderDetails must be called from within OrderDetailsProvider"
    );
  }
  return context;
}

export function OrderDetailsProvider(props: any) {
  const initialState: OptionCounts = {
    scoops: [], //example {Chocolate: 1, Vanilla: 2}
    toppings: [], //example {"Gummi Bears":1}
  };
  const [optionCounts, setOptionCounts] = useState<OptionCounts>(initialState);

  const updateItemCount = (
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) => {
    //make copy of existing state
    const newOptionCounts = _.cloneDeep(optionCounts);
    let updatedOptionIndex = newOptionCounts[optionType].findIndex(
      (option) => option.name === itemName
    );
    if (updatedOptionIndex >= 0) {
      if (newItemCount <= 0) {
        newOptionCounts[optionType].splice(updatedOptionIndex);
      } else {
        const updatedOption = newOptionCounts[optionType][updatedOptionIndex];
        updatedOption.count = newItemCount;
      }
    } else {
      newOptionCounts[optionType].push({ name: itemName, count: newItemCount });
    }
    //set
    setOptionCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionCounts(initialState);
  };

  const calculateTotal = (optionType: OptionType) => {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce(
      (total, value) => total + value.count,
      0
    );
    return totalCount * pricePerItem[optionType];
  };

  const totals: OptionTotals = {
    scoops: calculateTotal(OptionType.SCOOPS),
    toppings: calculateTotal(OptionType.TOPPINGS),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
