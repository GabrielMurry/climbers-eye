import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

type CreateGymFooterProps = {
  isCommercialGym: boolean;
  handleAddGym: () => void;
  isLoading: boolean;
};

const CreateGymFooter: React.FC<CreateGymFooterProps> = ({
  isCommercialGym,
  handleAddGym,
  isLoading,
}) => {
  return (
    <View
      style={{ flex: 1, justifyContent: "flex-end", paddingHorizontal: 20 }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#007aff",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleAddGym}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Add {isCommercialGym ? "Gym" : "Home"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateGymFooter;
