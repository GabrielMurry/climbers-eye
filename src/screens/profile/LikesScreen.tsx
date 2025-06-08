import { Text, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getLikeList } from "../../services/profile";
import BoulderCard from "../../components/common/boulderCard/BoulderCard";
import EmptyCard from "../../components/common/flatList/EmptyCard";
import ErrorCard from "../../components/common/ErrorCard";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import { Boulder } from "../../utils/types/boulder";
import LikesHeader from "../../components/profile/LikesHeader";
import { padding } from "../../utils/styles";

const INITIAL_PAGE = 1;

const LikesScreen = () => {
  const navigation = useNavigation();

  const spraywall = useAppSelector((state) => selectSpraywall(state));

  if (!spraywall) {
    console.error("Spraywall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  const [data, setData] = useState<Boulder[]>([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNexPage, setHasNextPage] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  useEffect(() => {
    performInitialFetch();
  }, []);

  const performInitialFetch = async () => {
    const pathParams = { spraywallId: spraywall.id };
    const response = await getLikeList(pathParams, INITIAL_PAGE);
    setData(response.data.results);
    setRefreshing(false);
    setPage(response.data.next ? page + 1 : page);
    setHasNextPage(response.data.next ? true : false);
  };

  const performNextPageFetch = async () => {
    const pathParams = { spraywallId: spraywall.id };
    const response = await getLikeList(pathParams, page);
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

  const renderBoulderCard = ({ item }: { item: Boulder }) => {
    return <BoulderCard boulder={item} />;
  };

  // if (isErrorList) {
  //   return <ErrorCard message={"Error retrieving boulders."} />;
  // }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <LikesHeader />
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
        style={{
          backgroundColor: "white",
          paddingHorizontal: padding.general,
        }}
        contentContainerStyle={{ gap: padding.general }}
      />
    </SafeAreaView>
  );
};

export default LikesScreen;
