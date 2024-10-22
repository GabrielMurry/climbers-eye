import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BoulderCard from "../../components/common/BoulderCard";
import EmptyCard from "../../components/common/EmptyCard";
import ErrorCard from "../../components/common/ErrorCard";
import { useSelector, useDispatch } from "react-redux";
import ModalOptions from "../../components/custom/ModalOptions";
import ListHeader from "../../components/home/ListHeader";
import {
  appendBoulders,
  resetBoulders,
} from "../../redux/features/boulder/boulderSlice";
import { getBoulderList } from "../../services/boulder";
import { useFetch } from "../../hooks/useFetch";
import { getCircuitList } from "../../services/circuit";
import { setCircuits } from "../../redux/features/circuit/circuitSlice";

const THEME_STYLE = "white";
const INITIAL_PAGE = 1;

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );
  const filters = useSelector((state) => state.filter);
  const { boulders } = useSelector((state) => state.boulder);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const hasEditPermission = true;

  const [fetchBoulderList, isLoadingBoulderList, isErrorBoulderList] =
    useFetch(getBoulderList);

  const [fetchCircuitList, isLoadingCircuitList, isErrorCircuitList] =
    useFetch(getCircuitList);

  const handleResponse = (response, page) => {
    if (response?.data.results.length === 0) {
      setHasNextPage(false);
    } else {
      dispatch(appendBoulders(response.data.results));
      setPage(response.data.next ? page + 1 : page); // Set the next page if available
      setHasNextPage(response.data.next ? true : false);
    }
    setRefreshing(false);
  };

  const fetchInitialPage = async () => {
    dispatch(resetBoulders());
    setPage(INITIAL_PAGE);
    const response = await fetchBoulderList(getParams(INITIAL_PAGE));
    handleResponse(response, INITIAL_PAGE);
    const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
    const circuitResponse = await fetchCircuitList({ pathParams });
    dispatch(setCircuits(circuitResponse.data));
  };

  useEffect(() => {
    // Fetch the first page when searchQuery, filters, or spraywalls change
    if (canFetch()) {
      fetchInitialPage();
    }
  }, [searchQuery, spraywalls, spraywallIndex, filters]);

  const fetchNextPage = async () => {
    const response = await fetchBoulderList(getParams(page));
    handleResponse(response, page);
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
    if (isLoadingBoulderList || spraywalls.length === 0 || isErrorBoulderList) {
      return false;
    } else {
      return true;
    }
  };

  const getParams = (page) => {
    const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
    const queryParams = {
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
    return { pathParams, queryParams };
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

  const renderBoulderCard = ({ item }) => (
    <BoulderCard boulder={item} navigation={navigation} />
  );

  const handleEditGymPress = () => {
    setIsModalVisible(false);
    navigation.navigate("GymStack", { screen: "EditGym" });
  };

  const renderEmptyComponent = () => {
    if (isLoadingBoulderList) return;
    return (
      <>
        {isErrorBoulderList ? (
          <ErrorCard message={"Error retrieving boulders."} />
        ) : (
          <EmptyCard message={"No boulders found."} />
        )}
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
          ListFooterComponent={() =>
            isLoadingBoulderList && <ActivityIndicator />
          }
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
