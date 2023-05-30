import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StarIcon } from "react-native-heroicons/outline";
import { request } from "../api/requestMethods";
import { useSelector } from "react-redux";

const options = {
  attempts: [],
  difficulty: [
    "4a/V0",
    "4b/V0",
    "4c/V0",
    "5a/V1",
    "5b/V1",
    "5c/V2",
    "6a/V3",
    "6a+/V3",
    "6b/V4",
    "6b+/V4",
    "6c/V5",
    "6c+/V5",
    "7a/V6",
    "7a+/V7",
    "7b/V8",
    "7b+/V8",
    "7c/V9",
    "7c+/V10",
    "8a/V11",
    "8a+/V12",
    "8b/V13",
    "8b+/V14",
    "8c/V15",
    "8c+/V16",
  ],
};

for (let i = 1; i <= 100; i++) {
  options.attempts.push(i);
}

const SendScreen = ({ route, navigation }) => {
  const { userID } = useSelector((state) => state.userReducer);
  const { username } = useSelector((state) => state.userReducer);
  const { boulder } = route.params;

  const [selectedAttempts, setSelectedAttempts] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    boulder.grade ?? "?"
  );
  const [qualityCount, setQualityCount] = useState(3);
  const [showAttemptsPicker, setShowAttemptsPicker] = useState(false);
  const [showDifficultyPicker, setShowDifficultyPicker] = useState(false);
  const [notes, setNotes] = useState("");

  const fadeAnim = useState(new Animated.Value(0))[0];

  const renderPickerItems = (optionType) => {
    return options[optionType].map((option) => (
      <Picker.Item key={option} label={option.toString()} value={option} />
    ));
  };

  const toggleAttemptsPicker = () => {
    setShowAttemptsPicker(!showAttemptsPicker);
    Animated.timing(fadeAnim, {
      toValue: showAttemptsPicker ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleDifficultyPicker = () => {
    setShowDifficultyPicker(!showDifficultyPicker);
    Animated.timing(fadeAnim, {
      toValue: showDifficultyPicker ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  handleSubmit = async () => {
    if (selectedDifficulty === "?") {
      console.log("MUST SELECT A DIFFICULTY");
      return;
    }
    const data = {
      attempts: selectedAttempts,
      grade: selectedDifficulty,
      quality: qualityCount,
      notes: notes,
      person: userID,
      boulder: boulder.id,
    };
    const response = await request(
      "post",
      `sent_boulder/${boulder.id}/${userID}`,
      data
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    navigation.goBack();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Boulder:</Text>
          <Text style={styles.info}>{boulder.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User:</Text>
          <Text style={styles.info}>{username}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.info}>{new Date().toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={toggleAttemptsPicker}>
          <Text style={styles.label}>Attempts:</Text>
          <Text style={styles.info}>{selectedAttempts}</Text>
        </TouchableOpacity>
        {showAttemptsPicker && (
          <Animated.View
            style={[styles.pickerContainer, { opacity: fadeAnim }]}
          >
            <Picker
              selectedValue={selectedAttempts}
              onValueChange={(value) => {
                setSelectedAttempts(value);
                toggleAttemptsPicker();
              }}
            >
              {renderPickerItems("attempts")}
            </Picker>
          </Animated.View>
        )}
        <TouchableOpacity style={styles.row} onPress={toggleDifficultyPicker}>
          <Text style={styles.label}>Difficulty:</Text>
          <Text style={styles.info}>{selectedDifficulty}</Text>
        </TouchableOpacity>
        {showDifficultyPicker && (
          <Animated.View
            style={[styles.pickerContainer, { opacity: fadeAnim }]}
          >
            <Picker
              selectedValue={selectedDifficulty}
              onValueChange={(value) => {
                setSelectedDifficulty(value);
                toggleDifficultyPicker();
              }}
            >
              {renderPickerItems("difficulty")}
            </Picker>
          </Animated.View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Quality:</Text>
          <View style={styles.info}>
            <StarIcon
              size={35}
              fill={qualityCount >= 1 ? "gold" : "black"}
              color={qualityCount >= 1 ? "gold" : "black"}
              onPress={() => setQualityCount(1)}
            />
            <StarIcon
              size={35}
              fill={qualityCount >= 2 ? "gold" : "black"}
              color={qualityCount >= 2 ? "gold" : "black"}
              onPress={() => setQualityCount(2)}
            />
            <StarIcon
              size={35}
              fill={qualityCount === 3 ? "gold" : "black"}
              color={qualityCount === 3 ? "gold" : "black"}
              onPress={() => setQualityCount(3)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Notes:</Text>
          <TextInput
            style={styles.notesInput}
            multiline={true}
            placeholder="Enter notes..."
            value={notes}
            onChangeText={setNotes}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
    color: "#333",
  },
  info: {
    flexDirection: "row",
    flex: 2,
    fontSize: 16,
    color: "#555",
  },
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
  notesInput: {
    flex: 2,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    color: "#555",
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SendScreen;
