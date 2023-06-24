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
  const { spraywallID } = useSelector((state) => state.spraywallReducer);
  const { username, userID } = useSelector((state) => state.userReducer);

  const [sendsCount, setSendsCount] = useState(null);
  const [flashCount, setFlashCount] = useState(null);
  const [topGrade, setTopGrade] = useState(null);
  const [establishedCount, setEstablishedCount] = useState(null);
  const [projectsCount, setProjectsCount] = useState(null);
  const [totalSendsCount, setTotalSendsCount] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const [bookmarksCount, setBookmarksCount] = useState(null);
  const [circuitsCount, setCircuitsCount] = useState(null);
  const [circuitBouldersCount, setCircuitBouldersCount] = useState(null);
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
        setSendsCount(response.data.otherData.sendsCount);
        setFlashCount(response.data.otherData.flashCount);
        setTopGrade(response.data.otherData.topGrade);
      } else if (section === "creations") {
        setSectionData(response.data.boulderData);
        setEstablishedCount(response.data.otherData.establishedCount);
        setProjectsCount(response.data.otherData.projectsCount);
        setTotalSendsCount(response.data.otherData.totalSendsCount);
      } else if (section === "likes") {
        setSectionData(response.data.boulderData);
        setLikesCount(response.data.otherData.likesCount);
      } else if (section === "bookmarks") {
        setSectionData(response.data.boulderData);
        setBookmarksCount(response.data.otherData.bookmarksCount);
      } else if (section === "circuits") {
        setSectionData(response.data.circuitsData);
        setCircuitsCount(response.data.otherData.circuitsCount);
        setCircuitBouldersCount(response.data.otherData.circuitBouldersCount);
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
            <Text style={{ fontSize: 24 }}>{sendsCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>{flashCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>{topGrade}</Text>
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
            <Text style={{ fontSize: 24 }}>{establishedCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Projects</Text>
            <Text style={{ fontSize: 24 }}>{projectsCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Total Sends</Text>
            <Text style={{ fontSize: 24 }}>{totalSendsCount}</Text>
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
            <Text style={{ fontSize: 24 }}>{likesCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>-</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>-</Text>
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
            <Text style={{ fontSize: 24 }}>{bookmarksCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>-</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>-</Text>
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
            <Text style={{ fontSize: 24 }}>{circuitsCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Boulders</Text>
            <Text style={{ fontSize: 24 }}>{circuitBouldersCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>-</Text>
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
          <Text>{sendsCount} Sends</Text>
          <View>
            <Text>0 Sessions</Text>
          </View>
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
    backgroundColor: "blue",
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
