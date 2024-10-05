import { View, Text, TextInput, Switch, StyleSheet } from "react-native";
import React from "react";
import CustomInput from "../../custom/CustomInput";

const PreviewInputData = ({
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
    <View style={styles.container}>
      <CustomInput
        value={name}
        setValue={(value) => setName(value)}
        placeholder="Boulder Name"
        secureTextEntry={false}
        error={error}
        bordered={true}
        rounded={true}
      />
      <TextInput
        value={description}
        onChangeText={(value) => setDescription(value)}
        placeholder={"Boulder Description (optional)"}
        keyboardType="default" // twitter???
        style={styles.textInput}
        multiline={true}
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
        <Switch value={isKickboardOn} onValueChange={setIsKickboardOn} />
      </View>
    </View>
  );
};

export default PreviewInputData;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: "center",
    gap: 10,
  },
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
