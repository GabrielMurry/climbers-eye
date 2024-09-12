import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BoulderCard from "../../components/list/BoulderCard";
import EmptyCard from "../../components/list/EmptyCard";
import { request } from "../../api/requestMethods";
import { useSelector, useDispatch } from "react-redux";
import {
  setSpraywallIndex,
  appendBoulders,
  resetBoulders,
  bouldersError,
} from "../../redux/actions";
import ModalOptions from "../../components/custom/ModalOptions";
import ListHeader from "../../components/list/ListHeader";

const THEME_STYLE = "white";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );

  console.log(user);

  const {
    filterMinGradeIndex,
    filterMaxGradeIndex,
    filterActivity,
    filterSortBy,
    filterCircuits,
    filterClimbType,
    filterStatus,
  } = useSelector((state) => state.filterReducer);
  const { boulders } = useSelector((state) => state.boulderReducer);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasFilters, setHasFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const hasEditPermission = true;

  const onRefresh = useCallback(() => {
    dispatch(resetBoulders());
    setRefreshing(true);
    setPage(1);
    fetchListData(1);
  }, []);

  useEffect(() => {
    dispatch(resetBoulders());
    setPage(1);
    fetchListData(1);
  }, [
    searchQuery,
    spraywalls,
    spraywallIndex,
    filterMinGradeIndex,
    filterMaxGradeIndex,
    filterSortBy,
    filterActivity,
    filterStatus,
    filterCircuits,
  ]);

  const logPerformance = (startTime, operation) => {
    var endTime = performance.now();
    console.log(`${operation} took ${endTime - startTime} milliseconds.`);
  };

  const handleResponse = (res) => {
    if (res.results.length === 0) {
      dispatch(bouldersError({ id: "empty", message: "No boulders found." }));
      setPage(null);
      return;
    }
    dispatch(appendBoulders(res.results));
    setPage((prev) => (res.next ? prev + 1 : null));
  };

  const handleError = () => {
    dispatch(
      bouldersError({ id: "error", message: "Error retrieving boulders." })
    );
    setPage(null);
  };

  const fetchListData = async (page) => {
    var startTime = performance.now();
    if (isLoading || page === null || spraywalls.length === 0) {
      return;
    }

    setIsLoading(true);

    const response = await request(
      "get",
      `api/list/${
        spraywalls[spraywallIndex].id
      }?search=${searchQuery}&grade_min=${filterMinGradeIndex}&grade_max=${filterMaxGradeIndex}&sort=${filterSortBy}&activity=${filterActivity}&status=${filterStatus}&circuits=${filterCircuits.map(
        (circuit) => circuit.id
      )}&page=${page}`
    );
    if (response) {
      handleResponse(response.data);
    } else {
      handleError();
    }
    setRefreshing(false);
    setIsLoading(false);
    logPerformance(startTime, "fetchListData");
  };

  const navigateToBoulderScreen = (item) => {
    navigation.navigate("Boulder-Home", {
      boulderId: item.id,
      fromScreen: "Home",
      toScreen: "Home",
    });
  };

  const handleFilterPress = () => {
    navigation.navigate("FilterHomeList");
  };

  const handleSpraywallPress = ({ index }) => {
    dispatch(setSpraywallIndex(index));
  };

  const renderListHeader = useCallback(
    () => (
      <ListHeader
        gym={gym}
        setIsModalVisible={setIsModalVisible}
        spraywalls={spraywalls}
        handleSpraywallPress={handleSpraywallPress}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleFilterPress={handleFilterPress}
        hasFilters={hasFilters}
        hasEditPermission={hasEditPermission}
        navigation={navigation}
      />
    ),
    [
      gym,
      setIsModalVisible,
      spraywalls,
      handleSpraywallPress,
      handleFilterPress,
      hasFilters,
    ]
  );

  const renderBoulderCard = ({ item, index }) => {
    if (typeof item.id === "number") {
      return (
        <BoulderCard
          boulder={item}
          navigate={() => navigateToBoulderScreen(item, index)}
        />
      );
    }
    return <EmptyCard message={item.message} />;
  };

  const handleEditGymPress = () => {
    setIsModalVisible(false);
    navigation.navigate("EditGym");
  };

  const optionsData = [
    { title: "Edit Gym", onPress: handleEditGymPress },
    { title: "Cancel", onPress: () => setIsModalVisible(false), color: "gray" },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.listContainer}>
        {/* Main List */}
        <FlatList
          data={boulders}
          renderItem={renderBoulderCard}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
          onEndReached={() => fetchListData(page)}
          onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
          ListHeaderComponent={renderListHeader()}
          ListFooterComponent={() => isLoading && <ActivityIndicator />}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </View>
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    rowGap: 10,
  },
});
