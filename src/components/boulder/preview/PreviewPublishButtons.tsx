import { View } from "react-native";
import React from "react";
import CommonSubmitButton from "../../common/CommonSubmitButton";
import { padding } from "../../../utils/styles";

type PreviewPublishButtonsProps = {
  handleConfirm: (value: boolean) => void;
  isLoading: boolean;
};

const PreviewPublishButtons: React.FC<PreviewPublishButtonsProps> = ({
  handleConfirm,
  isLoading,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        gap: 20,
        paddingHorizontal: padding.general,
      }}
    >
      <CommonSubmitButton
        onPress={() => handleConfirm(false)}
        title="Drafts"
        isSecondary={true}
      />
      <CommonSubmitButton onPress={() => handleConfirm(true)} title="Publish" />
    </View>
  );
};

export default PreviewPublishButtons;
