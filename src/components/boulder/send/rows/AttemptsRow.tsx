import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { Picker } from "@react-native-picker/picker";

type AttemptsRowProps = {
  value: string;
  setValue: (val: string) => void;
};

const ATTEMPTS = ["-"];

for (let i = 1; i <= 100; i++) {
  ATTEMPTS.push(i.toString());
}

const AttemptsRow: React.FC<AttemptsRowProps> = ({ value, setValue }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "white",
        }}
        onPress={() => setShowPicker((prev) => !prev)}
      >
        <Text
          style={{
            flex: 1,
            fontWeight: "bold",
            marginRight: 10,
            fontSize: 16,
            color: "#333",
          }}
        >
          Attempts:
        </Text>
        <View
          style={{
            flexDirection: "row",
            flex: 2,
          }}
        >
          <Text style={{ fontSize: 16, color: "#555" }}>{value}</Text>
        </View>
      </TouchableOpacity>
      {showPicker && (
        <Animated.View style={styles.pickerContainer}>
          <Picker
            selectedValue={value}
            onValueChange={(value) => {
              setValue(value);
            }}
          >
            {ATTEMPTS.map((attempt) => (
              <Picker.Item key={attempt} label={attempt} value={attempt} />
            ))}
          </Picker>
        </Animated.View>
      )}
    </>
  );
};

export default AttemptsRow;

const styles = StyleSheet.create({
  pickerContainer: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
