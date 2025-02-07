import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { TouchableOpacity, View } from "react-native";
import GymCard from "../gym/GymCard";
import { useCallback } from "react";
import { Gym } from "../../utils/types/gym";
import { useNavigation } from "@react-navigation/native";

type GymBottomSheetSearchResultProps = {
  gyms: Gym[];
  handleGymCardPress: (gym: Gym) => void;
};

const GymBottomSheetSearchResult: React.FC<GymBottomSheetSearchResultProps> = ({
  gyms,
  handleGymCardPress,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Gym }) => (
      <TouchableOpacity onPress={() => handleGymCardPress(item)}>
        <GymCard gym={item} />
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={{ backgroundColor: "lightgray", height: 1 }} />
      <BottomSheetFlatList
        data={gyms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default GymBottomSheetSearchResult;
