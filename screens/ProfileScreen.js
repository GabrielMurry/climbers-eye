import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowLeftCircleIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../api/requestMethods";
import BoulderCard from "../components/listComponents/BoulderCard";
import CircuitCard from "../components/profileComponents/CircuitCard";
import SectionButtons from "../components/profileComponents/SectionButtons";
import QuickStatsCard from "../components/profileComponents/QuickStatsCard";
import BottomSheet, {
  BottomSheetTextInput,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import {
  setHeadshotImageUri,
  setHeadshotImageWidth,
  setHeadshotImageHeight,
  setBannerImageUri,
  setBannerImageWidth,
  setBannerImageHeight,
} from "../redux/actions";

const sections = {
  logbook: "logbook",
  creations: "creations",
  likes: "likes",
  bookmarks: "bookmarks",
  circuits: "circuits",
};

const WINDOW_WIDTH = Dimensions.get("window").width;
const BACKDROP_IMAGE_HEIGHT = 125;
const HEADSHOT_IMAGE_SIZE = 100;

const ProfileScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { gymName } = useSelector((state) => state.gymReducer);
  const { spraywallID, spraywallName } = useSelector(
    (state) => state.spraywallReducer
  );
  const {
    username,
    userID,
    headshotImageUri,
    headshotImageWidth,
    headshotImageHeight,
    bannerImageUri,
    bannerImageWidth,
    bannerImageHeight,
  } = useSelector((state) => state.userReducer);
  const [editHeadshotUri, setEditHeadshotUri] = useState(headshotImageUri);
  const [editHeadshotWidth, setEditHeadshotWidth] =
    useState(headshotImageWidth);
  const [editHeadshotHeight, setEditHeadshotHeight] =
    useState(headshotImageHeight);
  const [editBannerUri, setEditBannerUri] = useState(bannerImageUri);
  const [editBannerWidth, setEditBannerWidth] = useState(bannerImageWidth);
  const [editBannerHeight, setEditBannerHeight] = useState(bannerImageHeight);

  // This event will be triggered when the screen gains focus (i.e., when you navigate back to it).
  useFocusEffect(
    useCallback(() => {
      let headshotUri = null;
      let headshotWidth = null;
      let headshotHeight = null;
      let bannerUri = null;
      let bannerWidth = null;
      let bannerHeight = null;
      if (route?.params?.profileImageUri) {
        headshotUri = "data:image/png;base64," + route?.params?.profileImageUri;
        headshotWidth = route?.params?.profileImageWidth;
        headshotHeight = route?.params?.profileImageHeight;
        setEditHeadshotUri(headshotUri ?? headshotImageUri);
        setEditHeadshotWidth(headshotWidth ?? headshotImageWidth);
        setEditHeadshotHeight(headshotHeight ?? headshotImageHeight);
      } else if (route?.params?.profileBannerUri) {
        bannerUri = "data:image/png;base64," + route?.params?.profileBannerUri;
        bannerWidth = route?.params?.profileBannerWidth;
        bannerHeight = route?.params?.profileBannerHeight;
        setEditBannerUri(bannerUri ?? bannerImageUri);
        setEditBannerWidth(bannerWidth ?? bannerImageWidth);
        setEditBannerHeight(bannerHeight ?? bannerImageHeight);
      }
    }, [route])
  );

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
  const [isLoading, setIsLoading] = useState(false);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["92%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [section]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    const response = await request(
      "get",
      `profile/${userID}/${spraywallID}?section=${section}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      if (section === "logbook") {
        setSectionData(response.data.boulderData);
        const { sendsCount, flashCount, topGrade } = response.data.otherData;
        setLogbookData({
          sends: sendsCount,
          flashes: flashCount,
          topGrade: topGrade,
        });
      } else if (section === "creations") {
        setSectionData(response.data.boulderData);
        const { establishedCount, projectsCount, totalSendsCount } =
          response.data.otherData;
        setCreationsData({
          established: establishedCount,
          projects: projectsCount,
          totalSends: totalSendsCount,
        });
      } else if (section === "likes") {
        setSectionData(response.data.boulderData);
        const { likesCount, flashCount, topGrade } = response.data.otherData;
        setLikesData({
          count: likesCount,
          flashes: flashCount,
          topGrade: topGrade,
        });
      } else if (section === "bookmarks") {
        const { bookmarksCount, flashCount, topGrade } =
          response.data.otherData;
        setSectionData(response.data.boulderData);
        setBookmarksData({
          bookmarks: bookmarksCount,
          flashes: flashCount,
          topGrade: topGrade,
        });
      } else if (section === "circuits") {
        setSectionData(response.data.circuitsData);
        const { circuitsCount, circuitBouldersCount } = response.data.otherData;
        setCircuitsData({
          circuits: circuitsCount,
          bouldersCount: circuitBouldersCount,
        });
      }
      setIsLoading(false);
    }
  };

  // Optimization --> use the React.useCallback hook to memoize the navigation function and prevent unnecessary re-creation of the function on every render.
  // Providing navigation as a dependency, the navigateToBoulder function will only be re-created when the navigation prop changes, ensuring better performance.
  const navigateToBoulderScreen = useCallback(
    (item) => {
      navigation.navigate("Boulder", { boulder: item });
    },
    [navigation]
  );

  const renderBoulderCards = ({ item }) => {
    return (
      <>
        {section !== "circuits" ? (
          <TouchableOpacity onPress={() => navigateToBoulderScreen(item)}>
            <BoulderCard boulder={item} />
          </TouchableOpacity>
        ) : (
          <CircuitCard circuit={item} />
        )}
      </>
    );
  };

  const handleUploadImage = async (type) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
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
      headshot_image_data: editHeadshotUri.split(",")[1] ?? null,
      headshot_image_width: editHeadshotWidth ?? null,
      headshot_image_height: editHeadshotHeight ?? null,
      banner_image_data: editBannerUri.split(",")[1] ?? null, // using the default image has complete base64 as image.uri --> remove the 'data:image/png;base64,' in the beginning of string
      banner_image_width: editBannerWidth ?? null,
      banner_image_height: editBannerHeight ?? null,
    };
    const response = await request(
      "post",
      `add_profile_banner_image/${userID}`,
      data
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    dispatch(setHeadshotImageUri(editHeadshotUri));
    dispatch(setHeadshotImageWidth(editHeadshotWidth));
    dispatch(setHeadshotImageHeight(editHeadshotHeight));
    dispatch(setBannerImageUri(editBannerUri));
    dispatch(setBannerImageWidth(editBannerWidth));
    dispatch(setBannerImageHeight(editBannerHeight));
    handleCloseEditProfile();
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.headerContainer(BACKDROP_IMAGE_HEIGHT)}>
        <Image
          source={{ uri: bannerImageUri }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={{ backgroundColor: "black", borderRadius: "100%" }}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftCircleIcon size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View style={styles.userContainer}>
        <View
          style={[
            styles.userPhoto,
            {
              width: HEADSHOT_IMAGE_SIZE,
              height: HEADSHOT_IMAGE_SIZE,
            },
          ]}
        >
          {headshotImageUri !== null ? (
            <Image
              source={{ uri: headshotImageUri }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
            />
          ) : (
            <UserCircleIcon size={HEADSHOT_IMAGE_SIZE} color="black" />
          )}
        </View>
        <View style={styles.username}>
          <Text style={styles.usernameText}>{username}</Text>
          <Text>{gymName}</Text>
          <Text>{spraywallName}</Text>
          <Text>0 Sessions</Text>
        </View>
      </View>
      <SectionButtons
        section={section}
        setSection={setSection}
        sections={sections}
      />
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <FlatList
            data={sectionData}
            contentContainerStyle={{
              marginTop: 10,
              rowGap: 10,
              paddingHorizontal: 10, // add the same for ListScreen inside the flat list?
            }}
            renderItem={renderBoulderCards}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <QuickStatsCard
                section={section}
                logbookData={logbookData}
                creationsData={creationsData}
                likesData={likesData}
                bookmarksData={bookmarksData}
                circuitsData={circuitsData}
              />
            }
            ListFooterComponent={<View style={{ height: 60 }} />}
          />
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        // backgroundStyle={{ backgroundColor: "rgba(23,23,23,1)" }}
        handleIndicatorStyle={{ opacity: 0 }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={handleCloseEditProfile}>
            <Text style={{ fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "red", height: BACKDROP_IMAGE_HEIGHT }}
          onPress={() => handleUploadImage("banner")}
        >
          <Image
            source={{ uri: editBannerUri }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            width: HEADSHOT_IMAGE_SIZE,
            height: HEADSHOT_IMAGE_SIZE,
            borderRadius: "100%",
          }}
          onPress={() => handleUploadImage("headshot")}
        >
          {editHeadshotUri !== null ? (
            <Image
              source={{ uri: editHeadshotUri }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
            />
          ) : (
            <UserCircleIcon size={HEADSHOT_IMAGE_SIZE} color="black" />
          )}
        </TouchableOpacity>
        <View style={{ backgroundColor: "green", height: 50 }}>
          <Text>Name</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  headerContainer: (height) => ({
    backgroundColor: "#FFD1D1",
    height: height,
  }),
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  editProfileButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  editProfileText: {
    color: "white",
  },
  userContainer: {
    height: 125,
  },
  userPhoto: {
    position: "absolute",
    marginTop: -15,
    marginLeft: 30,
    backgroundColor: "orange",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
  username: {
    left: "50%",
    transform: [{ translateX: -50 }],
    justifyContent: "space-around",
    flex: 1,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  followingFollowers: {
    flexDirection: "row",
    columnGap: 10,
  },
  buttonsContainer: {
    flex: 1,
    rowGap: 20,
    padding: 20,
  },
  button: {
    backgroundColor: "lightpink",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});
