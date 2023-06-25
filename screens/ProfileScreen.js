import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowLeftCircleIcon,
  ChartPieIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { request } from "../api/requestMethods";
import BoulderCard from "../components/listComponents/BoulderCard";
import { SimpleLineIcons } from "@expo/vector-icons";
import CircuitCard from "../components/profileComponents/CircuitCard";

const sections = {
  logbook: "logbook",
  creations: "creations",
  likes: "likes",
  bookmarks: "bookmarks",
  circuits: "circuits",
};

const ProfileScreen = ({ navigation }) => {
  const { gymName } = useSelector((state) => state.gymReducer);
  const { spraywallID, spraywallName } = useSelector(
    (state) => state.spraywallReducer
  );
  const { username, userID } = useSelector((state) => state.userReducer);

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

  const renderHeaderCard = () => (
    <View
      style={{
        height: 60,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {section === "logbook" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Sends</Text>
            <Text style={{ fontSize: 24 }}>{logbookData.sends}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>{logbookData.flashes}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>{logbookData.topGrade}</Text>
          </View>
        </>
      ) : section === "creations" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Established</Text>
            <Text style={{ fontSize: 24 }}>{creationsData.established}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Projects</Text>
            <Text style={{ fontSize: 24 }}>{creationsData.projects}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Total Sends</Text>
            <Text style={{ fontSize: 24 }}>{creationsData.totalSends}</Text>
          </View>
        </>
      ) : section === "likes" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Likes</Text>
            <Text style={{ fontSize: 24 }}>{likesData.count}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>{likesData.flashes}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>{likesData.topGrade}</Text>
          </View>
        </>
      ) : section === "bookmarks" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Bookmarks</Text>
            <Text style={{ fontSize: 24 }}>{bookmarksData.bookmarks}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>{bookmarksData.flashes}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>{bookmarksData.topGrade}</Text>
          </View>
        </>
      ) : section === "circuits" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Circuits</Text>
            <Text style={{ fontSize: 24 }}>{circuitsData.circuits}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Boulders</Text>
            <Text style={{ fontSize: 24 }}>{circuitsData.bouldersCount}</Text>
          </View>
        </>
      ) : null}
    </View>
  );

  return (
    <View style={styles.profileContainer}>
      <View style={styles.headerContainer}>
        <SafeAreaView style={styles.header}>
          <ArrowLeftCircleIcon
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View style={styles.userContainer}>
        <View style={styles.userPhoto}>
          <UserCircleIcon size={100} color="black" />
        </View>
        <View style={styles.username}>
          <Text style={styles.usernameText}>{username}</Text>
          <Text>{gymName},</Text>
          <Text>{spraywallName}</Text>
          <Text>0 Sessions</Text>
        </View>
      </View>
      <View style={styles.sectionsContainer}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => setSection(sections.logbook)}
        >
          <Text
            style={{
              fontWeight: "bold",
              opacity: section === "logbook" ? 1 : 0.3,
            }}
          >
            Logbook
          </Text>
          <View
            style={{
              backgroundColor: "black",
              width: "100%",
              height: 2,
              bottom: 0,
              position: "absolute",
              opacity: section === "logbook" ? 1 : 0,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => setSection(sections.creations)}
        >
          <Text
            style={{
              fontWeight: "bold",
              opacity: section === "creations" ? 1 : 0.3,
            }}
          >
            Creations
          </Text>
          <View
            style={{
              backgroundColor: "black",
              width: "100%",
              height: 2,
              bottom: 0,
              position: "absolute",
              opacity: section === "creations" ? 1 : 0,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => setSection(sections.likes)}
        >
          <Text
            style={{
              fontWeight: "bold",
              opacity: section === "likes" ? 1 : 0.3,
            }}
          >
            Likes
          </Text>
          <View
            style={{
              backgroundColor: "black",
              width: "100%",
              height: 2,
              bottom: 0,
              position: "absolute",
              opacity: section === "likes" ? 1 : 0,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => setSection(sections.bookmarks)}
        >
          <Text
            style={{
              fontWeight: "bold",
              opacity: section === "bookmarks" ? 1 : 0.3,
            }}
          >
            Bookmarks
          </Text>
          <View
            style={{
              backgroundColor: "black",
              width: "100%",
              height: 2,
              bottom: 0,
              position: "absolute",
              opacity: section === "bookmarks" ? 1 : 0,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => setSection(sections.circuits)}
        >
          <Text
            style={{
              fontWeight: "bold",
              opacity: section === "circuits" ? 1 : 0.3,
            }}
          >
            Circuits
          </Text>
          <View
            style={{
              backgroundColor: "black",
              width: "100%",
              height: 2,
              bottom: 0,
              position: "absolute",
              opacity: section === "circuits" ? 1 : 0,
            }}
          />
        </TouchableOpacity>
      </View>
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
            ListHeaderComponent={renderHeaderCard}
            ListFooterComponent={<View style={{ height: 60 }} />}
          />
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "lightpink",
    height: 125,
  },
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
    height: 100,
  },
  userPhoto: {
    position: "absolute",
    marginTop: -15,
    marginLeft: 30,
    backgroundColor: "orange",
    borderRadius: 100,
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
  sectionsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  sectionButton: {
    paddingVertical: 12,
  },
});
