import { TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { updateBoulder } from "../../../redux/features/boulder/boulderSlice";
import * as Haptics from "expo-haptics";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addLikeToBoulder,
  deleteLikeFromBoulder,
} from "../../../services/like";
import {
  addBookmarkToBoulder,
  deleteBookmarkFromBoulder,
} from "../../../services/bookmark";
import { selectBoulder } from "../../../redux/features/boulder/boulderSelectors";
import SaveButtonIcons from "./SaveButtonIcons";

const Categories = ["like", "bookmark"] as const;

export type Category = (typeof Categories)[number];

type SaveButtonProps = {
  category: Category;
  boulderId: number;
  userId: number;
};

const SaveButton: React.FC<SaveButtonProps> = ({
  category,
  boulderId,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const boulder = useAppSelector((state) => selectBoulder(state, boulderId));
  if (!boulder) {
    return null;
  }

  const [prevLike, setPrevLike] = useState(boulder.isLiked);
  const [prevBookmark, setPrevBookmark] = useState(boulder.isBookmarked);

  const debouncedLike = useDebounce(prevLike);
  const debouncedBookmark = useDebounce(prevBookmark);

  const performLikeApiRequest = async () => {
    const pathParams = { boulderId: boulder.id };
    const data = { boulder: boulder.id, person: userId };
    if (debouncedLike) {
      await addLikeToBoulder(pathParams, data);
    } else {
      await deleteLikeFromBoulder(pathParams, data);
    }
  };

  const performBookmarkApiRequest = async () => {
    const pathParams = { boulderId: boulder.id };
    const data = { boulder: boulder.id, person: userId };
    if (debouncedBookmark) {
      await addBookmarkToBoulder(pathParams, data);
    } else {
      await deleteBookmarkFromBoulder(pathParams, data);
    }
  };

  useEffect(() => {
    if (debouncedLike === boulder.isLiked) return;
    dispatch(updateBoulder(boulder.id, { isLiked: !boulder.isLiked }));
    performLikeApiRequest();
  }, [debouncedLike]);

  useEffect(() => {
    if (debouncedBookmark === boulder.isBookmarked) return;
    dispatch(
      updateBoulder(boulder.id, { isBookmarked: !boulder.isBookmarked })
    );
    performBookmarkApiRequest();
  }, [debouncedBookmark]);

  const handleOnPress = () => {
    handleVibrate();
    switch (category) {
      case "like":
        setPrevLike(!prevLike);
        break;
      case "bookmark":
        setPrevBookmark(!prevBookmark);
        break;
      default:
        console.error("Not a valid category.");
    }
  };

  const handleVibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "lightgray",
      }}
      onPress={handleOnPress}
    >
      <SaveButtonIcons
        category={category}
        isBookmarked={prevBookmark}
        isLiked={prevLike}
      />
    </TouchableOpacity>
  );
};

export default SaveButton;
