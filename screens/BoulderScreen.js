import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FullScreenImage from "../components/FullScreenImage";
import { request } from "../api/requestMethods";
import { useFocusEffect } from "@react-navigation/native";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import ImageDisplay from "../components/boulderComponents/ImageDisplay";
import Titles from "../components/boulderComponents/Titles";
import useCustomHeader from "../hooks/useCustomHeader";
import ModalOptions from "../components/ModalOptions";
import InfoRow1 from "../components/boulderComponents/InfoRow1";
import InfoRow2 from "../components/boulderComponents/InfoRow2";
import InfoRow3 from "../components/boulderComponents/InfoRow3";
import InfoRow4 from "../components/boulderComponents/InfoRow4";
import InfoRow5 from "../components/boulderComponents/InfoRow5";
import InfoRow6 from "../components/boulderComponents/InfoRow6";
import DraftNotif from "../components/boulderComponents/DraftNotif";

const THEME_STYLE = "white"; //rgba(245,245,245,255)

const BoulderScreen = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.userReducer);

  const { fromScreen, toScreen } = route.params;

  const [boulder, setBoulder] = useState(route.params.boulder);
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [optionsData, setOptionsData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [userSendsData, setUserSendsData] = useState(null);

  const fetchBoulderDetail = async () => {
    const response = await request("get", `api/boulder/${boulder.id}`);
    if (response) {
      setChartData(response.data.boulderBarChartData);
      setUserSendsData(response.data.userSendsData);
    }
  };

  useEffect(() => {
    fetchBoulderDetail();
  }, []);

  const headerRight = (
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
      <EllipsisHorizontalIcon size={35} color={"black"} />
    </TouchableOpacity>
  );

  useCustomHeader({
    navigation,
    fromScreen: fromScreen,
    toScreen: toScreen,
    title: "",
    headerRight,
  });

  const deleteBoulder = () => {
    Alert.alert(
      "Delete Boulder",
      `Are you sure you want to delete "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const response = await request(
              "delete",
              `delete_boulder/${boulder.id}`
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

  const handleReportPress = () => {
    setIsModalVisible(false);
    navigation.navigate("ReportBoulder");
  };

  handleRemoveLoggedAscentPress = () => {
    setIsModalVisible(false);
    navigation.navigate("BoulderUserSends", { boulder });
  };

  useEffect(() => {
    const createOptionsData = () => {
      // start with options
      const options = [
        // { title: "Share", onPress: () => shareInfo(boulder) },
        { title: "Report", onPress: handleReportPress },
        {
          title: "Cancel",
          onPress: () => setIsModalVisible(false),
          color: "gray",
        },
      ];
      // If your boulder is not published, add option to publish boulder
      if (!boulder.publish) {
        options.unshift({ title: "Publish Boulder", onPress: "" });
      }
      // If you logged an ascent of a boulder give option to remove logged ascent
      if (boulder.isSent) {
        const removeLoggedAscentOption = {
          title: "Remove Logged Ascent",
          onPress: handleRemoveLoggedAscentPress,
          color: "red",
        };
        const cancelOptionIndex = options.length - 1;
        options.splice(cancelOptionIndex, 0, removeLoggedAscentOption);
      }
      // If you are the setter of a boulder, give option to delete boulder
      if (boulder.setter === user.username) {
        const deleteBoulderOption = {
          title: "Delete Boulder",
          onPress: deleteBoulder,
          color: "red",
        };
        const cancelOptionIndex = options.length - 1;
        options.splice(cancelOptionIndex, 0, deleteBoulderOption);
      }

      return options;
    };

    setOptionsData(createOptionsData());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Titles boulder={boulder} />
        <ImageDisplay
          image={boulder}
          setImageFullScreen={setImageFullScreen}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <DraftNotif boulder={boulder} />
        <InfoRow1
          boulder={boulder}
          setBoulder={setBoulder}
          userID={user.id}
          navigation={navigation}
        />
        <InfoRow2
          boulder={boulder}
          chartData={chartData}
          userSendsData={userSendsData}
          navigation={navigation}
        />
        <InfoRow3 boulder={boulder} />
        <InfoRow4 boulder={boulder} />
        {/* Tags? */}
        {/* <InfoRow5 boulder={boulder} /> */}
        <InfoRow6 boulder={boulder} />
        {/* separator line */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "lightgray",
              marginTop: 20,
            }}
          />
        </View>
        {/* empty view cushion */}
        <View style={{ height: 50 }} />
      </ScrollView>
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      />
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={boulder.url}
        width={boulder.width}
        height={boulder.height}
        onRequestClose={() => setImageFullScreen(false)}
      />
    </View>
  );
};

export default BoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_STYLE,
  },
});
