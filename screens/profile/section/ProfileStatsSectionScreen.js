import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useCustomHeader from "../../../hooks/useCustomHeader";
import { useFocusEffect } from "@react-navigation/native";
import { request } from "../../../api/requestMethods";
import { useSelector } from "react-redux";
import { boulderBarChartDataTemplate } from "../../../utils/constants/boulderConstants";
import BoulderBarChart from "../../../components/boulderStatsComponents/BoulderBarChart";
import { FlatList } from "react-native";
import BoulderCard from "../../../components/listComponents/BoulderCard";

const ProfileStatsSectionScreen = ({ route, navigation }) => {
  const { section } = route.params;

  const { user } = useSelector((state) => state.userReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );

  const [boulderBarChartData, setBoulderBarChartData] = useState(
    boulderBarChartDataTemplate
  );
  const [boulders, setBoulders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useCustomHeader({
    navigation,
    title: section,
  });

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    const response = await request(
      "get",
      `profile_stats_section/${user.id}/${spraywalls[spraywallIndex].id}?section=${section}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      // setBoulderBarChartData(response.data.bouldersBarChartData);
      setBoulders(response.data);
    }
  };

  // Optimization --> use the React.useCallback hook to memoize the navigation function and prevent unnecessary re-creation of the function on every render.
  // Providing navigation as a dependency, the navigateToBoulder function will only be re-created when the navigation prop changes, ensuring better performance.
  const navigateToBoulderScreen = useCallback(
    (item) => {
      navigation.navigate("Boulder", {
        boulder: item,
        fromScreen: "ProfileStatsSection",
        toScreen: "ProfileStatsSection",
      });
    },
    [navigation]
  );

  const renderBoulderCards = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigateToBoulderScreen(item)}>
        <BoulderCard boulder={item} />
      </TouchableOpacity>
    );
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.listContainer}>
        {/* List of Boulders */}
        <FlatList
          data={boulders}
          renderItem={renderBoulderCards}
          keyExtractor={(item) => item.id}
          initialNumToRender={8} // Render the number of items that are initially visible on the screen
          windowSize={2} // Render an additional number of items to improve scrolling performance
          ListFooterComponent={<View style={{ height: 50 }} />}
          ListEmptyComponent={renderEmptyComponent}
          keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
        />
      </View>
    </View>
  );
};

export default ProfileStatsSectionScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    rowGap: 10,
    padding: 10,
  },
});
