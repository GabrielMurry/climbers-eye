import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { CheckIcon, LinkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import QualityRating from "../boulder/QualityRating";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { useNavigation } from "@react-navigation/native";
import { Boulder } from "../../utils/types/boulder";

type BoulderCardProps = {
  boulder: Boulder;
};

const BoulderCard = React.memo((props: BoulderCardProps) => {
  const navigation = useNavigation();
  const stackName = useNavigationContext();

  const handleOnPress = () => {
    navigation.navigate("TabsStack", {
      screen: stackName,
      params: { screen: "Boulder", params: { boulder: props.boulder } },
    });
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={{ paddingHorizontal: 10 }}>
      <View style={styles.boulder}>
        <View style={styles.boulderLeftWrapper}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {props.boulder.name}
          </Text>
          <View style={styles.setterAndFA}>
            <Text>Setter: {props.boulder.setter}</Text>
            <Text>
              {" "}
              FA:{" "}
              {props.boulder.firstAscensionist
                ? props.boulder.firstAscensionist
                : "-"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <CheckIcon
              size={15}
              color={props.boulder.isSent ? "green" : "lightgray"}
            />
            <FontAwesome
              name="heart"
              size={15}
              color={props.boulder.isLiked ? "red" : "lightgray"}
            />
            <FontAwesome
              name="bookmark"
              size={15}
              color={props.boulder.isBookmarked ? "gold" : "lightgray"}
            />
            <LinkIcon
              size={15}
              color={props.boulder.inCircuit ? "blue" : "lightgray"}
            />
          </View>
        </View>
        {props.boulder.publish ? null : (
          <View style={{ justifyContent: "center" }}>
            <Text style={{ color: "red", fontWeight: "bold" }}>Draft</Text>
          </View>
        )}
        <View style={styles.boulderIconsContainer}></View>
        <View style={styles.boulderRightWrapper}>
          <Text>{props.boulder.grade ? props.boulder.grade : "Project"}</Text>
          <QualityRating quality={props.boulder.quality} size={15} />
        </View>
      </View>
    </TouchableOpacity>
  );
});

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
