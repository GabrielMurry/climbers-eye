import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
  SafeAreaView,
  Dimensions,
  Modal,
} from "react-native";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import BoulderCard from "../components/listComponents/BoulderCard";
import { request } from "../api/requestMethods";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { boulderGrades } from "../utils/constants/boulderConstants";
import { setSpraywallIndex } from "../redux/actions";
import Carousel from "react-native-reanimated-carousel";
import { BlurView } from "expo-blur";
import SearchInput from "../components/listComponents/SearchInput";

const SCREEN_WIDTH = Dimensions.get("window").width;
const THEME_STYLE = "white";

const ListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { gym } = useSelector((state) => state.gymReducer);
  const {
    spraywalls,
    spraywallIndex,
    filterMinGradeIndex,
    filterMaxGradeIndex,
    filterSortBy,
    filterCircuits,
    filterClimbType,
    filterStatus,
  } = useSelector((state) => state.spraywallReducer);

  const [searchQuery, setSearchQuery] = useState("");
  const [boulders, setBoulders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSpraywallsVisible, setIsModalSpraywallsVisible] =
    useState(false);
  const [isHeaderImageVisible, setIsHeaderImageVisible] = useState(false);
  const [hasFilters, setHasFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHeaderTitleVisible, setIsHeaderTitleVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [hasNoBoulders, setHasNoBoulders] = useState(false);

  const flatListRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => (
        <SearchInput
          isSearchVisible={isSearchVisible}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      ),
      headerTitle: () => (
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {isHeaderTitleVisible && !isSearchVisible ? gym.name : ""}
        </Text>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsSearchVisible(!isSearchVisible)}
          >
            {isSearchVisible ? (
              <XMarkIcon size={25} color={"black"} />
            ) : (
              <MagnifyingGlassIcon size={25} color={"black"} />
            )}
          </TouchableOpacity>
          <Pressable
            style={{
              backgroundColor: hasFilters ? "black" : null,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={handleFilterPress}
          >
            <AdjustmentsHorizontalIcon
              size={30}
              color={hasFilters ? "white" : "black"}
            />
          </Pressable>
        </View>
      ),
      headerStyle: {
        backgroundColor: THEME_STYLE,
      },
    });
  }, [
    navigation,
    isHeaderTitleVisible,
    isSearchVisible,
    hasFilters,
    searchQuery,
  ]);

  const areFiltersEnabled = () => {
    if (
      filterMinGradeIndex !== 0 ||
      filterMaxGradeIndex !== boulderGrades.length - 1 ||
      filterSortBy !== "popular" ||
      filterCircuits.length !== 0 ||
      filterClimbType !== "boulder" ||
      filterStatus !== "all"
    ) {
      return true;
    }
    return false;
  };

  // This event will be triggered when the screen gains focus (i.e., when you navigate back to it).
  useFocusEffect(
    useCallback(() => {
      // reset search query and fetch all data upon every new focus on screen - a boulder may have been updated
      // setSearchQuery("");
      fetchAllData();
      setHasFilters(areFiltersEnabled);
    }, [
      filterMinGradeIndex,
      filterMaxGradeIndex,
      filterSortBy,
      filterCircuits,
      filterClimbType,
      filterStatus,
      searchQuery,
      spraywallIndex,
      spraywalls,
    ])
  );

  const fetchAllData = async () => {
    setIsLoading(true);
    // extract only the id property from each object in the filterCircuits array
    // serialize the array into a string representation, such as JSON or comma-separated values.
    const circuitIds = filterCircuits.map((circuit) => circuit.id);
    const encodedCircuitIds = encodeURIComponent(JSON.stringify(circuitIds));
    const response = await request(
      "get",
      `list/${spraywalls[spraywallIndex].id}/${user.id}?search=${searchQuery}&minGradeIndex=${filterMinGradeIndex}&maxGradeIndex=${filterMaxGradeIndex}&sortBy=${filterSortBy}&circuits=${encodedCircuitIds}&climbType=${filterClimbType}&status=${filterStatus}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      if (response.data.length === 0) {
        response.data.push({ id: "empty" });
      }
      setBoulders([
        { id: "spraywalls", spraywalls: spraywalls },
        ...response.data,
      ]);
      setIsLoading(false);
    }
  };

  // Optimization --> use the React.useCallback hook to memoize the navigation function and prevent unnecessary re-creation of the function on every render.
  // Providing navigation as a dependency, the navigateToBoulder function will only be re-created when the navigation prop changes, ensuring better performance.
  const navigateToBoulderScreen = useCallback(
    (item) => {
      navigation.navigate("Boulder", {
        boulder: item,
        fromScreen: "Home",
        toScreen: "Home",
      });
    },
    [navigation]
  );

  const handleFilterPress = () => {
    navigation.navigate("Filter");
  };

  const renderBoulderCards = ({ item, index }) => {
    if (item.id === "empty") {
      return (
        <View
          key={item.id}
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>No boulders found</Text>
        </View>
      );
    }
    if (index === 0) {
      return (
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            height: 150,
            justifyContent: "space-between",
            gap: 10,
          }}
          key={item.id}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }} numberOfLines={2}>
            {gym.name}
          </Text>
          <FlatList
            data={item.spraywalls}
            renderItem={({ item, index }) => (
              <Pressable
                style={{
                  height: "100%",
                  aspectRatio: 1,
                  backgroundColor: index === spraywallIndex ? "black" : null,
                  padding: 5,
                  borderRadius: 5,
                }}
                key={item.id}
                onPress={() => dispatch(setSpraywallIndex(index))}
              >
                <Image
                  source={{ uri: item.url }}
                  style={{ width: "100%", height: "100%", borderRadius: 2 }}
                />
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10 }}
            horizontal
          />
        </View>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => navigateToBoulderScreen(item)}
        key={item.id}
        style={{ paddingHorizontal: 10 }}
      >
        {index === 1 ? (
          <View style={{ backgroundColor: "lightgray", height: 1 }} />
        ) : null}
        <BoulderCard boulder={item} />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }} key={item.id}>
      <Image
        source={{ uri: item.url }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          width: 100,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          width: "50%",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {item.name}
        </Text>
      </View>
    </View>
  );

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const threshold = 50; // Change this value to your desired threshold

    if (offsetY >= threshold && !isHeaderTitleVisible) {
      setIsHeaderTitleVisible(true);
    } else if (offsetY < threshold && isHeaderTitleVisible) {
      setIsHeaderTitleVisible(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.listContainer}>
        {/* List of Boulders */}
        <FlatList
          ref={flatListRef}
          data={boulders}
          renderItem={renderBoulderCards}
          keyExtractor={(item) => item.id}
          initialNumToRender={8} // Render the number of items that are initially visible on the screen
          windowSize={2} // Render an additional number of items to improve scrolling performance
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
        />
      </View>
      <Modal
        visible={isModalSpraywallsVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalSpraywallsVisible(false)}
      >
        <View style={styles.modalContainer} activeOpacity={1}>
          <BlurView style={styles.modalContent} intensity={25}>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => setIsModalSpraywallsVisible(false)}
            />
            {/* Add modal content here */}
            <View style={styles.displayContainer}>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  borderRadius: 20,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Carousel
                  loop={false}
                  width={SCREEN_WIDTH}
                  height={SCREEN_WIDTH - 125}
                  data={spraywalls}
                  defaultIndex={spraywallIndex}
                  keyExtractor={(item) => item.id}
                  scrollAnimationDuration={250}
                  onSnapToItem={(index) => dispatch(setSpraywallIndex(index))}
                  renderItem={renderItem}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                  }}
                />
              </View>
            </View>
          </BlurView>
        </View>
      </Modal>
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
