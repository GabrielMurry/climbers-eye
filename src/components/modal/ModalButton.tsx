import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

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
    <TouchableOpacity onPress={onPress}>
      {icon}
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default ModalButton;
