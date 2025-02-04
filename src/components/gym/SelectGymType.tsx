import { View, Text } from "react-native";
import React from "react";
import { Switch } from "react-native-gesture-handler";

type SelectGymTypeProps = {
  isCommercialGym: boolean;
  setIsCommercialGym: (isCommercialGym: boolean) => void;
};

const SelectGymType: React.FC<SelectGymTypeProps> = ({
  isCommercialGym,
  setIsCommercialGym,
}) => {
  return (
    <View
      style={{
        alignSelf: "stretch",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Select Gym Type:
      </Text>
      <View
        style={{
          alignItems: "center",
          gap: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Commercial Gym
          </Text>
          <Switch
            value={isCommercialGym}
            onValueChange={() => setIsCommercialGym(!isCommercialGym)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Non-Commercial Gym (Home)
          </Text>
          <Switch
            value={!isCommercialGym}
            onValueChange={() => setIsCommercialGym(!isCommercialGym)}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectGymType;
