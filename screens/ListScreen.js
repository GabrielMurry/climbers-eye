import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CameraIcon,
  ArrowUpOnSquareIcon,
} from "react-native-heroicons/outline";
import BoulderCard from "../components/listComponents/BoulderCard";
import { request } from "../api/requestMethods";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ListScreen = ({ navigation }) => {
  const { userID } = useSelector((state) => state.userReducer);
  const { gymName } = useSelector((state) => state.gymReducer);
  const {
    spraywallName,
    spraywallID,
    defaultImageUri,
    defaultImageWidth,
    defaultImageHeight,
  } = useSelector((state) => state.spraywallReducer);

  const [searchQuery, setSearchQuery] = useState("");
  const [boulders, setBoulders] = useState([]);
  const [enableBottomSheet, setEnableBottomSheet] = useState(false);
  const [isHeaderTitleVisible, setIsHeaderTitleVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {isHeaderTitleVisible ? spraywallName : null}
        </Text>
      ),
    });
  }, [isHeaderTitleVisible]);

  // This event will be triggered when the screen gains focus (i.e., when you navigate back to it).
  useFocusEffect(
    useCallback(() => {
      // reset search query and fetch all data upon every new focus on screen - a boulder may have been updated
      setSearchQuery("");
      fetchAllData();
    }, [])
  );

  useEffect(() => {
    // When we mount component, nothing is in our searchQuery so we do nothing
    if (searchQuery !== "") {
      fetchSearchQueryData();
    } else {
      fetchAllData(); // when we first render screen, fetchAllData is called twice. Here and on useFocusEffect. Fix?
    }
  }, [searchQuery]);

  const fetchAllData = async () => {
    const response = await request("get", `list/${spraywallID}/${userID}`);
    if (response.status !== 200) {
      console.log(response.status);
    }
    if (response.data) {
      setBoulders(response.data);
    }
  };

  const fetchSearchQueryData = async () => {
    const response = await request(
      "get",
      `query_list/${spraywallID}/${userID}?search=${searchQuery}`
    );
    if (response.status !== 200) {
      console.log(response.status);
    }
    if (response.data) {
      setBoulders(response.data);
    }
  };

  // Optimization --> use the React.useCallback hook to memoize the navigation function and prevent unnecessary re-creation of the function on every render.
  // Providing navigation as a dependency, the navigateToBoulder function will only be re-created when the navigation prop changes, ensuring better performance.
  const navigateToBoulderScreen = useCallback(
    (item) => {
      navigation.navigate("Boulder", { boulder: item });
    },
    [navigation]
  );

  const handleFilterPress = () => {
    navigation.navigate("Filter");
  };

  const handleAddNewBoulderPress = () => {
    setEnableBottomSheet(true);
  };

  const renderBoulderCards = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigateToBoulderScreen(item)}>
        <BoulderCard boulder={item} />
      </TouchableOpacity>
    );
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 70 && !isHeaderTitleVisible) {
      setIsHeaderTitleVisible(true);
    } else if (scrollY <= 70 && isHeaderTitleVisible) {
      setIsHeaderTitleVisible(false);
    }
  };

  const headerComponent = (
    <>
      <View
        style={{
          height: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleText}>{gymName}</Text>
        <Text style={styles.subTitleText}>{spraywallName}</Text>
      </View>
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          // onChange doesn't exist in react native. use onChangeText
          onChangeText={(value) => setSearchQuery(value)} // in react native, you don't have to do e.target.value
          placeholder="Search (name, setter, or grade)"
          autoComplete="off"
        />
      </View>
    </>
  );

  const handleCameraPressed = () => {
    setEnableBottomSheet(false);
    navigation.navigate("Camera", { screen: "EditBoulder" });
  };

  const handleDefaultImagePressed = () => {
    setEnableBottomSheet(false);
    navigation.navigate("EditBoulder", {
      image: {
        uri: defaultImageUri,
        width: defaultImageWidth,
        height: defaultImageHeight,
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.listContainer}>
        {/* List of Boulders */}
        <FlatList
          contentContainerStyle={styles.bouldersList}
          data={boulders}
          renderItem={renderBoulderCards}
          keyExtractor={(item) => item.id}
          initialNumToRender={7} // Render the number of items that are initially visible on the screen
          windowSize={3} // Render an additional number of items to improve scrolling performance
          onScroll={handleScroll}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={<View style={{ height: 90 }} />}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <AdjustmentsHorizontalIcon size={30} color={"blue"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addNewBoulderButton}
          onPress={handleAddNewBoulderPress}
        >
          <PlusIcon size={30} color={"green"} />
        </TouchableOpacity>
      </View>
      <Modal
        visible={enableBottomSheet}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setEnableBottomSheet(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setEnableBottomSheet(false)}
        >
          <View style={styles.modalContent}>
            {/* Add your modal content here */}
            <TouchableOpacity
              onPress={() => setEnableBottomSheet(false)}
              style={styles.uploadButton}
            >
              <ArrowUpOnSquareIcon size={30} color={"green"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleCameraPressed}
            >
              <CameraIcon size={30} color={"green"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.defaultImageButton}
              onPress={handleDefaultImagePressed}
            >
              <PlusIcon size={30} color={"green"} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
  },
  uploadButton: {
    padding: 15,
    backgroundColor: "white",
    position: "absolute",
    borderRadius: "100%",
    bottom: 170,
    right: 25,
  },
  cameraButton: {
    padding: 15,
    backgroundColor: "white",
    position: "absolute",
    borderRadius: "100%",
    bottom: 100,
    right: 25,
  },
  defaultImageButton: {
    padding: 15,
    backgroundColor: "white",
    position: "absolute",
    borderRadius: "100%",
    bottom: 30,
    right: 25,
  },
  titleText: {
    fontSize: 30,
  },
  subTitleText: {
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
    rowGap: 10,
    paddingHorizontal: 10,
  },
  bouldersList: {
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
  filterButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: "100%",
    position: "absolute",
    bottom: 30,
    left: 25,
    // adding shadow to add new circuit button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  addNewBoulderButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: "100%",
    position: "absolute",
    bottom: 30,
    right: 25,
    // adding shadow to add new circuit button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
});
