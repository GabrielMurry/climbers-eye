import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { getLogbookList } from "../../services/profile";
import { useSelector } from "react-redux";
import BoulderCard from "../../components/common/BoulderCard";
import ErrorCard from "../../components/common/ErrorCard";
import EmptyCard from "../../components/common/EmptyCard";
import { useFetch } from "../../hooks/useFetch";
import BarChartHorizontal from "../../components/barChart/BarChartHorizontal";
import useCustomHeader from "../../hooks/useCustomHeader";
import { colors } from "../../utils/styles";

const INITIAL_PAGE = 1;

const LogbookScreen = ({ navigation }) => {
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );

  const [data, setData] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [chartData, setChartData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNexPage, setHasNextPage] = useState(false);

  const [fetchList, isLoadingList, isErrorList] = useFetch(getLogbookList);

  useEffect(() => {
    performInitialFetch();
  }, []);

  const performInitialFetch = async () => {
    const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
    const queryParams = { page: INITIAL_PAGE };
    const response = await fetchList({ pathParams, queryParams });
    setChartData(response.data.grade_chart);
    setData(response.data.results);
    setRefreshing(false);
    setPage(response.data.next ? page + 1 : page);
    setHasNextPage(response.data.next ? true : false);
  };

  const performNextPageFetch = async () => {
    const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
    const queryParams = { page: page };
    const response = await fetchList({ pathParams, queryParams });
    setData((prev) => [...prev, ...response.data.results]);
    setPage(response.data.next ? page + 1 : page);
    setHasNextPage(response.data.next ? true : false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(INITIAL_PAGE);
    performInitialFetch();
  }, []);

  const onEndReached = () => {
    if (hasNexPage && !isLoadingList) {
      performNextPageFetch();
    }
  };

  const SendDateCard = ({ sendDate }) => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: colors.textInputLight,
          paddingVertical: 2,
        }}
      >
        <Text>{sendDate}</Text>
      </View>
    );
  };

  const renderBoulderCard = ({ item, index }) => {
    let prevSendDate = null;
    if (index - 1 >= 0) {
      prevSendDate = data[index - 1].sendDate;
    }
    return (
      <>
        {item.sendDate !== prevSendDate ? (
          <SendDateCard sendDate={item.sendDate} />
        ) : null}
        <BoulderCard boulder={item} navigation={navigation} />
      </>
    );
  };

  if (isErrorList) {
    return <ErrorCard message={"Error retrieving boulders."} />;
  }

  useCustomHeader({
    navigation,
    title: "Logbook",
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderBoulderCard}
        keyExtractor={(item) => item.unique_id.toString()}
        onEndReached={onEndReached}
        // onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
        ListEmptyComponent={() =>
          !isLoadingList && <EmptyCard message={"No boulders found."} />
        }
        ListFooterComponent={() => isLoadingList && <ActivityIndicator />}
        ListHeaderComponent={
          data.length !== 0 ? <BarChartHorizontal data={chartData} /> : null
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

export default LogbookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
