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
import React, { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import BoulderCard from "../components/BoulderCard";
import { useHeaderHeight } from "@react-navigation/elements"; // grabbing height of header (varies on diff mobile screens)

DATA = [
  {
    title: "My First Rodeo",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 1,
  },
  {
    title: "Foxey lady",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 2,
  },
  {
    title: "The Chair",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 3,
  },
  {
    title: "Protector of the Skinny Dog",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 4,
  },
  {
    title: "Purple People Eater",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 5,
  },
  {
    title: "drizzle frizzle",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 6,
  },
  {
    title: "Lovin' Touchin' Squeezin'",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 7,
  },
  {
    title: "Goo Lagoon",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 8,
  },
  {
    title: "nails in my candy",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 9,
  },
  {
    title: "Pillars of Creation",
    setter: "Gabriel",
    FA: "Gabriel",
    sends: 1234,
    grade: "7a/V6",
    stars: 3,
    id: 10,
  },
];

const ListScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // grabbing height of header
  const height = useHeaderHeight();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Titles */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>The Boulder Field</Text>
        <Text style={styles.subTitleText}>Spray Wall 1</Text>
      </View>
      {/* Boulders */}
      <View style={styles.listContainer}>
        {/* List of Boulders */}
        <FlatList
          contentContainerStyle={styles.bouldersList}
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Boulder", {
                  itemTitle: item.title,
                  otherParam: "anything you want here",
                })
              }
            >
              <BoulderCard
                title={item.title}
                setter={item.setter}
                FA={item.FA}
                sends={item.sends}
                grade={item.grade}
                stars={item.stars}
              />
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
                value={searchTerm}
                // onChange doesn't exist in react native. use onChangeText
                onChangeText={(text) => setSearchTerm(text)} // in react native, you don't have to do e.target.value
                placeholder="Search Boulders"
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
