import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Switch,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import CustomInput from "../../components/custom/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/custom/CustomButton";
import { colors } from "../../utils/styles";
import { createCircuit } from "../../services/circuit";
import { useFetch } from "../../hooks/useFetch";
import { addNewCircuit } from "../../redux/features/circuit/circuitSlice";

const AddNewCircuitScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );

  const [newCircuitName, setNewCircuitName] = useState("");
  const [newCircuitDescription, setNewCircuitDescription] = useState("");
  const [newCircuitColor, setNewCircuitColor] = useState("green");
  const [isNewCircuitPrivate, setIsNewCircuitPrivate] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [fetchCreate, isLoadingCreate, isErrorCreate] = useFetch(createCircuit);

  const handleAddNewCircuitPress = async () => {
    const data = {
      name: newCircuitName,
      description: newCircuitDescription,
      color: newCircuitColor,
      private: isNewCircuitPrivate,
      person: user.id,
      spraywall: spraywalls[spraywallIndex].id,
    };
    const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
    const response = await fetchCreate({ pathParams, data });
    if (response.status === 201) {
      dispatch(addNewCircuit(response.data));
      navigation.goBack();
    } else {
      console.error(response.status);
      return;
    }
  };

  useCustomHeader({
    navigation,
    title: "Add New Circuit",
  });

  useEffect(() => {
    if (newCircuitName !== "") {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [newCircuitName]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ gap: 10 }}>
          <View style={styles.row}>
            <Text>Circuit Name</Text>
            <CustomInput
              value={newCircuitName}
              setValue={(value) => setNewCircuitName(value)}
              placeholder="Circuit Name"
              secureTextEntry={false}
              bordered={true}
              rounded={true}
            />
          </View>
          <View style={styles.row}>
            <Text>Circuit Description</Text>
            <CustomInput
              value={newCircuitDescription}
              setValue={(value) => setNewCircuitDescription(value)}
              placeholder="Circuit Description"
              secureTextEntry={false}
              bordered={true}
              rounded={true}
            />
          </View>
          <View style={styles.row}>
            <Text>Circuit Color</Text>
            <View style={styles.colorSwatchContainer}>
              <Pressable
                style={styles.colorSwatchButton("green")}
                onPress={() => setNewCircuitColor("green")}
              >
                {newCircuitColor === "green" ? (
                  <View style={styles.selectedSwatchIndicator} />
                ) : null}
              </Pressable>
              <Pressable
                style={styles.colorSwatchButton("blue")}
                onPress={() => setNewCircuitColor("blue")}
              >
                {newCircuitColor === "blue" ? (
                  <View style={styles.selectedSwatchIndicator} />
                ) : null}
              </Pressable>
              <Pressable
                style={styles.colorSwatchButton("yellow")}
                onPress={() => setNewCircuitColor("yellow")}
              >
                {newCircuitColor === "yellow" ? (
                  <View style={styles.selectedSwatchIndicator} />
                ) : null}
              </Pressable>
              <Pressable
                style={styles.colorSwatchButton("pink")}
                onPress={() => setNewCircuitColor("pink")}
              >
                {newCircuitColor === "pink" ? (
                  <View style={styles.selectedSwatchIndicator} />
                ) : null}
              </Pressable>
              <Pressable
                style={styles.colorSwatchButton("orange")}
                onPress={() => setNewCircuitColor("orange")}
              >
                {newCircuitColor === "orange" ? (
                  <View style={styles.selectedSwatchIndicator} />
                ) : null}
              </Pressable>
              <Pressable
                style={styles.colorSwatchButton("red")}
                onPress={() => setNewCircuitColor("red")}
              >
                {newCircuitColor === "red" ? (
                  <View style={styles.selectedSwatchIndicator} />
                ) : null}
              </Pressable>
              <Pressable
                style={styles.colorSwatchButton("purple")}
                onPress={() => setNewCircuitColor("purple")}
              >
                {newCircuitColor === "purple" ? (
                  <View style={styles.selectedSwatchIndicator} />
                ) : null}
              </Pressable>
              <Pressable
                style={styles.colorSwatchButton("black")}
                onPress={() => setNewCircuitColor("black")}
              >
                {newCircuitColor === "black" ? (
                  <View style={styles.selectedSwatchIndicator} />
                ) : null}
              </Pressable>
            </View>
          </View>
          <View style={styles.privateCircuitContainer}>
            <Text style={styles.privateCircuitText}>Private Circuit</Text>
            <Switch
              value={isNewCircuitPrivate}
              onValueChange={() => setIsNewCircuitPrivate(!isNewCircuitPrivate)}
            />
          </View>
        </View>
        <CustomButton
          onPress={handleAddNewCircuitPress}
          text="Add"
          disabled={isSubmitDisabled}
          bgColor={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddNewCircuitScreen;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  bottomSheet: {
    paddingHorizontal: 20,
    gap: 22,
  },
  newCircuitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  newCircuitButton: {
    width: 55,
    alignItems: "center",
  },
  newCircuitButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "rgb(0, 122, 255)",
  },
  newCircuitTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  newCircuitTextInputContainer: {
    width: "100%",
    gap: 5,
  },
  newCircuitTextInput: (type) => ({
    backgroundColor: "rgb(229, 228, 226)",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    height: type === "description" ? 75 : 35,
  }),
  colorSwatchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  colorSwatchButton: (color) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  }),
  selectedSwatchIndicator: {
    width: 6,
    height: 6,
    borderRadius: "100%",
    backgroundColor: "white",
  },
  subTitles: {
    fontWeight: "bold",
  },
  privateCircuitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  privateCircuitText: {
    fontSize: 16,
  },
  row: {
    gap: 5,
  },
});
