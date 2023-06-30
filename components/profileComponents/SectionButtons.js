import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const SectionButtons = ({ section, setSection, sections }) => {
  return (
    <View style={styles.sectionsContainer}>
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setSection(sections.logbook)}
      >
        <Text
          style={{
            fontWeight: "bold",
            opacity: section === "logbook" ? 1 : 0.3,
          }}
        >
          Logbook
        </Text>
        <View
          style={{
            backgroundColor: "black",
            width: "100%",
            height: 2,
            bottom: 0,
            position: "absolute",
            opacity: section === "logbook" ? 1 : 0,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setSection(sections.creations)}
      >
        <Text
          style={{
            fontWeight: "bold",
            opacity: section === "creations" ? 1 : 0.3,
          }}
        >
          Creations
        </Text>
        <View
          style={{
            backgroundColor: "black",
            width: "100%",
            height: 2,
            bottom: 0,
            position: "absolute",
            opacity: section === "creations" ? 1 : 0,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setSection(sections.likes)}
      >
        <Text
          style={{
            fontWeight: "bold",
            opacity: section === "likes" ? 1 : 0.3,
          }}
        >
          Likes
        </Text>
        <View
          style={{
            backgroundColor: "black",
            width: "100%",
            height: 2,
            bottom: 0,
            position: "absolute",
            opacity: section === "likes" ? 1 : 0,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setSection(sections.bookmarks)}
      >
        <Text
          style={{
            fontWeight: "bold",
            opacity: section === "bookmarks" ? 1 : 0.3,
          }}
        >
          Bookmarks
        </Text>
        <View
          style={{
            backgroundColor: "black",
            width: "100%",
            height: 2,
            bottom: 0,
            position: "absolute",
            opacity: section === "bookmarks" ? 1 : 0,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setSection(sections.circuits)}
      >
        <Text
          style={{
            fontWeight: "bold",
            opacity: section === "circuits" ? 1 : 0.3,
          }}
        >
          Circuits
        </Text>
        <View
          style={{
            backgroundColor: "black",
            width: "100%",
            height: 2,
            bottom: 0,
            position: "absolute",
            opacity: section === "circuits" ? 1 : 0,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SectionButtons;

const styles = StyleSheet.create({
  sectionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  sectionButton: {
    paddingVertical: 12,
  },
});
