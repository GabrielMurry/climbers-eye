import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Vibration,
  Platform,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ArrowLongRightIcon, StarIcon } from "react-native-heroicons/outline";
import { request } from "../api/requestMethods";
import { useSelector } from "react-redux";
import { boulderGrades } from "../utils/constants/boulderConstants";
import * as Haptics from "expo-haptics";
import Header from "../components/general/Header";
import useCustomHeader from "../hooks/useCustomHeader";

const options = {
  attempts: ["-"],
  difficulty: ["-", ...boulderGrades],
};

for (let i = 1; i <= 100; i++) {
  options.attempts.push(i);
}

const SendScreen = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { boulder } = route.params;

  const [selectedAttempts, setSelectedAttempts] = useState("-");
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    boulder.grade ?? "-"
  );
  const [qualityCount, setQualityCount] = useState(3);
  const [showAttemptsPicker, setShowAttemptsPicker] = useState(false);
  const [showDifficultyPicker, setShowDifficultyPicker] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({ attempts: false, difficulty: false });

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Log Ascent",
  });

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
    if (selectedAttempts === "-") {
      console.log("MUST SELECT YOUR ATTEMPTS");
      setErrors((prev) => ({ ...prev, attempts: true }));
      return;
    }
    if (selectedDifficulty === "-") {
      console.log("MUST SELECT A DIFFICULTY");
      setErrors((prev) => ({ ...prev, difficulty: true }));
      return;
    }
    const data = {
      attempts: selectedAttempts,
      grade: selectedDifficulty,
      quality: qualityCount,
      notes: notes,
      person: user.id,
      boulder: boulder.id,
    };
    const response = await request(
      "post",
      `sent_boulder/${user.id}/${boulder.id}`,
      data
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    handleVibrate();
    navigation.goBack();
  };

  useEffect(() => {
    if (errors.attempts) {
      setErrors((prev) => ({ ...prev, attempts: false }));
    }
    if (errors.difficulty) {
      setErrors((prev) => ({ ...prev, difficulty: false }));
    }
  }, [selectedAttempts, selectedDifficulty]);

  const handleVibrate = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(245,245,245,255)" }}>
      {/* <Header navigation={navigation} title={"Send"} /> */}
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={{ gap: 5 }}>
            <View style={styles.row}>
              <Text style={styles.label}>Boulder:</Text>
              <Text style={styles.info}>{boulder.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.info}>{user.username}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.info}>{new Date().toLocaleString()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Your Ascents:</Text>
              <Text style={styles.info}>{boulder.userSendsCount}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.row,
                {
                  backgroundColor: "white",
                  borderColor: "red",
                  borderWidth: errors.attempts ? 1 : 0,
                },
              ]}
              onPress={toggleAttemptsPicker}
            >
              <Text style={styles.label}>Attempts:</Text>
              <View style={styles.info}>
                <Text>{selectedAttempts}</Text>
              </View>
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
            <TouchableOpacity
              style={[
                styles.row,
                {
                  backgroundColor: "white",
                  borderColor: "red",
                  borderWidth: errors.difficulty ? 1 : 0,
                },
              ]}
              onPress={toggleDifficultyPicker}
            >
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
            <View style={[styles.row, { backgroundColor: "white" }]}>
              <Text style={styles.label}>Quality:</Text>
              <View style={styles.info}>
                <StarIcon
                  size={35}
                  fill={qualityCount >= 1 ? "gold" : "lightgray"}
                  color={qualityCount >= 1 ? "gold" : "lightgray"}
                  onPress={() => setQualityCount(1)}
                />
                <StarIcon
                  size={35}
                  fill={qualityCount >= 2 ? "gold" : "lightgray"}
                  color={qualityCount >= 2 ? "gold" : "lightgray"}
                  onPress={() => setQualityCount(2)}
                />
                <StarIcon
                  size={35}
                  fill={qualityCount === 3 ? "gold" : "lightgray"}
                  color={qualityCount === 3 ? "gold" : "lightgray"}
                  onPress={() => setQualityCount(3)}
                />
              </View>
            </View>
            <View style={[styles.row, { backgroundColor: "white" }]}>
              <Text style={styles.label}>Notes:</Text>
              <TextInput
                style={styles.notesInput}
                multiline={true}
                placeholder="Enter notes..."
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
    height: 75,
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
