import { FlatList, TextInput, View } from "react-native";
import React, { useRef } from "react";
import BoulderCard from "../../components/common/boulderCard/BoulderCard";
import { useBoulderData } from "../../hooks/useBoulderData";
import Footer from "../../components/common/flatList/Footer";
import Empty from "../../components/common/flatList/Empty";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import HomeSearchInput from "../../components/home/HomeSearchInput";
import HomeHeader from "../../components/home/HomeHeader";

const HEADER_HEIGHT = 50;
const TEXT_INPUT_HEIGHT = 40;
const HOME_HEADER = HEADER_HEIGHT + TEXT_INPUT_HEIGHT;
const PADDING = 20;
const CONTENT_INSET_TOP = TEXT_INPUT_HEIGHT + PADDING;

const HomeScreen = () => {
  const hasEditPermission = true;
  const insets = useSafeAreaInsets();

  const {
    boulders,
    isInitialPageLoading,
    isNextPageLoading,
    error,
    refreshBoulders,
    nextPageBoulders,
  } = useBoulderData();

  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y + CONTENT_INSET_TOP;
    },
  });

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "white" }}>
      {/* <HomeHeader scrollY={scrollY} flatListRef={flatListRef} /> */}
      <HomeHeader
        inputRef={inputRef}
        flatListRef={flatListRef}
        scrollY={scrollY}
      />
      <HomeSearchInput
        inputRef={inputRef}
        flatListRef={flatListRef}
        scrollY={scrollY}
      />
      <Animated.FlatList
        data={boulders}
        renderItem={({ item }) => <BoulderCard boulder={item} />}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
        onEndReached={nextPageBoulders}
        onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
        ListFooterComponent={<Footer isLoading={isNextPageLoading} />}
        ListEmptyComponent={<Empty isLoading={isInitialPageLoading} />}
        onRefresh={refreshBoulders}
        refreshing={isInitialPageLoading}
        style={{
          backgroundColor: "white",
          paddingHorizontal: PADDING,
        }}
        contentContainerStyle={{ gap: PADDING }}
        onScroll={scrollHandler}
        ref={flatListRef}
        contentInset={{ top: CONTENT_INSET_TOP }}
      />
    </View>
  );
};

export default HomeScreen;
