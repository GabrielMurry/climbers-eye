import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useMemo } from "react";
import { LinkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import { request } from "../../../api/requestMethods";
import * as Haptics from "expo-haptics";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { updateBoulder } from "../../../redux/actions";

const InfoRow1 = ({ boulder, userID, navigation }) => {
  const dispatch = useDispatch();

  const debouncedHandleLikePressed = useMemo(
    () =>
      _.debounce(async (currentLike) => {
        if (boulder.isLiked === currentLike) {
          return;
        }
        // The code for sending requests to the backend can be placed here
        const data = { boulder: boulder.id, person: userID };
        const method = currentLike ? "post" : "delete";
        const response = await request(
          method,
          `api/like_boulder/${boulder.id}/${userID}`,
          data
        );
        // Success! 201 == created and 204 == deleted
        if (response.status === 201 || response.status === 204) {
          return;
        }
        dispatch(updateBoulder(boulder.id, { isLiked: currentLike }));
      }, 500),
    [boulder.isLiked]
  ); // Adjust the delay (in milliseconds) as needed

  const handleLikePressed = () => {
    // Optimistic updating
    const currentLike = !boulder.isLiked;
    dispatch(updateBoulder(boulder.id, { isLiked: currentLike }));
    handleVibrate();
    // Call the debounced function to handle the like/unlike action after a delay
    debouncedHandleLikePressed(currentLike);
  };

  const debouncedHandleBookmarkPressed = useMemo(
    () =>
      _.debounce(async (currentBookmark) => {
        if (boulder.isBookmarked === currentBookmark) {
          return;
        }
        // The code for sending requests to the backend can be placed here
        const data = { boulder: boulder.id, person: userID };
        const method = currentBookmark ? "post" : "delete";
        const response = await request(
          method,
          `api/bookmark_boulder/${boulder.id}/${userID}`,
          data
        );
        // Success! 201 == created and 204 == deleted
        if (response.status === 201 || response.status === 204) {
          return;
        }
        dispatch(updateBoulder(boulder.id, { isBookmarked: currentBookmark }));
      }, 500),
    [boulder.isBookmarked]
  ); // Adjust the delay (in milliseconds) as needed

  const handleBookmarkPressed = () => {
    // Optimistic updating
    const currentBookmark = !boulder.isBookmarked;
    dispatch(updateBoulder(boulder.id, { isBookmarked: currentBookmark }));
    handleVibrate();
    // Call the debounced function to handle the like/unlike action after a delay
    debouncedHandleBookmarkPressed(currentBookmark);
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
