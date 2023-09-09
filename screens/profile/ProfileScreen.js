import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { request } from "../../api/requestMethods";
import Header from "../../components/profileComponents/Header";
import { useFocusEffect } from "@react-navigation/native";
import BouldersSection from "../../components/profileComponents/BouldersSection";
import CircuitsSection from "../../components/profileComponents/CircuitsSection";
import GymSection from "../../components/profileComponents/GymSection";
import { Text } from "react-native";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import ModalOptions from "../../components/ModalOptions";
import StatsSection from "../../components/profileComponents/StatsSection";

const THEME_STYLE = "white";

const ProfileScreen = ({ navigation }) => {
  const { gym } = useSelector((state) => state.gymReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );
  const { user } = useSelector((state) => state.userReducer);

  const [bouldersSectionQuickData, setBouldersSectionQuickData] = useState([
    { title: "Logbook", data: 0 },
    { title: "Likes", data: 0 },
    { title: "Bookmarks", data: 0 },
    { title: "Creations", data: 0 },
  ]);
  const [statsSectionQuickData, setStatsSectionQuickData] = useState([
    { title: "Sessions", data: 0 },
    { title: "Top Grade", data: "-" },
    { title: "Flashes", data: 0 },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [circuits, setCircuits] = useState([]);
  const [isHeaderTitleVisible, setIsHeaderTitleVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: THEME_STYLE, // Change this to your desired background color
      },
      headerShadowVisible: false,
      animation: "none",
      headerTitle: () => (
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {isHeaderTitleVisible ? user.username : ""}
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsModalVisible((prev) => !prev)}>
          <EllipsisHorizontalIcon
            size={35}
            color={"black"}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isHeaderTitleVisible]);

  useFocusEffect(
    useCallback(() => {
      fetchProfileQuickData();
      fetchCircuits();
    }, [gym, spraywallIndex])
  );

  const fetchProfileQuickData = async () => {
    const response = await request(
      "get",
      `profile_quick_data/${user.id}/${spraywalls[spraywallIndex].id}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setBouldersSectionQuickData(response.data.bouldersSectionQuickData);
      setStatsSectionQuickData(response.data.statsSectionQuickData);
    }
  };

  const fetchCircuits = async () => {
    const response = await request(
      "get",
      `get_user_circuits/${user.id}/${spraywalls[spraywallIndex].id}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setCircuits(response.data.circuitsData);
    }
  };

  const handleSwitchGymPress = () => {
    setIsModalVisible(false);
    navigation.navigate("SwitchGym");
  };
  const handleEditProfilePress = () => {
    setIsModalVisible(false);
    navigation.navigate("EditProfile");
  };
  const handleSettingsPress = () => {
    setIsModalVisible(false);
    navigation.navigate("Settings");
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

  const optionsData = [
    { title: "Switch Gym", onPress: handleSwitchGymPress },
    { title: "Edit Profile", onPress: handleEditProfilePress },
    { title: "Settings", onPress: handleSettingsPress },
    { title: "Cancel", onPress: () => setIsModalVisible(false) },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME_STYLE }}>
      {/* screen */}
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <Header navigation={navigation} />
        <GymSection navigation={navigation} />
        <BouldersSection
          bouldersSectionQuickData={bouldersSectionQuickData}
          navigation={navigation}
        />
        <StatsSection
          statsSectionQuickData={statsSectionQuickData}
          navigation={navigation}
        />
        <CircuitsSection circuits={circuits} navigation={navigation} />
      </ScrollView>
      {/* modal */}
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
  },
});
