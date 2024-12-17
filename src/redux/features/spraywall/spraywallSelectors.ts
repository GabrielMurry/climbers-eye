import { Spraywall } from "../../../utils/types/spraywall";
import { RootState } from "../../store";

export const selectSpraywalls = (state: RootState) => {
  return state.spraywall.objects;
};

export const selectSpraywall = (state: RootState): Spraywall | null => {
  if (state.spraywall.objects.length === 0) {
    console.log("Spraywall not found.");
    return null;
  }
  const spraywall = state.spraywall.objects.find(
    (spraywall) => spraywall.id === state.spraywall.selectedId
  );
  return spraywall ? spraywall : null;
};
