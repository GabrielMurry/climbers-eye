import { RootState } from "../../store";

export const selectCircuits = (state: RootState) => {
  return state.circuit.objects;
};
