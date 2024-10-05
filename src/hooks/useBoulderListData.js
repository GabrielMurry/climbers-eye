import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoulderList } from "../services/boulder";
import {
  appendBoulders,
  resetBoulders,
} from "../redux/features/boulder/boulderSlice";

export const useBoulderListData = (setPage, searchQuery, filters) => {
  const dispatch = useDispatch();
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchListData = async (page) => {
    var startTime = performance.now();
    if (isLoading || page === null || spraywalls.length === 0) return;
    setIsLoading(true);
    try {
      const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
      const queryParams = {
        searchQuery,
        minGradeIndex: filters.minGradeIndex,
        maxGradeIndex: filters.maxGradeIndex,
        sortBy: filters.sortBy,
        activity: filters.activity,
        status: filters.climbStatus,
        circuits: filters.circuits.map((circuit) => circuit.id),
        page,
      };
      const response = await getBoulderList(pathParams, queryParams);
      if (response?.data.results.length === 0) {
        setPage(null);
      } else {
        dispatch(appendBoulders(response.data.results));
        setPage(response.data.next ? page + 1 : null);
      }
    } catch (error) {
      setIsError(true);
      setPage(null);
    } finally {
      setIsLoading(false);
      logPerformance(startTime, "fetchListData");
    }
  };

  useEffect(() => {
    dispatch(resetBoulders());
    fetchListData(1); // Initialize fetch on first mount
  }, [searchQuery, spraywalls, spraywallIndex, filters]);

  const logPerformance = (startTime, operation) => {
    var endTime = performance.now();
    console.log(`${operation} took ${endTime - startTime} milliseconds.`);
  };

  return { isLoading, isError, fetchListData };
};
