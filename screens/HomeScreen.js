import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // similar to useEffect. We want to set navigate screen options (ex. no header title)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "lightblue",
        rowGap: 10,
      }}
    >
      <View style={styles.titleContainer}>
        {/* Titles */}
        <Text style={styles.titleText}>The Boulder Field</Text>
        <Text style={styles.subTitleText}>Spray Wall 1</Text>
      </View>
      {/* Default Image */}
      <View style={styles.defaultImageContainer}>
        <Image
          source={require("../assets/rockwall.jpg")}
          resizeMode="contain"
          style={styles.defaultImage}
        />
      </View>
      {/* Search, Filter, Add, and find Boulders */}
      <View style={styles.findBouldersContainer}>
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
          <View style={styles.filter}>
            <Text>Filter</Text>
          </View>
          <View style={styles.addBoulder}>
            <Text>Add</Text>
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.bouldersList}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.boulder}
              onPress={() =>
                navigation.navigate("Boulder", {
                  itemId: item,
                  otherParam: "anything you want here",
                })
              }
            >
              <Text>Boulder {item}</Text>
            </TouchableOpacity>
          )}
          // keyExtractor={(item) => item.job_id}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  titleText: {
    fontSize: 30,
  },
  subTitleText: {
    fontSize: 24,
  },
  defaultImageContainer: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  defaultImage: {
    width: "100%",
    height: "100%",
  },
  findBouldersContainer: {
    flex: 1,
    backgroundColor: "yellow",
    paddingHorizontal: 10,
    rowGap: 10,
  },
  searchFilterAddContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "white",
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
    backgroundColor: "red",
    marginRight: 10,
    borderRadius: 10,
  },
  addBoulder: {
    width: 40,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  bouldersList: {
    rowGap: 10,
  },
  boulder: {
    width: "100%",
    height: 60,
    backgroundColor: "lightgreen",
  },
});
