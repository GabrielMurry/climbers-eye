import { useEffect, useState } from "react";
import { selectFilters } from "../redux/features/filter/filterSelectors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectSpraywall,
  selectSpraywalls,
} from "../redux/features/spraywall/spraywallSelectors";
import {
  getBoulderList,
  getLikedBoulders,
  getLogbookBoulders,
  getNextPageBoulderList,
} from "../services/boulder/boulder";
import {
  appendBoulders,
  resetBoulders,
} from "../redux/features/boulder/boulderSlice";
import { getCircuitList } from "../services/circuit";
import { setCircuits } from "../redux/features/circuit/circuitSlice";
import { selectBoulders } from "../redux/features/boulder/boulderSelectors";
import { Image as ExpoImage } from "expo-image";
import { appendLikedBoulders } from "../redux/features/like/likeSlice";
import { getLogbookList } from "../services/profile";
import { appendLogbookBoulders } from "../redux/features/logbook/logbookSlice";
import { Boulder } from "../utils/types/boulder";

const INITIAL_PAGE: number = 1;
const INITIAL_CURSOR = "";

export const useBoulderData = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => selectFilters(state));
  const spraywalls = useAppSelector((state) => selectSpraywalls(state));
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  const boulders = useAppSelector((state) => selectBoulders(state));

  const [isInitialPageLoading, setIsInitialPageLoading] = useState(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string>();

  const fetchInitialPageBoulders = async () => {
    setIsInitialPageLoading(true);
    setError(null);
    dispatch(resetBoulders());
    if (spraywall) {
      await ExpoImage.prefetch(spraywall.url);
    }

    try {
      const response = await getBoulderList(
        getPath(),
        getQueries(INITIAL_CURSOR)
      );
      console.log("next:", response.data.next);
      dispatch(appendBoulders(response.data.results));
      setCursor(response.data.next);
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

  const fetchLikedBoulders = async () => {
    console.log("fetching liked boulders");
    const response = await getLikedBoulders(getPath());
    dispatch(
      appendLikedBoulders({
        boulders: response.data.results,
        cursor: response.data.next,
      })
    );
  };

  const fetchLogbookBoulders = async () => {
    console.log("fetching logbook boulders");
    const response = await getLogbookBoulders(getPath());
    console.log("-----------");
    const resultArr: Boulder[] = response.data.results;
    resultArr.forEach((boulder) => console.log(boulder.name));
    console.log("++++++++++++");
    dispatch(
      appendLogbookBoulders({
        boulders: response.data.results,
        cursor: response.data.next,
      })
    );
  };

  // useEffect(() => {
  //   if (spraywalls.length === 0) {
  //     return;
  //   }
  //   console.log("++++++");
  //   // fetchInitialPageBoulders();
  // }, [filters]);

  useEffect(() => {
    if (spraywalls.length === 0) {
      return;
    }
    fetchInitialPageBoulders();
    fetchCircuits();
    fetchLikedBoulders();
    fetchLogbookBoulders();
  }, [spraywall, spraywalls]);

  const fetchNextPageBoulders = async () => {
    if (
      !cursor ||
      isInitialPageLoading ||
      isNextPageLoading ||
      spraywalls.length === 0
    )
      return;
    setIsNextPageLoading(true);
    try {
      const response = await getNextPageBoulderList(cursor);
      dispatch(appendBoulders(response.data.results));
      setCursor(response.data.next);
    } catch (err) {
      setError("Failed to fetch next page boulders.");
      console.error(err);
    } finally {
      setIsNextPageLoading(false);
    }
  };

  const getPath = () => {
    return { spraywallId: spraywall?.id };
  };

  const getQueries = (cursor: string) => {
    return {
      searchQuery: filters.search,
      minGradeIndex: filters.minGradeIndex,
      maxGradeIndex: filters.maxGradeIndex,
      ordering: filters.ordering,
      activity: filters.activity,
      status: filters.climbStatus,
      circuit: filters.circuit,
      cursor: cursor,
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
