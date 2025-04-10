import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { debounce } from "lodash";
import {
  addBookmarkToBoulder,
  deleteBookmarkFromBoulder,
} from "../../../services/bookmark";
import {
  addLikeToBoulder,
  deleteLikeFromBoulder,
} from "../../../services/like";
import { updateBoulder } from "../../../redux/features/boulder/boulderSlice";
import { Boulder } from "../../../utils/types/boulder";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux/hooks";
import { debounce_speed } from "../../../utils/constants/debounce";

type InfoRow1Props = {
  boulder: Boulder;
  userID: number;
};

const InfoRow1: React.FC<InfoRow1Props> = ({ boulder, userID }) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [curLike, setCurLike] = useState(boulder.isLiked);
  const [curBookmark, setCurBookmark] = useState(boulder.isBookmarked);

  const performLikeRequest = async (method: string) => {
    const pathParams = { boulderId: boulder.id };
    const data = { boulder: boulder.id, person: userID };
    switch (method) {
      case "post":
        return await addLikeToBoulder(pathParams, data);
      case "delete":
        return await deleteLikeFromBoulder(pathParams, data);
      default:
        console.error("Invalid method.");
    }
  };

  const likePressed = async (newLike: boolean) => {
    if (newLike === curLike) {
      return;
    }
    const method = newLike ? "post" : "delete";
    const response = await performLikeRequest(method);
    // Success! 201 (created) or 204 (deleted)
    if (response?.status === 201 || response?.status === 204) {
      setCurLike(newLike);
      return;
    }
  };

  const likeDebouncer = useCallback(
    debounce(likePressed, debounce_speed.MEDIUM),
    [curLike]
  );

  const handleLikePressed = () => {
    // Optimistic updating
    const newLike = !boulder.isLiked;
    dispatch(updateBoulder(boulder.id, { isLiked: newLike }));
    likeDebouncer(newLike);
    handleVibrate();
  };

  const performBookmarkRequest = async (method: string) => {
    const pathParams = { boulderId: boulder.id };
    const data = { boulder: boulder.id, person: userID };
    switch (method) {
      case "post":
        return await addBookmarkToBoulder(pathParams, data);
      case "delete":
        return await deleteBookmarkFromBoulder(pathParams, data);
      default:
        console.error("Invalid method.");
    }
  };

  const bookmarkPressed = async (newBookmark: boolean) => {
    if (newBookmark === curBookmark) {
      return;
    }
    const method = newBookmark ? "post" : "delete";
    const response = await performBookmarkRequest(method);
    // Success! 201 (created) or 204 (deleted)
    if (response?.status === 201 || response?.status === 204) {
      setCurBookmark(newBookmark);
      return;
    }
  };

  const bookmarkDebouncer = useCallback(
    debounce(bookmarkPressed, debounce_speed.MEDIUM),
    [curBookmark]
  );

  const handleBookmarkPressed = () => {
    // Optimistic updating
    const newBookmark = !boulder.isBookmarked;
    dispatch(updateBoulder(boulder.id, { isBookmarked: newBookmark }));
    bookmarkDebouncer(newBookmark);
    handleVibrate();
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
