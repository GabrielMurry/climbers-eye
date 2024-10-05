import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { CheckIcon, LinkIcon, StarIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import QualityRating from "../boulder/QualityRating";
import { useNavigationContext } from "../../contexts/NavigationContext";

const BoulderCard = ({ boulder, navigation }) => {
  const { stackName } = useNavigationContext();

  const handleOnPress = () => {
    navigation.navigate(stackName, {
      screen: "Boulder",
      params: {
        boulderId: boulder.id,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={{ paddingHorizontal: 10 }}>
      <View style={styles.boulder}>
        <View style={styles.boulderLeftWrapper}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {boulder.name}
          </Text>
          <View style={styles.setterAndFA}>
            <Text>Setter: {boulder.setter}</Text>
            <Text>
              {" "}
              FA: {boulder.firstAscensionist ? boulder.firstAscensionist : "-"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <CheckIcon
              size={15}
              color={boulder.isSent ? "green" : "lightgray"}
            />
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
            <LinkIcon
              size={15}
              color={boulder.inCircuit ? "blue" : "lightgray"}
            />
          </View>
        </View>
        {boulder.publish ? null : (
          <View style={{ justifyContent: "center" }}>
            <Text style={{ color: "red", fontWeight: "bold" }}>Draft</Text>
          </View>
        )}
        <View style={styles.boulderIconsContainer}></View>
        <View style={styles.boulderRightWrapper}>
          <Text>{boulder.grade ? boulder.grade : "Project"}</Text>
          <QualityRating quality={boulder.quality} size={15} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
