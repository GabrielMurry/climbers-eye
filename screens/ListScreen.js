import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BoulderCard from "../components/listComponents/BoulderCard";
import EmptyCard from "../components/listComponents/EmptyCard";
import { request } from "../api/requestMethods";
import { useSelector, useDispatch } from "react-redux";
import {
  setSpraywallIndex,
  appendBoulders,
  resetBoulders,
  bouldersError,
} from "../redux/actions";
import ModalOptions from "../components/ModalOptions";
import ListHeader from "../components/listComponents/ListHeader";

const THEME_STYLE = "white";

const ListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const {
    spraywalls,
    spraywallIndex,
    filterMinGradeIndex,
    filterMaxGradeIndex,
    filterActivity,
    filterSortBy,
    filterCircuits,
    filterClimbType,
    filterStatus,
  } = useSelector((state) => state.spraywallReducer);
  const { boulders } = useSelector((state) => state.boulderReducer);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasFilters, setHasFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

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

    if (isLoading || page === null) {
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
    navigation.navigate("Filter");
  };

  const handleSpraywallPress = ({ index }) => {
    // setIsLoading(true);
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
          keyExtractor={(item) =>
            item.uuid ? item.uuid.toString() : item.id.toString()
          }
          keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
          onEndReached={() => fetchListData(page)}
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

export default ListScreen;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subTitleText: {
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
    rowGap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 35,
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 5,
  },
  filterButton: (hasFilters) => ({
    padding: 15,
    backgroundColor: hasFilters ? "rgb(0, 122, 255)" : "white",
    borderRadius: "100%",
    position: "absolute",
    bottom: 25,
    left: 20,
    // adding shadow to add new circuit button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  }),
  addNewBoulderButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: "100%",
    position: "absolute",
    bottom: 10,
    right: 20,
    // adding shadow to add new circuit button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
  },
  displayContainer: {
    width: "100%",
    height: 325,
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
  },
  columnContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  buttonTextSmall: {
    width: 125,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonTextBig: {
    width: 125,
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonContainerIcon: {
    width: "100%",
    alignItems: "center",
  },
  buttonIconSmall: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    // shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  buttonIconBig: {
    width: 60,
    height: 60,
    backgroundColor: "rgb(0, 122, 255)",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    // shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
});
