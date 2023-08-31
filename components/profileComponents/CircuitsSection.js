import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  ChevronRightIcon,
  LinkIcon,
  PlusIcon,
} from "react-native-heroicons/outline";

const CircuitsSection = ({ circuits, navigation }) => {
  return (
    <View
      contentContainerStyle={{
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={{ backgroundColor: "lightgray", height: 3 }} />
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
                borderBottomWidth: 1,
                borderColor: "lightgray",
                height: 60,
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() =>
                navigation.navigate("ProfileSection", {
                  section: "Circuits",
                  circuit: circuit,
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
                <Text style={{ fontSize: 16 }}>
                  {circuit.boulderData.length}
                </Text>
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
            onPress={() => navigation.navigate("AddNewCircuit")}
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
    </View>
  );
};

export default CircuitsSection;
