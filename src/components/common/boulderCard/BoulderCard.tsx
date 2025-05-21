import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CheckIcon, LinkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import QualityRating from "../../boulder/QualityRating";
import { useNavigationContext } from "../../../contexts/NavigationContext";
import { useNavigation } from "@react-navigation/native";
import { Boulder } from "../../../utils/types/boulder";
import BoulderImage from "../../boulder/BoulderImage";
import { useAppSelector } from "../../../redux/hooks";
import { selectSpraywall } from "../../../redux/features/spraywall/spraywallSelectors";
import Icons from "./Icons";
import Placeholder from "./Placeholder";
import CardImage from "./CardImage";
import Details from "./Details";

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

    const [isWallLoading, setIsWallLoading] = useState(true);
    const [isBoulderLoading, setIsBoulderLoading] = useState(true);

    const handleOnPress = () => {
      // navigation.navigate("TabsStack", {
      //   screen: stackName,
      //   params: { screen: "Boulder", params: { boulder } },
      // });
      navigation.navigate("BoulderStack", {
        screen: "Boulder",
        params: { boulder },
      });
    };

    return (
      <Pressable onPress={handleOnPress} style={{ gap: 5 }}>
        <View style={{ width: "100%", height: 250 }}>
          {isWallLoading || isBoulderLoading ? <Placeholder /> : null}
          <CardImage
            boulder={boulder}
            spraywall={spraywall}
            setIsBoulderLoading={setIsBoulderLoading}
            setIsWallLoading={setIsWallLoading}
          />
        </View>
        <Details boulder={boulder} />
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    return prevProps === nextProps;
  }
);

export default BoulderCard;
