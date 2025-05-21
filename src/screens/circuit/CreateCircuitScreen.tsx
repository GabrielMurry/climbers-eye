import { View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import CreateCircuitHeader from "../../components/circuit/CreateCircuitHeader";
import CircuitColorInput from "../../components/circuit/CircuitColorInput";
import PrivateCircuitInput from "../../components/circuit/PrivateCircuitInput";
import { CircuitColor } from "../../utils/types/circuit";
import CommonTextInput from "../../components/common/CommonTextInput";
import { useFocusEffect } from "@react-navigation/native";

export type NewCircuit = {
  name: string;
  description: string;
  color: CircuitColor;
  private: boolean;
  person: number;
  spraywall: number;
};

const CreateCircuitScreen = () => {
  const user = useAppSelector((state) => selectUser(state));
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    console.error("Spraywall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  const [newCircuit, setNewCircuit] = useState<NewCircuit>({
    name: "",
    description: "",
    color: "green",
    private: false,
    person: user.id,
    spraywall: spraywall.id,
  });

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <CreateCircuitHeader newCircuit={newCircuit} />
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ gap: 10 }}>
          <CommonTextInput
            value={newCircuit.name}
            setValue={(value) =>
              setNewCircuit({
                ...newCircuit,
                name: value,
              })
            }
            title="Circuit Name"
            inputRef={inputRef}
          />
          <CommonTextInput
            value={newCircuit.description}
            setValue={(value) =>
              setNewCircuit({
                ...newCircuit,
                description: value,
              })
            }
            title="Circuit Description"
          />
          <CircuitColorInput
            newCircuit={newCircuit}
            setNewCircuit={setNewCircuit}
          />
          <PrivateCircuitInput
            newCircuit={newCircuit}
            setNewCircuit={setNewCircuit}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateCircuitScreen;
