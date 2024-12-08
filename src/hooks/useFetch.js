import { useState } from "react";

export const useFetch = (fetchFunc) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async (params) => {
    setIsLoading(true);
    try {
      return await fetchFunc(params);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchData, isLoading, isError];
};
