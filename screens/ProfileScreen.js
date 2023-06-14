import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftCircleIcon,
  ChartPieIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { request } from "../api/requestMethods";

const ProfileScreen = ({ navigation }) => {
  const { gymName } = useSelector((state) => state.gymReducer);
  const { username } = useSelector((state) => state.userReducer);
  const { userID } = useSelector((state) => state.userReducer);

  const [sends, setSends] = useState(null);
  const [createdBoulders, setCreatedBoulders] = useState(null);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const response = await request("get", `profile/${userID}`);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setSends(response.data.sends);
      setCreatedBoulders(response.data.userCreatedBoulders);
      setLikes(response.data.likes);
    }
  };

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
          <Text>{sends} Sends</Text>
          <View style={styles.followingFollowers}>
            <Text>0 Following</Text>
            <Text>0 Followers</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>Logbook</Text>
          <Text>{sends}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Your Boulders</Text>
          <Text>{createdBoulders}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Liked Boulders</Text>
          <Text>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Bookmarked Boulders</Text>
          <Text>14</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Your Circuits</Text>
          <Text>14</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Statistics</Text>
          <ChartPieIcon size={25} color="black" />
        </TouchableOpacity>
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
