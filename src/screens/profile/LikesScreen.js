import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getLikeList } from "../../services/profile";
import { useSelector } from "react-redux";
import BoulderCard from "../../components/common/BoulderCard";
import { useFetch } from "../../hooks/useFetch";
import EmptyCard from "../../components/common/EmptyCard";
import useCustomHeader from "../../hooks/useCustomHeader";
import ErrorCard from "../../components/common/ErrorCard";

const INITIAL_PAGE = 1;

const LikesScreen = ({ navigation }) => {
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );
  const [data, setData] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNexPage, setHasNextPage] = useState(false);

  const [fetchList, isLoadingList, isErrorList] = useFetch(getLikeList);

  useEffect(() => {
    performInitialFetch();
  }, []);

  const performInitialFetch = async () => {
    const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
    const queryParams = { page: INITIAL_PAGE };
    const response = await fetchList({ pathParams, queryParams });
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

  const renderBoulderCard = ({ item }) => {
    return <BoulderCard boulder={item} navigation={navigation} />;
  };

  if (isErrorList) {
    return <ErrorCard message={"Error retrieving boulders."} />;
  }

  useCustomHeader({
    navigation,
    title: "Likes",
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderBoulderCard}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onEndReached}
        // onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
        ListEmptyComponent={() =>
          !isLoadingList && <EmptyCard message={"No boulders found."} />
        }
        ListFooterComponent={() => isLoadingList && <ActivityIndicator />}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
