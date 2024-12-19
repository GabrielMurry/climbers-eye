import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import { Gym } from "../../utils/types/gym";
import { useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";

type GymAndOption = {
  setIsModalVisible: (isVisible: boolean) => void;
};

const GymAndOptions: React.FC<GymAndOption> = ({ setIsModalVisible }) => {
  const gym = useAppSelector((state) => selectGym(state));

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          width: "90%",
        }}
        numberOfLines={1}
      >
        {gym.name}
      </Text>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <EllipsisHorizontalIcon size={35} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(
  GymAndOptions,
  (prevProps, nextProps) =>
    prevProps.gym.id === nextProps.gym.id &&
    prevProps.gym.name === nextProps.gym.name
);
