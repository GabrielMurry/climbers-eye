import { useState } from "react";

export const useFetch = (fetchFunc) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async (params) => {
    // var startTime = performance.now();
    setIsLoading(true);
    try {
      return await fetchFunc(params);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      // logPerformance(startTime, "fetchListData");
    }
  };

  // const logPerformance = (startTime, operation) => {
  //   var endTime = performance.now();
  //   console.log(`${operation} took ${endTime - startTime} milliseconds.`);
  // };

  return [fetchData, isLoading, isError];
};
