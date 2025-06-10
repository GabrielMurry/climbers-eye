import { View, Text, TextInput, Switch, StyleSheet } from "react-native";
import React from "react";
import CommonTextInput from "../../common/CommonTextInput";
import { padding } from "../../../utils/styles";

type PreviewInputDataProps = {
  name: string;
  setName: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  isMatching: boolean;
  setIsMatching: (isMatching: boolean) => void;
  isFeetFollowHands: boolean;
  setIsFeetFollowHands: (isFeetFollowHands: boolean) => void;
  isKickboardOn: boolean;
  setIsKickboardOn: (isKickboardOn: boolean) => void;
  error: boolean;
};

const PreviewInputData: React.FC<PreviewInputDataProps> = ({
  name,
  setName,
  description,
  setDescription,
  isMatching,
  setIsMatching,
  isFeetFollowHands,
  setIsFeetFollowHands,
  isKickboardOn,
  setIsKickboardOn,
  error,
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        gap: 10,
        paddingHorizontal: padding.general,
      }}
    >
      <CommonTextInput value={name} setValue={setName} title="Boulder Name" />
      <CommonTextInput
        value={description}
        setValue={setDescription}
        title="Boulder Description"
      />
      <View style={styles.switchContainer}>
        <Text>Matching Allowed</Text>
        <Switch value={isMatching} onValueChange={setIsMatching} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Feet Follow Hands</Text>
        <Switch
          value={isFeetFollowHands}
          onValueChange={setIsFeetFollowHands}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>All Kickboard Footholds Allowed</Text>
        <Switch
          value={isKickboardOn}
          onValueChange={(value) => setIsKickboardOn(value)}
        />
      </View>
    </View>
  );
};

export default PreviewInputData;

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 100, // Adjust the height as needed
    textAlignVertical: "top", // Align the text at the top of the input
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
});
