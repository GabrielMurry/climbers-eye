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
import React, { useCallback, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import BoulderCard from "../components/BoulderCard";
import { useHeaderHeight } from "@react-navigation/elements"; // grabbing height of header (varies on diff mobile screens)
import { request } from "../api/requestMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const ListScreen = ({ route, navigation }) => {
  const { gymName, spraywall, defaultImage } = route.params;

  const [searchQuery, setSearchQuery] = useState("");
  const [boulders, setBoulders] = useState([]);
  // grabbing height of header
  const height = useHeaderHeight();

  // This event will be triggered when the screen gains focus (i.e., when you navigate back to it).
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const response = await request("get", `list/${spraywall.id}/${userId}`);
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
        <Text style={styles.subTitleText}>{spraywall.name}</Text>
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
                onChangeText={(text) => setSearchQuery(text)} // in react native, you don't have to do e.target.value
                placeholder="Search Boulders"
              />
            </View>
            <TouchableOpacity style={styles.filter}>
              <AdjustmentsHorizontalIcon size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBoulder}
              onPress={() =>
                navigation.navigate("AddBoulder", {
                  spraywall,
                  defaultImage,
                })
              }
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
