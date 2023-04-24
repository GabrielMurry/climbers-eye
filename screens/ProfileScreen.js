import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  ArrowLeftCircleIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";

const ProfileScreen = ({ navigation }) => {
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
          <Text style={styles.usernameText}>Username</Text>
          <Text>1234 Sends</Text>
          <View style={styles.followingFollowers}>
            <Text>0 Following</Text>
            <Text>0 Followers</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>Logbook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Your Boulders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Statistics</Text>
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
  },
});
