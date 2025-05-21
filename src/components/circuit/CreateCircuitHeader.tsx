import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";
import { Pressable, Text } from "react-native";
import { NewCircuit } from "../../screens/circuit/CreateCircuitScreen";
import { createCircuit } from "../../services/circuit";
import { addNewCircuit } from "../../redux/features/circuit/circuitSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/native";

type CreateCircuitHeaderProps = {
  newCircuit: NewCircuit;
};

const CreateCircuitHeader: React.FC<CreateCircuitHeaderProps> = ({
  newCircuit,
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleCreateNewCircuit = async () => {
    const pathParams = { spraywallId: newCircuit.spraywall };
    const response = await createCircuit(pathParams, newCircuit);
    if (response.status === 201) {
      dispatch(addNewCircuit(response.data));
      navigation.goBack();
    } else {
      console.error(response.status);
      return;
    }
  };

  const RightButton = () => (
    <Pressable onPress={handleCreateNewCircuit}>
      <Text>Create</Text>
    </Pressable>
  );
  return <Header centerText="New Circuit" rightIcon={<RightButton />} />;
};

export default CreateCircuitHeader;
