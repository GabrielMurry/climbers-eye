import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { CheckIcon, LinkIcon } from "react-native-heroicons/outline";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { request } from "../../api/requestMethods";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Haptics from "expo-haptics";

const Buttons = ({ boulder, setBoulder, userID, username, navigation }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleLikePressed = async () => {
    const optimisticUpdate = () => {
      setBoulder({ ...boulder, isLiked: !boulder.isLiked });
      handleVibrate();
    };

    const tempIsLiked = boulder.isLiked;
    optimisticUpdate();
    const method = tempIsLiked ? "delete" : "post";
    const response = await request(
      method,
      `like_boulder/${boulder.id}/${userID}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      setBoulder({ ...boulder, isLiked: !boulder.isLiked });
      return;
    }
  };

  const handleBookmarkPressed = async () => {
    const optimisticUpdate = () => {
      setBoulder({ ...boulder, isBookmarked: !boulder.isBookmarked });
      handleVibrate();
    };

    const tempIsBookmarked = boulder.isBookmarked;
    optimisticUpdate();
    const method = tempIsBookmarked ? "delete" : "post";
    const response = await request(
      method,
      `bookmark_boulder/${boulder.id}/${userID}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      setBoulder({ ...boulder, isBookmarked: !boulder.isBookmarked });
      return;
    }
  };

  const handleSentBoulderPressed = () => {
    navigation.navigate("Send", { boulder: boulder });
  };

  const deleteBoulder = () => {
    Alert.alert(
      "Delete Boulder",
      `Are you sure you want to delete "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const response = await request(
              "delete",
              `delete_boulder/${boulder.id}`
            );
            if (response.status !== 200) {
              console.log(response.status);
              return;
            }
            navigation.goBack();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleShowOptionsPressed = async () => {
    let options = ["Share", "Report", "Cancel"];
    let destructiveButtonIndex = -1;
    let cancelButtonIndex = 2;
    // if current user is the creator of the boulder, give only them the option to delete
    if (boulder.setter === username) {
      options = ["Share", "Report", "Delete", "Cancel"];
      destructiveButtonIndex = 2;
      cancelButtonIndex = 3;
    }

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            console.log("Share");
            break;

          case 1:
            console.log("Report");
            break;

          case destructiveButtonIndex:
            // Delete
            deleteBoulder();
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const handleCircuitPressed = () => {
    navigation.navigate("Circuit", { boulder: boulder });
  };

  const handleBoulderStatsPressed = () => {
    // setIsStatsVisible((prev) => !prev);
    navigation.navigate("BoulderStats", { boulder: boulder });
  };

  const handleVibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={handleShowOptionsPressed}
      >
        <SimpleLineIcons name="options" size={24} color="black" />
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={handleBoulderStatsPressed}
      >
        <FontAwesome name="book" size={24} color="black" />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={handleCircuitPressed}>
        <LinkIcon size={25} color={boulder.inCircuit ? "blue" : "lightgray"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBookmarkPressed}>
        {boulder.isBookmarked ? (
          <FontAwesome name="bookmark" size={22} color="gold" />
        ) : (
          <FontAwesome name="bookmark-o" size={22} color="lightgray" />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLikePressed}>
        {boulder.isLiked ? (
          <FontAwesome name="heart" size={22} color="red" />
        ) : (
          <FontAwesome name="heart-o" size={22} color="lightgray" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSentBoulderPressed}
      >
        <CheckIcon size={25} color={boulder.isSent ? "green" : "lightgray"} />
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
