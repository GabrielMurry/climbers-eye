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
import { RefreshControl } from "react-native";

const ActivityScreen = ({ navigation }) => {
  const activityAction = {
    published: "orange",
    sent: "green",
    repeated: "s",
    liked: "red",
    bookmarked: "gold",
    added: "blue",
    created: "purple",
    deleted: "black",
  };

  const { user } = useSelector((state) => state.userReducer);
  const { gym } = useSelector((state) => state.gymReducer);

  const [activityData, setActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Add this state
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    fetchActivityData();
  }, [currentPage]);

  const fetchActivityData = async () => {
    console.log("test");
    console.log(currentPage);
    const response = await request(
      "get",
      `user_activity/${user.id}/${gym.id}?page=${currentPage}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      const newData = response.data.activityData;
      setActivityData((prevData) => [...prevData, ...newData]);
      if (newData.length < itemsPerPage) {
        setNoMoreData(true);
      }
      setLoading(false);
      setRefreshing(false);
    }
  };

  const renderActivityCard = ({ item }) => {
    const actionColor = activityAction[item.action];
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
            {item.username === user.name ? "You" : item.username}{" "}
            <Text style={{ fontWeight: "bold", color: actionColor }}>
              {item.action}
            </Text>{" "}
            <Text style={{ fontWeight: "bold" }}>{item.item}</Text>{" "}
            <Text>{item.otherInfo}</Text>{" "}
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

  const handleEndReached = () => {
    if (!loading && !noMoreData && !refreshing) {
      console.log(currentPage);
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true); // Start refreshing animation
    setActivityData([]);
    setNoMoreData(false);
    if (currentPage === 1) {
      fetchActivityData();
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 75,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Activity</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={activityData}
          renderItem={renderActivityCard}
          keyExtractor={(item) => item.id}
          // initialNumToRender={8} // Render the number of items that are initially visible on the screen
          // windowSize={2} // Render an additional number of items to improve scrolling performance
          ListFooterComponent={<View style={{ height: 75 }} />}
          onEndReached={handleEndReached}
          // onEndReachedThreshold={0.5} // Adjust the threshold as needed
          refreshControl={
            // Add this prop for pull-to-refresh
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityScreen;
