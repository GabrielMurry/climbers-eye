import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { request } from "../api/requestMethods";
import { useSelector } from "react-redux";
import Header from "../components/general/Header";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import useCustomHeader from "../hooks/useCustomHeader";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";

const THEME_STYLE = "white";

const ActivityScreen = ({ navigation }) => {
  const activityAction = {
    published: "orange",
    sent: "green", // check
    repeated: "deeppink", // check
    liked: "red", // check
    bookmarked: "gold", // check
    added: "blue", // check
    created: "purple", // check
  };

  const { user } = useSelector((state) => state.userReducer);
  const { gym } = useSelector((state) => state.gymReducer);

  const [activityData, setActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Add this state
  const [isHeaderTitleVisible, setIsHeaderTitleVisible] = useState(false);
  const itemsPerPage = 10; // Number of items per page

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => {},
      headerTitle: () => (
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {isHeaderTitleVisible ? "Activity" : ""}
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <EllipsisHorizontalIcon
            size={35}
            color={"black"}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: THEME_STYLE,
      },
    });
  }, [navigation, isHeaderTitleVisible]);

  useEffect(() => {
    fetchActivityData();
  }, [currentPage]);

  const fetchActivityData = async () => {
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
            {item.username === user.username ? "You" : item.username}{" "}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 20,
          height: 100,
        }}
      >
        <View style={{ width: "75%" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Activity</Text>
        </View>
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
          onScroll={handleScroll}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityScreen;
