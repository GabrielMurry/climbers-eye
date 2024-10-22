import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useMemo } from "react";
import { LinkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useDispatch } from "react-redux";
import _ from "lodash";
import {
  addBookmarkToBoulder,
  deleteBookmarkFromBoulder,
} from "../../../services/bookmark";
import {
  addLikeToBoulder,
  deleteLikeFromBoulder,
} from "../../../services/like";
import { updateBoulder } from "../../../redux/features/boulder/boulderSlice";
import { useFetch } from "../../../hooks/useFetch";

const InfoRow1 = ({ boulder, userID, navigation }) => {
  const dispatch = useDispatch();

  const [fetchAddBookmark, isLoadingAddBookmark, isErrorAddBookmark] =
    useFetch(addBookmarkToBoulder);

  const [fetchDeleteBookmark, isLoadingDeleteBookmark, isErrorDeleteBookmark] =
    useFetch(deleteBookmarkFromBoulder);

  const [fetchAddLike, isLoadingAddLike, isErrorAddLike] =
    useFetch(addLikeToBoulder);

  const [fetchDeleteLike, isLoadingDeleteLike, isErrorDeleteLike] = useFetch(
    deleteLikeFromBoulder
  );

  const performLikeRequest = async (method) => {
    const pathParams = { boulderId: boulder.id, userId: userID };
    const data = { boulder: boulder.id, person: userID };
    switch (method) {
      case "post":
        return await fetchAddLike({ pathParams, data });
      case "delete":
        return await fetchDeleteLike({ pathParams, data });
      default:
        console.error("Invalid method.");
    }
  };

  const debouncedHandleLikePressed = useMemo(
    () =>
      _.debounce(async (currentLike) => {
        if (boulder.isLiked === currentLike) {
          return;
        }
        const method = currentLike ? "post" : "delete";
        const response = await performLikeRequest(method);
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

  const performBookmarkRequest = async (method) => {
    const pathParams = { boulderId: boulder.id, userId: userID };
    const data = { boulder: boulder.id, person: userID };
    switch (method) {
      case "post":
        return await fetchAddBookmark({ pathParams, data });
      case "delete":
        return await fetchDeleteBookmark({ pathParams, data });
      default:
        console.error("Invalid method.");
    }
  };

  const debouncedHandleBookmarkPressed = useMemo(
    () =>
      _.debounce(async (currentBookmark) => {
        if (boulder.isBookmarked === currentBookmark) {
          return;
        }
        const method = currentBookmark ? "post" : "delete";
        const response = await performBookmarkRequest(method);
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
    navigation.navigate("CircuitStack", {
      screen: "Circuit",
      params: { boulder: boulder },
    });
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
