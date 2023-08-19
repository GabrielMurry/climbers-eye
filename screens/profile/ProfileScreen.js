import { SafeAreaView, ScrollView } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { request } from "../../api/requestMethods";
import Header from "../../components/profileComponents/Header";
import ModalSelectGyms from "../../components/profileComponents/ModalSelectGyms";
import { useFocusEffect } from "@react-navigation/native";
import BouldersSection from "../../components/profileComponents/BouldersSection";
import CircuitsSection from "../../components/profileComponents/CircuitsSection";
import GymSection from "../../components/profileComponents/GymSection";
import AccountSection from "../../components/profileComponents/AccountSection";
import { Text } from "react-native";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";

const THEME_STYLE = "white";

const ProfileScreen = ({ route, navigation }) => {
  const { gym } = useSelector((state) => state.gymReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );
  const { user } = useSelector((state) => state.userReducer);

  const [bouldersSectionQuickData, setBouldersSectionQuickData] = useState([
    { title: "Statistics", data: 0 },
    { title: "Logbook", data: 0 },
    { title: "Likes", data: 0 },
    { title: "Bookmarks", data: 0 },
    { title: "Creations", data: 0 },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [circuits, setCircuits] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: THEME_STYLE, // Change this to your desired background color
      },
      headerShadowVisible: false,
      animation: "none",
      headerTitle: () => <Text>@{user?.username}</Text>,
      headerRight: () => (
        <EllipsisHorizontalIcon
          size={35}
          color={"black"}
          style={{ marginRight: 20 }}
        />
      ),
    });
  }, [navigation]);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME_STYLE }}>
      <ScrollView>
        {/* Header (banner image, headshot image, name, username) */}
        <Header navigation={navigation} />
        <GymSection
          setIsModalVisible={setIsModalVisible}
          navigation={navigation}
        />
        <BouldersSection
          bouldersSectionQuickData={bouldersSectionQuickData}
          navigation={navigation}
        />
        <CircuitsSection circuits={circuits} navigation={navigation} />
        <AccountSection navigation={navigation} />
        <ModalSelectGyms
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          spraywalls={spraywalls}
          spraywallIndex={spraywallIndex}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
