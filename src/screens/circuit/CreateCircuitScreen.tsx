import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/custom/CustomInput";
import CustomButton from "../../components/custom/CustomButton";
import { colors } from "../../utils/styles";
import { createCircuit } from "../../services/circuit";
import { addNewCircuit } from "../../redux/features/circuit/circuitSlice";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import CreateCircuitHeader from "../../components/circuit/CreateCircuitHeader";
import CircuitColorInput from "../../components/circuit/CircuitColorInput";
import PrivateCircuitInput from "../../components/circuit/PrivateCircuitInput";
import { CircuitColor } from "../../utils/types/circuit";

const CreateCircuitScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => selectUser(state));
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    console.error("Spraywall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  const [newCircuitName, setNewCircuitName] = useState("");
  const [newCircuitDescription, setNewCircuitDescription] = useState("");
  const [newCircuitColor, setNewCircuitColor] = useState<CircuitColor>("green");
  const [isNewCircuitPrivate, setIsNewCircuitPrivate] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleAddNewCircuitPress = async () => {
    const data = {
      name: newCircuitName,
      description: newCircuitDescription,
      color: newCircuitColor,
      private: isNewCircuitPrivate,
      person: user.id,
      spraywall: spraywall.id,
    };
    const pathParams = { spraywallId: spraywall.id };
    const response = await createCircuit(pathParams, data);
    if (response.status === 201) {
      dispatch(addNewCircuit(response.data));
      navigation.goBack();
    } else {
      console.error(response.status);
      return;
    }
  };

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
      <CreateCircuitHeader />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ gap: 10 }}>
          <CustomInput
            value={newCircuitName}
            setValue={(value) => setNewCircuitName(value)}
            placeholder="Circuit Name"
            secureTextEntry={false}
            bordered={true}
            rounded={true}
            title="Circuit Name"
          />
          <CustomInput
            value={newCircuitDescription}
            setValue={(value) => setNewCircuitDescription(value)}
            placeholder="Circuit Description"
            secureTextEntry={false}
            bordered={true}
            rounded={true}
            title="Circuit Description"
          />
          <CircuitColorInput
            chosenColor={newCircuitColor}
            setChosenColor={setNewCircuitColor}
          />
          <PrivateCircuitInput
            isPrivate={isNewCircuitPrivate}
            setIsPrivate={setIsNewCircuitPrivate}
          />
        </View>
        <CustomButton
          onPress={handleAddNewCircuitPress}
          text="Create"
          disabled={isSubmitDisabled}
          bgColor={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateCircuitScreen;
