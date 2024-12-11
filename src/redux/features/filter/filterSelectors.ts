import { RootState } from "../../store";

export const selectFilters = (state: RootState) => {
  return state.filter.object;
};
