import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../utils/styles";

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
  isEmphasized = false,
}) => {
  return (
    <TouchableOpacity
      style={
        isEmphasized
          ? [
              styles.modalButton,
              { borderWidth: 1, borderColor: colors.primary },
            ]
          : styles.modalButton
      }
      onPress={onPress}
    >
      {icon}
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  modalButton: {
    width: 100,
    aspectRatio: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "bold",
  },
});
