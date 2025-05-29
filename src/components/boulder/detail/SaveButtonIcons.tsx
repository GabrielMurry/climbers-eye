import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Category } from "./SaveButton";

type SaveButtonIconsProps = {
  category: Category;
  isLiked: boolean;
  isBookmarked: boolean;
};

const SaveButtonIcons: React.FC<SaveButtonIconsProps> = ({
  category,
  isLiked,
  isBookmarked,
}) => {
  switch (category) {
    case "like":
      return (
        <>
          {isLiked ? (
            <FontAwesome name="heart" size={22} color="red" />
          ) : (
            <FontAwesome name="heart-o" size={22} color="lightgray" />
          )}
        </>
      );
    case "bookmark":
      return (
        <>
          {isBookmarked ? (
            <FontAwesome name="bookmark" size={22} color="gold" />
          ) : (
            <FontAwesome name="bookmark-o" size={22} color="lightgray" />
          )}
        </>
      );
    default:
      return null;
  }
};

export default SaveButtonIcons;
