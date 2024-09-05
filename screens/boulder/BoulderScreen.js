import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FullScreenImage from "../../components/FullScreenImage";
import { request } from "../../api/requestMethods";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import ImageDisplay from "../../components/boulder/ImageDisplay";
import Titles from "../../components/boulder/Titles";
import useCustomHeader from "../../hooks/useCustomHeader";
import ModalOptions from "../../components/ModalOptions";
import InfoRow1 from "../../components/boulder/InfoRow1";
import InfoRow2 from "../../components/boulder/InfoRow2";
import InfoRow3 from "../../components/boulder/InfoRow3";
import InfoRow4 from "../../components/boulder/InfoRow4";
import InfoRow5 from "../../components/boulder/InfoRow5";
import InfoRow6 from "../../components/boulder/InfoRow6";
import DraftNotif from "../../components/boulder/DraftNotif";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateBoulder, deleteBoulder } from "../../redux/actions";

const THEME_STYLE = "white"; //rgba(245,245,245,255)

const BoulderScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const { fromScreen, toScreen, boulderId } = route.params;

  const boulder = useSelector((state) =>
    state.boulderReducer.boulders.find((b) => b.id === boulderId)
  );

  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [optionsData, setOptionsData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [userSendsData, setUserSendsData] = useState(null);

  const fetchBoulderDetail = async () => {
    const response = await request("get", `api/boulder/${boulder.id}`);
    if (response) {
      const { firstAscensionist, sends, isSent, userSendsCount, grade } =
        response.data;
      setChartData(response.data.boulderBarChartData);
      setUserSendsData(response.data.userSendsData);
      dispatch(
        updateBoulder(boulder.id, {
          firstAscensionist,
          sends,
          isSent,
          userSendsCount,
          grade,
        })
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBoulderDetail();
    }, [])
  );

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

  const handleDeleteBoulder = () => {
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
              `api/boulder/${boulder.id}`
            );
            if (response.status === 204) {
              navigation.goBack();
              dispatch(deleteBoulder(boulder.id));
            }
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

  const handlePublishBoulder = () => {
    Alert.alert(
      "Publish Boulder",
      `Are you sure you want to publish "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Publish",
          onPress: async () => {
            const data = { publish: true };
            const response = await request(
              "patch",
              `api/boulder/${boulder.id}`,
              data
            );
            if (response.status === 200) {
              navigation.goBack();
              dispatch(updateBoulder(boulder.id, { publish: true }));
            }
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const createOptionsData = () => {
      // start with options
      const options = [
        // { title: "Share", onPress: () => shareInfo(boulder) },
        // { title: "Report", onPress: handleReportPress },
        {
          title: "Cancel",
          onPress: () => setIsModalVisible(false),
          color: "gray",
        },
      ];
      // If your boulder is not published, add option to publish boulder
      if (!boulder.publish && boulder.setter === user.username) {
        options.unshift({
          title: "Publish Boulder",
          onPress: handlePublishBoulder,
        });
      }
      // If you are the setter of a boulder, give option to delete boulder
      if (boulder.setter === user.username) {
        const deleteBoulderOption = {
          title: "Delete Boulder",
          onPress: handleDeleteBoulder,
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
        <InfoRow1 boulder={boulder} userID={user.id} navigation={navigation} />
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
        url={boulder?.url}
        width={boulder?.width}
        height={boulder?.height}
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
