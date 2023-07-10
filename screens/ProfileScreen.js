import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
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
import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { setHeadshotImage, setBannerImage } from "../redux/actions";
import { FontAwesome5 } from "@expo/vector-icons";

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

  // This event will be triggered when the screen gains focus (i.e., when you navigate back to it).
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.profileImageUri) {
        const newHeadshot = {
          uri: "data:image/png;base64," + route?.params?.profileImageUri,
          width: route?.params?.profileImageWidth,
          height: route?.params?.profileImageHeight,
        };
        setEditHeadshot(newHeadshot);
      } else if (route?.params?.profileBannerUri) {
        const newBanner = {
          uri: "data:image/png;base64," + route?.params?.profileBannerUri,
          width: route?.params?.profileBannerWidth,
          height: route?.params?.profileBannerHeight,
        };
        setEditBanner(newBanner);
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
      `profile/${user.id}/${spraywalls[spraywallIndex].id}?section=${section}`
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
    <View style={styles.profileContainer}>
      <View style={styles.headerContainer(BACKDROP_IMAGE_HEIGHT)}>
        <Image
          source={{ uri: bannerImage.uri }}
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
          {headshotImage.uri ? (
            <Image
              source={{ uri: headshotImage.uri }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
            />
          ) : (
            <UserCircleIcon size={HEADSHOT_IMAGE_SIZE} color="black" />
          )}
        </View>
        <View style={styles.username}>
          <Text style={styles.usernameText}>{user.name}</Text>
          <Text>{gym.name}</Text>
          <Text>{spraywalls[spraywallIndex].name}</Text>
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
            source={{ uri: editBanner.uri }}
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
          {editHeadshot.uri ? (
            <Image
              source={{ uri: editHeadshot.uri }}
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
