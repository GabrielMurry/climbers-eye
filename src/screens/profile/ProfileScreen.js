import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/profile/Header";
import BouldersSection from "../../components/profile/BouldersSection";
import CircuitsSection from "../../components/profile/CircuitsSection";
import GymSection from "../../components/profile/GymSection";
import { Text } from "react-native";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import ModalOptions from "../../components/custom/ModalOptions";
import StatsSection from "../../components/profile/StatsSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { logoutUser } from "../../services/auth";

const THEME_STYLE = "white";

const ProfileScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  // const [statsSectionQuickData, setStatsSectionQuickData] = useState([
  //   { section: "Top Grade", data: 0 },
  //   { section: "Flashes", data: 0 },
  // ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [circuits, setCircuits] = useState([]);
  const [isHeaderTitleVisible, setIsHeaderTitleVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: THEME_STYLE,
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

  const handleLogoutPress = async () => {
    setIsModalVisible(false);
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const data = { refresh: refreshToken };
    const response = await logoutUser(data);
    if (response.status === 200) {
      // Clear tokens from storage
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      // Reset the navigation stack and navigate to the login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: "AuthStack", state: { routes: [{ name: "Login" }] } },
          ],
        })
      );
    }
  };

  const optionsData = [
    // { title: "Switch Gym", onPress: handleSwitchGymPress },
    // { title: "Edit Profile", onPress: handleEditProfilePress },
    { title: "Log out", onPress: handleLogoutPress, color: "red" },
    { title: "Cancel", onPress: () => setIsModalVisible(false), color: "gray" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME_STYLE }}>
      {/* screen */}
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <Header navigation={navigation} />
        <GymSection />
        <BouldersSection navigation={navigation} />
        {/* <StatsSection
          statsSectionQuickData={statsSectionQuickData}
          navigation={navigation}
        /> */}
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
