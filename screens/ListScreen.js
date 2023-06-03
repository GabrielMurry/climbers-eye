import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import BoulderCard from "../components/BoulderCard";
import { useHeaderHeight } from "@react-navigation/elements"; // grabbing height of header (varies on diff mobile screens)
import { request } from "../api/requestMethods";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

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
  // grabbing height of header
  const height = useHeaderHeight();

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["40%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setEnableBottomSheet(false);
    }
  }, []);

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
    Keyboard.dismiss();
    navigation.navigate("Filter");
  };

  const handleAddBoulderPress = () => {
    Keyboard.dismiss();
    setEnableBottomSheet(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Titles */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{gymName}</Text>
        <Text style={styles.subTitleText}>{spraywallName}</Text>
      </View>
      {/* Boulders */}
      <View style={styles.listContainer}>
        {/* List of Boulders */}
        <FlatList
          contentContainerStyle={styles.bouldersList}
          data={boulders}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToBoulderScreen(item)}>
              <BoulderCard boulder={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          initialNumToRender={7} // Render the number of items that are initially visible on the screen
          windowSize={5} // Render an additional number of items to improve scrolling performance
        />
        {/* Search, filter, add */}
        {/* KeyboardAvoidingView - search bar on bottom disappears when clicked. We want to follow the keyboard up so it remains visible */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={height * 2}
        >
          <View style={styles.searchFilterAddContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                // onChange doesn't exist in react native. use onChangeText
                onChangeText={(value) => setSearchQuery(value)} // in react native, you don't have to do e.target.value
                placeholder="Search (name, setter, or grade)"
                autoComplete="off"
              />
            </View>
            <TouchableOpacity style={styles.filter} onPress={handleFilterPress}>
              <AdjustmentsHorizontalIcon size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBoulder}
              // onPress={() => navigation.navigate("AddBoulder")}
              onPress={handleAddBoulderPress}
            >
              <PlusIcon size={25} color="black" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {enableBottomSheet && (
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={handleSheetChanges}
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24,
            }}
            backgroundStyle={styles.bottomSheetContainer}
            handleIndicatorStyle={{ backgroundColor: "gray" }}
          >
            <View style={styles.bottomSheet}>
              <TouchableOpacity
                style={styles.bottomSheetButton}
                onPress={() =>
                  navigation.navigate("EditBoulder", {
                    image: {
                      uri: defaultImageUri,
                      width: defaultImageWidth,
                      height: defaultImageHeight,
                    },
                  })
                }
              >
                <Text>Default Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomSheetButton}
                onPress={() =>
                  navigation.navigate("Camera", { screen: "EditBoulder" })
                }
              >
                <Text>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomSheetButton}>
                <Text>Upload</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    padding: 10,
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
  },
  bouldersList: {
    rowGap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchFilterAddContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  filter: {
    width: 40,
    backgroundColor: "lightblue",
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addBoulder: {
    width: 40,
    backgroundColor: "lightgreen",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContainer: {
    backgroundColor: "white",
  },
  bottomSheet: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomSheetButton: {
    width: "90%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
});
