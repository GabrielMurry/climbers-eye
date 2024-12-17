import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  ListRenderItem,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import BoulderCard from "../../components/common/BoulderCard";
import EmptyCard from "../../components/common/EmptyCard";
import ErrorCard from "../../components/common/ErrorCard";
import ModalOptions from "../../components/custom/ModalOptions";
import ListHeader from "../../components/home/ListHeader";
import {
  appendBoulders,
  resetBoulders,
} from "../../redux/features/boulder/boulderSlice";
import { getBoulderList } from "../../services/boulder/boulder";
import { getCircuitList } from "../../services/circuit";
import { setCircuits } from "../../redux/features/circuit/circuitSlice";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Boulder } from "../../utils/types/boulder";
import {
  selectSpraywall,
  selectSpraywalls,
} from "../../redux/features/spraywall/spraywallSelectors";
import { selectBoulders } from "../../redux/features/boulder/boulderSelectors";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import { selectFilters } from "../../redux/features/filter/filterSelectors";

const INITIAL_PAGE: number = 1;

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const gym = useAppSelector((state) => selectGym(state));
  const spraywalls = useAppSelector((state) => selectSpraywalls(state));
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    console.error("No spraywall found.");
    return <Text>No spray wall found.</Text>;
  }
  const filters = useAppSelector((state) => selectFilters(state));
  const boulders = useAppSelector((state) => selectBoulders(state));

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasEditPermission = true;

  const handleResponse = (
    results: Boulder[],
    page: number,
    hasNext: boolean
  ) => {
    if (results.length === 0) {
      setHasNextPage(false);
    } else {
      dispatch(appendBoulders(results));
      setPage(hasNext ? page + 1 : page); // Set the next page if available
      setHasNextPage(hasNext ? true : false);
    }
    setRefreshing(false);
  };

  const fetchInitialPage = async () => {
    setIsLoading(true);
    dispatch(resetBoulders());
    setPage(INITIAL_PAGE);
    const params = getParams(INITIAL_PAGE);
    if (params) {
      const response = await getBoulderList(params.path, params.queries);
      handleResponse(response.data.results, INITIAL_PAGE, response.data.next);
      const pathParams = { spraywallId: spraywall?.id };
      const circuitResponse = await getCircuitList({ pathParams });
      dispatch(setCircuits(circuitResponse.data));
      setIsLoading(false);
    } else {
      console.error("Failed to assemble parameters for fetching boulder list.");
    }
  };

  useEffect(() => {
    // Fetch the first page when searchQuery, filters, or spraywalls change
    if (canFetch()) {
      fetchInitialPage();
    }
  }, [searchQuery, spraywalls, spraywall, filters]);

  const fetchNextPage = async () => {
    const params = getParams(INITIAL_PAGE);
    if (params) {
      const response = await getBoulderList(params.path, params.queries);
      handleResponse(response.data.results, page, response.data.next);
    } else {
      console.error("Failed to assemble parameters for fetching boulder list.");
    }
  };

  // Call fetchNextPage when the user scrolls to the end of the list
  const handleOnEndReached = () => {
    if (canFetch() && page !== INITIAL_PAGE && hasNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = () => {
    if (canFetch()) {
      setRefreshing(true);
      fetchInitialPage();
    }
  };

  const canFetch = () => {
    if (isLoading || spraywalls.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const getParams = (page: number) => {
    const path = { spraywallId: spraywall.id };
    const queries = {
      searchQuery,
      minGradeIndex: filters.minGradeIndex,
      maxGradeIndex: filters.maxGradeIndex,
      sortBy: filters.sortBy,
      activity: filters.activity,
      status: filters.climbStatus,
      circuit: filters.circuit,
      excludeIds: filters.excludeIds,
      page: page,
    };
    return { path, queries };
  };

  const renderListHeader = () => (
    <ListHeader
      gym={gym}
      setIsModalVisible={setIsModalVisible}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      hasEditPermission={hasEditPermission} // put in component
      navigation={navigation}
    />
  );

  const renderBoulderCard: ListRenderItem<Boulder> = ({ item }) => (
    <BoulderCard boulder={item} />
  );

  const handleEditGymPress = () => {
    setIsModalVisible(false);
    navigation.navigate("GymStack", { screen: "EditGym" });
  };

  const renderEmptyComponent = () => {
    if (isLoading) return;
    return (
      <>
        <EmptyCard message={"No boulders found."} />
        {/* {isErrorBoulderList ? (
          <ErrorCard message={"Error retrieving boulders."} />
        ) : (
          <EmptyCard message={"No boulders found."} />
        )} */}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        {/* Main List */}
        <FlatList
          data={boulders}
          renderItem={renderBoulderCard}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
          ListHeaderComponent={renderListHeader()}
          ListFooterComponent={() => isLoading && <ActivityIndicator />}
          ListEmptyComponent={renderEmptyComponent}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </View>
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={[
          { title: "Edit Gym", onPress: handleEditGymPress },
          {
            title: "Cancel",
            onPress: () => setIsModalVisible(false),
            color: "gray",
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {
    flex: 1,
    rowGap: 10,
  },
});
