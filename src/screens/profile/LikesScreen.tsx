import { Text, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getLikeList } from "../../services/profile";
import BoulderCard from "../../components/common/boulderCard/BoulderCard";
import EmptyCard from "../../components/common/flatList/EmptyCard";
import ErrorCard from "../../components/common/ErrorCard";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import { Boulder } from "../../utils/types/boulder";
import LikesHeader from "../../components/profile/LikesHeader";
import { padding } from "../../utils/styles";
import {
  selectLikedBoulder,
  selectLikedBoulders,
  selectLikedBouldersCursor,
} from "../../redux/features/like/likeSelectors";
import { getNextPageLikedBoulders } from "../../services/boulder/boulder";
import { appendLikedBoulders } from "../../redux/features/like/likeSlice";

const LikesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const spraywall = useAppSelector((state) => selectSpraywall(state));
  const likedBoulders = useAppSelector((state) => selectLikedBoulders(state));
  const cursor = useAppSelector((state) => selectLikedBouldersCursor(state));

  if (!spraywall) {
    console.error("Spraywall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  const onEndReached = async () => {
    if (cursor) {
      const response = await getNextPageLikedBoulders(cursor);
      dispatch(
        appendLikedBoulders({
          boulders: response.data.results,
          cursor: response.data.next,
        })
      );
    }
  };

  const renderBoulderCard = ({ item }: { item: Boulder }) => {
    return <BoulderCard boulder={item} />;
  };

  // if (isErrorList) {
  //   return <ErrorCard message={"Error retrieving boulders."} />;
  // }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <LikesHeader />
      <FlatList
        data={likedBoulders}
        renderItem={renderBoulderCard}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onEndReached}
        // onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
        // ListFooterComponent={() => isLoadingList && <ActivityIndicator />}
        // refreshing={refreshing}
        style={{
          backgroundColor: "white",
          paddingHorizontal: padding.general,
        }}
        contentContainerStyle={{ gap: padding.general }}
      />
    </SafeAreaView>
  );
};

export default LikesScreen;
