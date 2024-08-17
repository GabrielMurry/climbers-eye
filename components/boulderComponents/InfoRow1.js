import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { LinkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import { request } from "../../api/requestMethods";
import * as Haptics from "expo-haptics";
import { useSelector, useDispatch } from "react-redux";
import { handleCacheUpdate } from "../../utils/functions";
import _ from "lodash";

const InfoRow1 = ({ boulder, setBoulder, userID, navigation }) => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.userReducer);
  const { spraywallIndex } = useSelector((state) => state.spraywallReducer);
  const [originalLike, setOriginalLike] = useState(boulder.isLiked);
  const [originalBookmark, setOriginalBookmark] = useState(
    boulder.isBookmarked
  );

  const debouncedHandleLikePressed = useMemo(
    () =>
      _.debounce(async (currentLike) => {
        if (originalLike === currentLike) {
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
        setOriginalLike(currentLike);
        console.log(response);
        if (response.status === 201 || response.status === 204) {
          // Success! 201 == created and 204 == deleted
          return;
        }
        console.log(response.status);
        setBoulder({ ...boulder, isLiked: originalLike });
      }, 500),
    [originalLike]
  ); // Adjust the delay (in milliseconds) as needed

  const handleLikePressed = () => {
    // Optimistic updating
    setBoulder({ ...boulder, isLiked: !boulder.isLiked });
    handleVibrate();
    // Call the debounced function to handle the like/unlike action after a delay
    debouncedHandleLikePressed(!boulder.isLiked);
  };

  const debouncedHandleBookmarkPressed = useMemo(
    () =>
      _.debounce(async (currentBookmark) => {
        if (originalBookmark === currentBookmark) {
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
        setOriginalBookmark(currentBookmark);
        if (response.status === 201 || response.status === 204) {
          // Success! 201 == created and 204 == deleted
          return;
        }
        console.log(response.status);
        setBoulder({ ...boulder, isBookmarked: originalBookmark });
      }, 500),
    [originalBookmark]
  ); // Adjust the delay (in milliseconds) as needed

  const handleBookmarkPressed = () => {
    // Optimistic updating
    setBoulder({ ...boulder, isBookmarked: !boulder.isBookmarked });
    handleVibrate();
    // Call the debounced function to handle the like/unlike action after a delay
    debouncedHandleBookmarkPressed(!boulder.isBookmarked);
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
