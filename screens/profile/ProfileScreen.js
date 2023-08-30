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
      headerTitle: () => {},
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME_STYLE }}>
      <ScrollView>
        <Header navigation={navigation} />
        <GymSection navigation={navigation} />
        <BouldersSection
          bouldersSectionQuickData={bouldersSectionQuickData}
          navigation={navigation}
        />
        <CircuitsSection circuits={circuits} navigation={navigation} />
        {/* <AccountSection navigation={navigation} /> */}
        {/* <ModalSelectGyms
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          spraywalls={spraywalls}
          spraywallIndex={spraywallIndex}
        /> */}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        {/* Add modal content here */}
        <Pressable
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 }}
          onPress={() => setIsModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              position: "absolute",
              bottom: 0,
              paddingBottom: 35,
            }}
          >
            <Pressable
              style={{
                justifyContent: "center",
                padding: 20,
              }}
              onPress={handleSwitchGymPress}
            >
              <Text>Switch Gym</Text>
            </Pressable>
            <Pressable
              style={{
                justifyContent: "center",
                padding: 20,
              }}
              onPress={handleEditProfilePress}
            >
              <Text>Edit Profile</Text>
            </Pressable>
            <Pressable
              style={{
                justifyContent: "center",
                padding: 20,
              }}
              onPress={handleSettingsPress}
            >
              <Text>Settings</Text>
            </Pressable>
            <Pressable
              style={{
                justifyContent: "center",
                padding: 20,
              }}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={{ color: "gray" }}>Cancel</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
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
