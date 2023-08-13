import { SafeAreaView, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../../api/requestMethods";
import * as ImagePicker from "expo-image-picker";
import { setHeadshotImage, setBannerImage } from "../../redux/actions";
import Header from "../../components/profileComponents/Header";
import ModalProfile from "../../components/profileComponents/ModalProfile";
import { useFocusEffect } from "@react-navigation/native";
import BouldersSection from "../../components/profileComponents/BouldersSection";
import CircuitsSection from "../../components/profileComponents/CircuitsSection";
import GymSection from "../../components/profileComponents/GymSection";
import AccountSection from "../../components/profileComponents/AccountSection";

const BACKDROP_IMAGE_HEIGHT = 125;
const HEADSHOT_IMAGE_SIZE = 100;

const ProfileScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );
  const { user, headshotImage, bannerImage } = useSelector(
    (state) => state.userReducer
  );
  const [editHeadshot, setEditHeadshot] = useState(headshotImage);
  const [editBanner, setEditBanner] = useState(bannerImage);
  const [data, setData] = useState([
    {
      gymID: gym.id,
      gymName: gym.name,
      spraywalls: [
        {
          spraywallID: spraywalls[spraywallIndex].id,
          spraywallName: spraywalls[spraywallIndex].name,
          url: spraywalls[spraywallIndex].url,
        },
      ],
    },
  ]);
  const [bouldersSectionQuickData, setBouldersSectionQuickData] = useState([
    { title: "Statistics", data: 0 },
    { title: "Logbook", data: 0 },
    { title: "Likes", data: 0 },
    { title: "Bookmarks", data: 0 },
    { title: "Creations", data: 0 },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [circuits, setCircuits] = useState([]);

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

  const handleEditProfile = () => {
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleCloseEditProfile = () => {
    bottomSheetRef.current.close();
  };

  const handleSave = async () => {
    data = {
      headshot_image_data: editHeadshot.uri.split(",")[1] ?? null,
      headshot_image_width: editHeadshot.width ?? null,
      headshot_image_height: editHeadshot.height ?? null,
      banner_image_data: editBanner.uri.split(",")[1] ?? null, // using the default image has complete base64 as image.uri --> remove the 'data:image/png;base64,' in the beginning of string
      banner_image_width: editBanner.width ?? null,
      banner_image_height: editBanner.height ?? null,
    };
    const response = await request(
      "post",
      `add_profile_banner_image/${user.id}`,
      data
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    dispatch(setHeadshotImage(editHeadshot));
    dispatch(setBannerImage(editBanner));
    handleCloseEditProfile();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(240,243,246,255)" }}>
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
        <ModalProfile
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
