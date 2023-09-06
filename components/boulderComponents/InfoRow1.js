import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import React from "react";
import { CheckIcon, LinkIcon, StarIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import { request } from "../../api/requestMethods";
import * as Haptics from "expo-haptics";

const InfoRow1 = ({ boulder, setBoulder, userID, username, navigation }) => {
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

  const handleCircuitPressed = () => {
    navigation.navigate("Circuit", { boulder: boulder });
  };

  const handleVibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{boulder.setter}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 0.6,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={handleLikePressed}>
          {boulder.isLiked ? (
            <FontAwesome name="heart" size={22} color="red" />
          ) : (
            <FontAwesome name="heart-o" size={22} color="lightgray" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBookmarkPressed}>
          {boulder.isBookmarked ? (
            <FontAwesome name="bookmark" size={22} color="gold" />
          ) : (
            <FontAwesome name="bookmark-o" size={22} color="lightgray" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCircuitPressed}>
          <LinkIcon
            size={25}
            color={boulder.inCircuit ? "blue" : "lightgray"}
          />
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};

export default InfoRow1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 50,
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
