import { View, Text, TextInput, FlatList } from "react-native";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useDebounce from "../../hooks/useDebounce";
import { debounce_speed } from "../../utils/constants/debounce";
import { selectFilters } from "../../redux/features/filter/filterSelectors";
import { setSearch } from "../../redux/features/filter/filterSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { padding } from "../../utils/styles";

const HEADER_HEIGHT = 50;
const TEXT_INPUT_HEIGHT = 40;
const PADDING = 20;
const TEXT_INPUT_COLOR = "rgba(100, 100, 100, 1)";
const TEXT_INPUT_COLOR_TRANSPARENT = "rgba(100, 100, 100, 0)";
const CONTENT_INSET_TOP = TEXT_INPUT_HEIGHT + PADDING;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type HomeHeaderProps = {
  scrollY: SharedValue<number>;
  flatListRef: RefObject<FlatList<any>>;
  inputRef: React.RefObject<TextInput>;
};

const HomeSearchInput: React.FC<HomeHeaderProps> = ({
  scrollY,
  flatListRef,
  inputRef,
}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => selectFilters(state));

  const [searchTerm, setSearchTerm] = useState(filters.search);

  const debouncedSearch = useDebounce(searchTerm, debounce_speed.MEDIUM);

  const animatedTextInputStyle = useAnimatedStyle(() => {
    const clampedHeight = Math.max(0, TEXT_INPUT_HEIGHT - scrollY.get());

    const color = interpolateColor(
      scrollY.value, // The shared value that we are using as the "progress"
      [0, TEXT_INPUT_HEIGHT], // Input range of the interpolation
      [TEXT_INPUT_COLOR, TEXT_INPUT_COLOR_TRANSPARENT] // Initial gray color to transparent
    );

    if (scrollY.get() <= 0) {
      return {
        height: TEXT_INPUT_HEIGHT,
        color: TEXT_INPUT_COLOR,
      };
    }

    return {
      height: clampedHeight,
      color: color,
    };
  });

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch]);

  return (
    <View
      style={{
        paddingHorizontal: padding.general,
        alignItems: "center",
        position: "absolute",
        top: HEADER_HEIGHT + insets.top,
        width: "100%",
        zIndex: 1,
      }}
    >
      <AnimatedTextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={"Search Boulders"}
        placeholderTextColor={TEXT_INPUT_COLOR}
        onFocus={() =>
          flatListRef.current?.scrollToOffset({
            offset: -CONTENT_INSET_TOP,
            animated: true,
          })
        }
        style={[
          {
            width: "100%",
            backgroundColor: "lightgray",
            borderRadius: 10,
            overflow: "hidden",
            paddingHorizontal: 20,
          },
          animatedTextInputStyle,
        ]}
        ref={inputRef}
      />
    </View>
  );
};

export default HomeSearchInput;
