import {
  View,
  Text,
  TextInput,
  FlatList,
  InteractionManager,
} from "react-native";
import React, { RefObject } from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import { padding } from "../../utils/styles";

const TEXT_INPUT_HEIGHT = 40;
const HEADER_HEIGHT = 50;

type HomeHeaderTopRowProps = {
  flatListRef: RefObject<FlatList<any>>;
  inputRef: React.RefObject<TextInput>;
  scrollY: SharedValue<number>;
};

const HomeHeader: React.FC<HomeHeaderTopRowProps> = ({
  flatListRef,
  inputRef,
  scrollY,
}) => {
  const navigation = useNavigation();

  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    return null;
  }

  const animatedSearchIcon = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, TEXT_INPUT_HEIGHT], [0, 1]);
    return {
      opacity: opacity,
    };
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: HEADER_HEIGHT,
        paddingHorizontal: padding.general,
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>{spraywall.name}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Animated.View style={animatedSearchIcon}>
          <MagnifyingGlassIcon
            color={"black"}
            size={30}
            onPress={() => {
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              });
              inputRef.current?.focus();
            }}
          />
        </Animated.View>
        <AdjustmentsHorizontalIcon
          color={"black"}
          size={30}
          onPress={() =>
            navigation.navigate("TabsStack", {
              screen: "HomeStack",
              params: { screen: "FilterHomeList" },
            })
          }
        />
      </View>
    </View>
  );
};

export default HomeHeader;
