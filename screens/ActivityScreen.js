import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { request } from "../api/requestMethods";
import { useSelector } from "react-redux";
import Header from "../components/general/Header";
import { useFocusEffect } from "@react-navigation/native";

const ActivityScreen = ({ navigation }) => {
  const activityVerb = {
    published: "orange",
    sent: "green",
    repeated: "s",
    liked: "red",
    bookmarked: "yellow",
    added: "blue",
    created: "purple",
    deleted: "black",
  };

  const { user } = useSelector((state) => state.userReducer);
  const { gym } = useSelector((state) => state.gymReducer);

  const [activityData, setActivityData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchActivityData();
    }, [])
  );

  const fetchActivityData = async () => {
    const response = await request("get", `user_activity/${user.id}/${gym.id}`);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setActivityData(response.data.activityData);
    }
  };

  const renderActivityCard = ({ item }) => {
    console.log(item.grade);
    const verbColor = activityVerb[item.verb];
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          borderBottomWidth: 1,
          borderColor: "lightgray",
          height: 75,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            marginLeft: 10,
          }}
        >
          <Text>{item.date}</Text>
          <Text>
            You{" "}
            <Text style={{ fontWeight: "bold", color: verbColor }}>
              {item.verb}
            </Text>{" "}
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text> -{" "}
            {item.grade}
          </Text>
          <Text>
            - {item.spraywallName} at {gym.name}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{item.dateStamp}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: 75,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Activity</Text>
      </View>
      <FlatList
        //   ref={flatListRef}
        //   contentContainerStyle={styles.bouldersList}
        data={activityData}
        renderItem={renderActivityCard}
        keyExtractor={(item) => item.id}
        initialNumToRender={8} // Render the number of items that are initially visible on the screen
        windowSize={2} // Render an additional number of items to improve scrolling performance
        ListFooterComponent={<View style={{ height: 75 }} />}
        //   onScroll={handleScroll}
        //   ListEmptyComponent={renderEmptyComponent}
        //   keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
      />
    </SafeAreaView>
  );
};

export default ActivityScreen;
