import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../../utils/styles";

type ModalButtonProps = {
  onPress: () => void;
  icon: React.JSX.Element;
  label: string;
  isEmphasized?: boolean;
};

const ModalButton: React.FC<ModalButtonProps> = ({
  onPress,
  icon,
  label,
  isEmphasized,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.primary,
      }}
    >
      {icon}
      <Text style={{ color: "black" }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ModalButton;
