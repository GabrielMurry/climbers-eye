import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { LinkIcon } from "react-native-heroicons/outline";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { request } from "../../api/requestMethods";
import { useActionSheet } from "@expo/react-native-action-sheet";

const Buttons = ({ boulder, setBoulder, userID, username, navigation }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleLikePressed = async () => {
    const optimisticUpdate = () => {
      setBoulder({ ...boulder, isLiked: !boulder.isLiked });
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
    const cancelButtonIndex = 3;
    // if current user is the creator of the boulder, give only them the option to delete
    if (boulder.setter === username) {
      options = ["Share", "Report", "Delete", "Cancel"];
      destructiveButtonIndex = 2;
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

  return (
    <View style={styles.container}>
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleShowOptionsPressed}
        >
          <SimpleLineIcons name="options" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="book" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={handleCircuitPressed}>
          {boulder.isBookmarked ? (
            <LinkIcon size={24} />
          ) : (
            <LinkIcon size={24} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBookmarkPressed}>
          {boulder.isBookmarked ? (
            <FontAwesome name="bookmark" size={24} color="gold" />
          ) : (
            <FontAwesome name="bookmark-o" size={24} color="gold" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLikePressed}>
          {boulder.isLiked ? (
            <FontAwesome name="heart" size={24} color="red" />
          ) : (
            <FontAwesome name="heart-o" size={24} color="red" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSentBoulderPressed}
        >
          {boulder.isSent ? (
            <AntDesign name="checkcircle" size={28} color="green" />
          ) : (
            <AntDesign name="checkcircleo" size={28} color="green" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#FFFBF1",
    justifyContent: "center",
    alignItems: "center",
    // adding shadow to button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
});
