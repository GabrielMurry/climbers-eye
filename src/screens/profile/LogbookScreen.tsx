import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getLogbookList } from "../../services/profile";
import BoulderCard from "../../components/common/boulderCard/BoulderCard";
import ErrorCard from "../../components/common/ErrorCard";
import EmptyCard from "../../components/common/flatList/EmptyCard";
import BarChartHorizontal from "../../components/barChart/BarChartHorizontal";
import { colors } from "../../utils/styles";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import { LogbookBoulder } from "../../utils/types/logbook";
import { ChartData } from "../boulder/BoulderScreen";
import Empty from "../../components/common/flatList/Empty";
import Footer from "../../components/common/flatList/Footer";
import LogbookHeader from "../../components/profile/LogbookHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const INITIAL_PAGE = 1;
const PADDING = 20;

const LogbookScreen = () => {
  const insets = useSafeAreaInsets();

  const spraywall = useAppSelector((state) => selectSpraywall(state));

  if (!spraywall) {
    console.error("Spraywall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  const [data, setData] = useState<LogbookBoulder[]>([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNexPage, setHasNextPage] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  // useEffect(() => {
  //   performInitialFetch();
  // }, []);

  // const performInitialFetch = async () => {
  //   const pathParams = { spraywallId: spraywall.id };
  //   const response = await getLogbookList(pathParams, INITIAL_PAGE);
  //   setChartData(response.data.grade_chart);
  //   setData(response.data.results);
  //   setRefreshing(false);
  //   setPage(response.data.next ? page + 1 : page);
  //   setHasNextPage(response.data.next ? true : false);
  // };

  // const performNextPageFetch = async () => {
  //   const pathParams = { spraywallId: spraywall.id };
  //   const response = await getLogbookList(pathParams, page);
  //   setData((prev: object[]) => [...prev, ...response.data.results]);
  //   setPage(response.data.next ? page + 1 : page);
  //   setHasNextPage(response.data.next ? true : false);
  // };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setPage(INITIAL_PAGE);
  //   performInitialFetch();
  // }, []);

  const onEndReached = () => {
    // if (hasNexPage && !isLoadingList) {
    //   performNextPageFetch();
    // }
  };

  const SendDateCard = ({ sendDate }: { sendDate: string }) => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: colors.textInputLight,
          paddingVertical: 2,
          borderRadius: 20,
        }}
      >
        <Text>{sendDate}</Text>
      </View>
    );
  };

  const renderBoulderCard = ({
    item,
    index,
  }: {
    item: LogbookBoulder;
    index: number;
  }) => {
    let prevSendDate = null;
    if (index - 1 >= 0) {
      prevSendDate = data[index - 1].sendDate;
    }
    return (
      <>
        {item.sendDate !== prevSendDate ? (
          <SendDateCard sendDate={item.sendDate} />
        ) : null}
        <BoulderCard boulder={item} />
      </>
    );
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <LogbookHeader />
      <FlatList
        data={data}
        renderItem={renderBoulderCard}
        keyExtractor={(item) => item.unique_id.toString()}
        onEndReached={onEndReached}
        // onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
        ListEmptyComponent={<Empty isLoading={isLoadingList} />}
        ListFooterComponent={<Footer isLoading={isLoadingList} />}
        ListHeaderComponent={
          chartData && <BarChartHorizontal data={chartData} />
        }
        style={{
          backgroundColor: "white",
          paddingHorizontal: PADDING,
        }}
        contentContainerStyle={{ gap: PADDING }}
        // onRefresh={onRefresh}
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
