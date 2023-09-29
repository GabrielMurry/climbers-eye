import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  SectionList,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BoulderCard from "../../../components/listComponents/BoulderCard";
import LogbookBoulderCard from "../../../components/profileComponents/LogbookBoulderCard";
import { request } from "../../../api/requestMethods";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  boulderBarChartDataTemplate,
  boulderGrades,
} from "../../../utils/constants/boulderConstants";
import useCustomHeader from "../../../hooks/useCustomHeader";
import BoulderBarChart from "../../../components/boulderStatsComponents/BoulderBarChart";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import ModalOptions from "../../../components/ModalOptions";

const ProfileBoulderSectionScreen = ({ route, navigation }) => {
  const { section } = route.params;
  const { user } = useSelector((state) => state.userReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );

  const [boulders, setBoulders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [boulderBarChartData, setBoulderBarChartData] = useState(
    boulderBarChartDataTemplate
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteCircuitPress = () => {
    Alert.alert(
      "Delete Circuit",
      `Are you sure you want to delete "${route.params.circuit.name}"?`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const response = await request(
              "delete",
              `delete_circuit/${user.id}/${spraywalls[spraywallIndex].id}/${route.params.circuit.id}`
            );
            if (response.status !== 200) {
              console.log(response.status);
              return;
            }
            navigation.goBack();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const optionsData = [
    { title: "Delete Circuit", onPress: deleteCircuitPress, color: "red" },
    {
      title: "Cancel",
      onPress: () => setIsModalVisible(false),
      color: "gray",
    },
  ];

  const headerRight = (
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
      <EllipsisHorizontalIcon size={35} color={"black"} />
    </TouchableOpacity>
  );

  useCustomHeader({
    navigation,
    title: title,
    headerRight: section === "Circuits" ? headerRight : null,
  });

  // Add an event listener to detect changes in keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    // Clean up the event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // This event will be triggered when the screen gains focus (i.e., when you navigate back to it).
  useFocusEffect(
    useCallback(() => {
      if (section === "Circuits") {
        console.log(route.params.circuit);
        setBoulders(route.params.circuit.boulderData);
        setTitle(route.params.circuit.name);
      } else {
        fetchLogbookData();
        setTitle(section);
      }
    }, [])
  );

  const fetchLogbookData = async () => {
    setIsLoading(true);
    const response = await request(
      "get",
      `profile_boulder_section_list/${spraywalls[spraywallIndex].id}/${user.id}?section=${section}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      if (section === "Logbook") {
        setBoulders(response.data.section);
        setBoulderBarChartData(response.data.bouldersBarChartData);
      } else {
        setBoulders(response.data.section);
      }
      setIsLoading(false);
    }
  };

  // Optimization --> use the React.useCallback hook to memoize the navigation function and prevent unnecessary re-creation of the function on every render.
  // Providing navigation as a dependency, the navigateToBoulder function will only be re-created when the navigation prop changes, ensuring better performance.
  const navigateToBoulderScreen = useCallback(
    (item) => {
      navigation.navigate("Boulder", {
        boulder: item,
        fromScreen: "ProfileBoulderSection",
        toScreen: "ProfileBoulderSection",
      });
    },
    [navigation]
  );

  const renderBoulderCards = ({ item }) => {
    return (
      <>
        <TouchableOpacity onPress={() => navigateToBoulderScreen(item)}>
          <BoulderCard boulder={item} />
        </TouchableOpacity>
      </>
    );
  };

  const renderLogbookBoulderCards = ({ item }) => {
    return (
      <>
        <TouchableOpacity onPress={() => navigateToBoulderScreen(item)}>
          <LogbookBoulderCard boulder={item} />
        </TouchableOpacity>
      </>
    );
  };

  const renderSectionHeader = ({ section }) => {
    return (
      <View
        style={{
          backgroundColor: "rgba(235, 235, 235, 1)",
          height: 35,
          paddingHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Session {section.title}</Text>
        <Text style={{ fontSize: 12 }}>{section.date}</Text>
      </View>
    );
  };

  const renderHeaderChart = () => {
    return <BoulderBarChart data={boulderBarChartData} />;
  };

  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? <ActivityIndicator /> : <Text>No Boulders Found</Text>}
      </View>
    );
  };

  const renderFooterComponent = () => {
    return <View style={{ height: 50 }} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.listContainer}>
        {/* List of Boulders */}
        {section === "Logbook" ? (
          <SectionList
            sections={boulders}
            keyExtractor={(item) => item.uuid || item.id}
            renderItem={renderLogbookBoulderCards}
            renderSectionHeader={renderSectionHeader}
            ListHeaderComponent={renderHeaderChart}
            ListFooterComponent={renderFooterComponent}
          />
        ) : (
          <FlatList
            data={boulders}
            renderItem={renderBoulderCards}
            keyExtractor={(item) => item.uuid || item.id}
            initialNumToRender={8} // Render the number of items that are initially visible on the screen
            windowSize={2} // Render an additional number of items to improve scrolling performance
            ListFooterComponent={renderFooterComponent}
            ListEmptyComponent={renderEmptyComponent}
            keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
          />
        )}
      </View>
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      />
    </View>
  );
};

export default ProfileBoulderSectionScreen;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
  },
  subTitleText: {
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
    padding: 10,
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
  addNewBoulderButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: "100%",
    position: "absolute",
    bottom: 35,
    right: 20,
    // adding shadow to add new circuit button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  SearchInputAndCancelContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  SearchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(229, 228, 226)",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  SearchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 5,
    backgroundColor: "rgb(229, 228, 226)",
    borderRadius: 10,
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  resetSearchQuery: {
    backgroundColor: "gray",
    width: 18,
    height: 18,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
