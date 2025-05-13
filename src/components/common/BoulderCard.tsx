import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { CheckIcon, LinkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import QualityRating from "../boulder/QualityRating";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { useNavigation } from "@react-navigation/native";
import { Boulder } from "../../utils/types/boulder";
import BoulderImage from "../boulder/BoulderImage";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";

type BoulderCardProps = {
  boulder: Boulder;
};

const BoulderCard: React.FC<BoulderCardProps> = React.memo(
  ({ boulder }) => {
    const navigation = useNavigation();
    const stackName = useNavigationContext();

    const spraywall = useAppSelector((state) => selectSpraywall(state));
    if (!spraywall) {
      return;
    }

    const handleOnPress = () => {
      navigation.navigate("TabsStack", {
        screen: stackName,
        params: { screen: "Boulder", params: { boulder } },
      });
    };

    const Icons = () => (
      <View style={{ flexDirection: "row", gap: 10 }}>
        <CheckIcon size={15} color={boulder.isSent ? "green" : "lightgray"} />
        <FontAwesome
          name="heart"
          size={15}
          color={boulder.isLiked ? "red" : "lightgray"}
        />
        <FontAwesome
          name="bookmark"
          size={15}
          color={boulder.isBookmarked ? "gold" : "lightgray"}
        />
        <LinkIcon size={15} color={boulder.inCircuit ? "blue" : "lightgray"} />
      </View>
    );

    return (
      <Pressable onPress={handleOnPress} style={{ gap: 5 }}>
        <View style={{ width: "100%", height: 250 }}>
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
            }}
            imageStyle={{ borderRadius: 20 }}
            source={{
              uri: boulder.altWallThumbnailUrl
                ? boulder.altWallThumbnailUrl
                : spraywall.thumbnailUrl,
            }}
          >
            <Image
              source={{ uri: boulder.url }}
              style={{
                width: "100%",
                height: "100%",
                opacity: 0.5,
                borderRadius: 20,
              }}
            />
            {/* <Icons /> */}
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {boulder.name}
            </Text>
            <Text>{boulder.setter}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {boulder.grade ? boulder.grade : "Project"}
            </Text>
            <QualityRating quality={boulder.quality} size={15} />
          </View>
        </View>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    return prevProps === nextProps;
  }
);

const styles = StyleSheet.create({
  boulder: {
    height: 80,
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  boulderLeftWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  setterAndFA: {
    flexDirection: "row",
  },
  boulderIconsContainer: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  boulderIconsRow: {
    flexDirection: "row",
    gap: 5,
  },
  boulderRightWrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
});

export default BoulderCard;
