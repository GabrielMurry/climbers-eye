import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const ModalButton = ({
  onPress,
  icon: IconComponent,
  label,
  colors,
  isEmphasized = false,
}) => {
  return (
    <TouchableOpacity
      style={
        isEmphasized
          ? styles.emphasizedModalButton(colors)
          : styles.modalButton(colors)
      }
      onPress={onPress}
    >
      <IconComponent size={25} color={colors.primary} />
      <Text style={styles.buttonText(colors)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  modalButton: (colors) => ({
    width: 100,
    aspectRatio: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  }),
  emphasizedModalButton: (colors) => ({
    width: 100,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  }),
  buttonText: (colors) => ({
    color: colors.primary,
    fontSize: 12,
    fontWeight: "bold",
  }),
});
