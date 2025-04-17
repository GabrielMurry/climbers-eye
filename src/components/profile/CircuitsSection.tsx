import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  ChevronRightIcon,
  LinkIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { useAppSelector } from "../../redux/hooks";
import { selectCircuits } from "../../redux/features/circuit/circuitSelectors";
import { useNavigation } from "@react-navigation/native";

const CircuitsSection = () => {
  const navigation = useNavigation();
  const circuits = useAppSelector((state) => selectCircuits(state));

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
      }}
    >
      <View
        style={{
          paddingHorizontal: 30,
          marginTop: 10,
          flexDirection: "row",
          height: 30,
          alignItems: "center",
        }}
      >
        {/* section title */}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Circuits</Text>
      </View>
      <View style={{ paddingLeft: 30 }}>
        {circuits.map((circuit, index) => (
          <TouchableOpacity
            key={circuit.id}
            style={{
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate("CircuitStack", {
                screen: "CircuitBoulders",
                params: { circuitId: circuit.id },
              })
            }
          >
            <View style={{ width: 30 }}>
              <LinkIcon color={circuit.color} size={20} />
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 16 }}>{circuit.name}</Text>
            </View>
            <View
              style={{
                width: 75,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>{circuit.boulderIds?.length}</Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            height: 60,
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() =>
            navigation.navigate("CircuitStack", { screen: "CreateCircuit" })
          }
        >
          <View style={{ width: 30 }}>
            <PlusIcon color={"black"} size={20} />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 16 }}>Create a New Circuit</Text>
          </View>
          <View
            style={{
              width: 50,
              alignItems: "center",
            }}
          >
            <ChevronRightIcon color={"black"} size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CircuitsSection;
