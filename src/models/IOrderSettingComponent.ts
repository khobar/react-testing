import { SetStateAction } from "react";
import { OrderPhase } from "./Phases";

export interface IOrderSettingComponent {
  setOrderPhase: (phase: OrderPhase) => void;
}
