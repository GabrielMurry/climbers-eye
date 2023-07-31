import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../api/requestMethods";
import SectionButtons from "../components/profileComponents/SectionButtons";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { setHeadshotImage, setBannerImage } from "../redux/actions";
import Header from "../components/profileComponents/Header";
import GymAndSprayWallButtons from "../components/profileComponents/GymAndSprayWallButtons";
import StatisticsButton from "../components/profileComponents/StatisticsButton";
import ModalProfile from "../components/profileComponents/ModalProfile";

const sections = {
  logbook: "logbook",
  creations: "creations",
  likes: "likes",
  bookmarks: "bookmarks",
  circuits: "circuits",
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWalls, setSelectedWalls] = useState([
    spraywalls[spraywallIndex].id,
  ]);
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

  const [logbookData, setLogbookData] = useState({
    sends: null,
    flashes: null,
    topGrade: null,
  });
  const [creationsData, setCreationsData] = useState({
    established: null,
    projects: null,
    totalSends: null,
  });
  const [likesData, setLikesData] = useState({ count: null, flashes: null });
  const [bookmarksData, setBookmarksData] = useState({
    bookmarks: null,
    flashes: null,
    topGrade: null,
  });
  const [circuitsData, setCircuitsData] = useState({
    circuits: null,
    bouldersCount: null,
    topGrade: null,
  });
  const [section, setSection] = useState(sections.logbook);
  const [sectionData, setSectionData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, [selectedWalls]);

  const fetchProfileData = async () => {
    const response = await request(
      "get",
      `profile_main/${user.id}?walls=${selectedWalls}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setData(response.data.gym_data);
    }
  };

  // useEffect(() => {
  //   fetchProfileData();
  // }, [section]);

  // const fetchProfileData = async () => {
  //   setIsLoading(true);
  //   const response = await request(
  //     "get",
  //     `profile/${user.id}/${spraywalls[spraywallIndex].id}?section=${section}`
  //   );
  //   if (response.status !== 200) {
  //     console.log(response.status);
  //     return;
  //   }
  //   if (response.data) {
  //     if (section === "logbook") {
  //       setSectionData(response.data.boulderData);
  //       const { sendsCount, flashCount, topGrade } = response.data.otherData;
  //       setLogbookData({
  //         sends: sendsCount,
  //         flashes: flashCount,
  //         topGrade: topGrade,
  //       });
  //     } else if (section === "creations") {
  //       setSectionData(response.data.boulderData);
  //       const { establishedCount, projectsCount, totalSendsCount } =
  //         response.data.otherData;
  //       setCreationsData({
  //         established: establishedCount,
  //         projects: projectsCount,
  //         totalSends: totalSendsCount,
  //       });
  //     } else if (section === "likes") {
  //       setSectionData(response.data.boulderData);
  //       const { likesCount, flashCount, topGrade } = response.data.otherData;
  //       setLikesData({
  //         count: likesCount,
  //         flashes: flashCount,
  //         topGrade: topGrade,
  //       });
  //     } else if (section === "bookmarks") {
  //       const { bookmarksCount, flashCount, topGrade } =
  //         response.data.otherData;
  //       setSectionData(response.data.boulderData);
  //       setBookmarksData({
  //         bookmarks: bookmarksCount,
  //         flashes: flashCount,
  //         topGrade: topGrade,
  //       });
  //     } else if (section === "circuits") {
  //       setSectionData(response.data.circuitsData);
  //       const { circuitsCount, circuitBouldersCount } = response.data.otherData;
  //       setCircuitsData({
  //         circuits: circuitsCount,
  //         bouldersCount: circuitBouldersCount,
  //       });
  //     }
  //     setIsLoading(false);
  //   }
  // };

  const handleUploadImage = async (type) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: false,
      });

      if (result && !result.canceled) {
        let width = result.assets[0].width;
        let height = result.assets[0].height;
        let orientation = width > height ? "horizontal" : "vertical";
        let scale = orientation === "vertical" ? 8 : 5;
        let imageUri = "data:image/png;base64," + result.assets[0].base64;
        navigation.navigate("CropImage", {
          imageUri: imageUri,
          type: type,
          orientation: orientation,
          scale: scale,
          width: width,
          height: height,
          cropDimensions: {
            width:
              type === "banner"
                ? WINDOW_WIDTH
                : type === "headshot" && orientation === "vertical"
                ? width / scale
                : height / scale,
            height:
              type === "banner"
                ? BACKDROP_IMAGE_HEIGHT
                : type === "headshot" && orientation === "vertical"
                ? width / scale
                : height / scale,
          },
        });
      }
    } catch (error) {
      console.log(error);
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
    <View style={{ flex: 1 }}>
      {/* Header (banner image, headshot image, name, username) */}
      <Header navigation={navigation} />
      {/* Gym and Spray Wall Selection Buttons */}
      {/* <GymAndSprayWallButtons
        setIsModalVisible={setIsModalVisible}
        data={data}
      /> */}
      {/* Statistics Button */}
      {/* <StatisticsButton /> */}
      {/* Section Buttons (Logbook, Likes, Bookmarks, Circuits, Created) */}
      <SectionButtons />
      <ModalProfile
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedWalls={selectedWalls}
        setSelectedWalls={setSelectedWalls}
        spraywalls={spraywalls}
        spraywallIndex={spraywallIndex}
      />
    </View>
  );
};

export default ProfileScreen;
