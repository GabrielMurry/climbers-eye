import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export const HighlightedText = ({ text, highlight }) => {
  if (!highlight) {
    return <Text>{text}</Text>;
  }

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <Text>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text key={index} style={styles.highlight}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};

const TestDrawScreen = () => {
  const [highlight, setHighlight] = useState("");
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );

  const handleTextChange = (input) => {
    setHighlight(input);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={highlight}
        onChangeText={handleTextChange}
        placeholder="Type here to highlight"
      />
      <HighlightedText text={text} highlight={highlight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  highlight: {
    backgroundColor: "yellow",
  },
});

export default TestDrawScreen;
