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
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import BoulderCard from "../components/BoulderCard";
import { useHeaderHeight } from "@react-navigation/elements"; // grabbing height of header (varies on diff mobile screens)
import { request } from "../api/requestMethods";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ListScreen = ({ navigation }) => {
  const { userID } = useSelector((state) => state.userReducer);
  const { gymName } = useSelector((state) => state.gymReducer);
  const { spraywallName, spraywallID } = useSelector(
    (state) => state.spraywallReducer
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [boulders, setBoulders] = useState([]);
  // grabbing height of header
  const height = useHeaderHeight();

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
            <TouchableOpacity
              onPress={() => navigation.navigate("Boulder", { boulder: item })}
            >
              <BoulderCard boulder={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
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
              />
            </View>
            <TouchableOpacity style={styles.filter}>
              <AdjustmentsHorizontalIcon size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBoulder}
              onPress={() => navigation.navigate("AddBoulder")}
            >
              <PlusIcon size={25} color="black" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
  },
  subTitleText: {
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fffeea",
    paddingHorizontal: 10,
    paddingVertical: 10,
    rowGap: 10,
  },
  bouldersList: {
    rowGap: 10,
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
});
