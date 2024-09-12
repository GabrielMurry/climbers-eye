import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { request } from "../../api/requestMethods";
import Header from "../../components/profile/Header";
import { useFocusEffect } from "@react-navigation/native";
import BouldersSection from "../../components/profile/BouldersSection";
import CircuitsSection from "../../components/profile/CircuitsSection";
import GymSection from "../../components/profile/GymSection";
import { Text } from "react-native";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import ModalOptions from "../../components/custom/ModalOptions";
import StatsSection from "../../components/profile/StatsSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const THEME_STYLE = "white";

const ProfileScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { gym } = useSelector((state) => state.gymReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );
  const [statsSectionQuickData, setStatsSectionQuickData] = useState([
    { section: "Top Grade", data: 0 },
    { section: "Flashes", data: 0 },
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

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const threshold = 50; // Change this value to your desired threshold

    if (offsetY >= threshold && !isHeaderTitleVisible) {
      setIsHeaderTitleVisible(true);
    } else if (offsetY < threshold && isHeaderTitleVisible) {
      setIsHeaderTitleVisible(false);
    }
  };

  // const optionsData = [
  //   { title: "Switch Gym", onPress: handleSwitchGymPress },
  //   { title: "Edit Profile", onPress: handleEditProfilePress },
  //   { title: "Log out", onPress: handleLogoutPress, color: "red" },
  //   { title: "Cancel", onPress: () => setIsModalVisible(false), color: "gray" },
  // ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME_STYLE }}>
      {/* screen */}
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <Header navigation={navigation} />
        <GymSection />
        <BouldersSection navigation={navigation} />
        <StatsSection
          statsSectionQuickData={statsSectionQuickData}
          navigation={navigation}
        />
        <CircuitsSection circuits={circuits} navigation={navigation} />
      </ScrollView>
      {/* modal */}
      {/* <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      /> */}
    </SafeAreaView>
  );
};

export default ProfileScreen;
