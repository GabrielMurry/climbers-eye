import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../../api/requestMethods";
import SectionButtons from "../../components/profileComponents/SectionButtons";
import * as ImagePicker from "expo-image-picker";
import { setHeadshotImage, setBannerImage, setGym } from "../../redux/actions";
import Header from "../../components/profileComponents/Header";
import ModalProfile from "../../components/profileComponents/ModalProfile";

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
  const [sectionQuickData, setSectionQuickData] = useState({
    statistics: 0,
    logbook: 0,
    likes: 0,
    bookmarks: 0,
    circuits: 0,
    creations: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProfileQuickData();
  }, [gym, spraywallIndex]);

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
      setSectionQuickData(response.data);
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header (banner image, headshot image, name, username) */}
      <Header navigation={navigation} />
      <SectionButtons
        sectionQuickData={sectionQuickData}
        setIsModalVisible={setIsModalVisible}
        navigation={navigation}
      />
      <ModalProfile
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        spraywalls={spraywalls}
        spraywallIndex={spraywallIndex}
      />
    </View>
  );
};

export default ProfileScreen;
