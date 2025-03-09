import { View, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../../custom/CustomButton";
import { colors } from "../../../utils/styles";

type PreviewPublishButtonsProps = {
  handleConfirm: (value: boolean) => void;
  isLoading: boolean;
};

const PreviewPublishButtons: React.FC<PreviewPublishButtonsProps> = ({
  handleConfirm,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <CustomButton
        onPress={() => handleConfirm(false)}
        text="Drafts"
        type="TERTIARY"
        width="45%"
        bgColor={"rgba(245, 245, 245, 255)"}
        // disabled={isLoading}
      />
      <CustomButton
        onPress={() => handleConfirm(true)}
        text="Publish"
        width="45%"
        bgColor={colors.primary}
        // disabled={isLoading}
      />
    </View>
  );
};

export default PreviewPublishButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    flex: 1,
  },
});
