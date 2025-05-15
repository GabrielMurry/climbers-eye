import { View, TextInput, FlatList } from "react-native";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeHeaderTopRow from "./HomeHeaderTopRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFilters } from "../../redux/features/filter/filterSelectors";
import { debounce } from "lodash";
import { debounce_speed } from "../../utils/constants/debounce";
import useDebounce from "../../hooks/useDebounce";
import { setSearch } from "../../redux/features/filter/filterSlice";

const HEADER_HEIGHT = 50;
const TEXT_INPUT_HEIGHT = 40;
const PADDING = 20;
const TEXT_INPUT_COLOR = "rgba(100, 100, 100, 1)";
const TEXT_INPUT_COLOR_TRANSPARENT = "rgba(100, 100, 100, 0)";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type HomeHeaderProps = {
  scrollY: SharedValue<number>;
  flatListRef: RefObject<FlatList<any>>;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ scrollY, flatListRef }) => {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => selectFilters(state));

  const [searchTerm, setSearchTerm] = useState(filters.search);

  const inputRef = useRef<TextInput>(null);

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
        position: "absolute",
        top: insets.top,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "white",
        height: HEADER_HEIGHT,
        paddingHorizontal: PADDING,
      }}
    >
      <HomeHeaderTopRow
        flatListRef={flatListRef}
        inputRef={inputRef}
        scrollY={scrollY}
      />
      <AnimatedTextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={"Search Boulders"}
        placeholderTextColor={TEXT_INPUT_COLOR}
        onFocus={() =>
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
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

export default HomeHeader;
