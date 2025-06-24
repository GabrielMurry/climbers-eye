import { View, Text, Dimensions, FlatList } from "react-native";
import React from "react";
import SpraywallCard from "../home/SpraywallCard";
import { useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import { selectSpraywalls } from "../../redux/features/spraywall/spraywallSelectors";
import { Spraywall } from "../../utils/types/spraywall";
import { padding } from "../../utils/styles";

const width = Dimensions.get("window").width;

const GymSection = () => {
  const gym = useAppSelector((state) => selectGym(state));
  const spraywalls = useAppSelector((state) => selectSpraywalls(state));

  const renderSpraywallCard = ({ item }: { item: Spraywall }) => (
    <SpraywallCard spraywallCard={item} highlight={true} />
  );

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: padding.general,
      }}
    >
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          height: 30,
          alignItems: "center",
        }}
      >
        {/* section title */}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{gym.name}</Text>
      </View>
      <FlatList
        data={spraywalls}
        renderItem={renderSpraywallCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          height: 150,
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

export default GymSection;
