import { useEffect, useState } from "react";
import { selectFilters } from "../redux/features/filter/filterSelectors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectSpraywall,
  selectSpraywalls,
} from "../redux/features/spraywall/spraywallSelectors";
import {
  getBoulderList,
  getNextPageBoulderList,
} from "../services/boulder/boulder";
import {
  appendBoulders,
  resetBoulders,
} from "../redux/features/boulder/boulderSlice";
import { getCircuitList } from "../services/circuit";
import { setCircuits } from "../redux/features/circuit/circuitSlice";
import { selectBoulders } from "../redux/features/boulder/boulderSelectors";

const INITIAL_PAGE: number = 1;

export const useBoulderData = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => selectFilters(state));
  const spraywalls = useAppSelector((state) => selectSpraywalls(state));
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  const boulders = useAppSelector((state) => selectBoulders(state));

  const [isInitialPageLoading, setIsInitialPageLoading] = useState(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchInitialPageBoulders = async () => {
    setIsInitialPageLoading(true);
    setError(null);
    dispatch(resetBoulders());

    try {
      const response = await getBoulderList(
        getPath(),
        getQueries(INITIAL_PAGE)
      );
      dispatch(appendBoulders(response.data.results));
      setNextPage(response.data.next);
    } catch (err) {
      setError("Failed to fetch boulders.");
      console.error(err);
    } finally {
      setIsInitialPageLoading(false);
    }
  };

  const fetchCircuits = async () => {
    const circuitResponse = await getCircuitList(getPath());
    dispatch(setCircuits(circuitResponse.data));
  };

  useEffect(() => {
    fetchInitialPageBoulders();
    fetchCircuits();
  }, [filters, spraywalls, spraywall]);

  const fetchNextPageBoulders = async () => {
    if (
      !nextPage ||
      isInitialPageLoading ||
      isNextPageLoading ||
      spraywalls.length === 0
    )
      return;
    setIsNextPageLoading(true);
    try {
      const response = await getNextPageBoulderList(nextPage);
      dispatch(appendBoulders(response.data.results));
      setNextPage(response.data.next);
    } catch (err) {
      setError("Failed to fetch next page boulders.");
      console.error(err);
    } finally {
      setIsNextPageLoading(false);
    }
  };

  const getPath = () => {
    return { spraywallId: spraywall!.id };
  };

  const getQueries = (page: number) => {
    return {
      searchQuery: filters.search,
      minGradeIndex: filters.minGradeIndex,
      maxGradeIndex: filters.maxGradeIndex,
      sortBy: filters.sortBy,
      activity: filters.activity,
      status: filters.climbStatus,
      circuit: filters.circuit,
      excludeIds: filters.excludeIds,
      page: page,
    };
  };

  return {
    boulders,
    isInitialPageLoading,
    isNextPageLoading,
    error,
    refreshBoulders: fetchInitialPageBoulders,
    nextPageBoulders: fetchNextPageBoulders,
  };
};
