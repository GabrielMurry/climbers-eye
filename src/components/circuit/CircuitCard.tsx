import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import { deleteCircuitAPI } from "../../services/circuit";
import {
  addBoulderToCircuitAPI,
  removeBoulderFromCircuitAPI,
} from "../../services/boulder/boulder";
import {
  removeBoulderFromCircuit,
  addBoulderToCircuit,
  deleteCircuit,
} from "../../redux/features/circuit/circuitSlice";
import { Circuit } from "../../utils/types/circuit";
import { Boulder } from "../../utils/types/boulder";
import { useAppDispatch } from "../../redux/hooks";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type CircuitCardProps = {
  circuit: Circuit;
  height: number;
  boulder: Boulder;
};

const SWIPE_COMP_WIDTH = 100;

const CircuitCard: React.FC<CircuitCardProps> = ({
  circuit,
  height,
  boulder,
}) => {
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const swipeableRef = useRef<SwipeableMethods>(null);

  const isBoulderInCircuit = () => {
    return circuit.boulders.some(
      (circuitBoulder) => circuitBoulder.id === boulder.id
    );
  };

  useEffect(() => {
    setIsChecked(isBoulderInCircuit);
  }, [circuit]);

  const performRequest = async (method: string) => {
    const pathParams = { circuitId: circuit.id, boulderId: boulder.id };
    switch (method) {
      case "post":
        dispatch(addBoulderToCircuit(circuit.id, boulder.id));
        return await addBoulderToCircuitAPI(pathParams);
      case "delete":
        dispatch(removeBoulderFromCircuit(circuit.id, boulder.id));
        return await removeBoulderFromCircuitAPI(pathParams);
      default:
        console.error("Invalid method.");
    }
  };

  const handleCircuitPressed = async () => {
    const method = handleIsBoulderInCircuit() ? "delete" : "post";
    performRequest(method);
  };

  const handleIsBoulderInCircuit = () => {
    return circuit.boulders.some(
      (circuitBoulder) => circuitBoulder.id === boulder.id
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Circuit",
      `Are you sure you want to delete "${circuit.name}"?`,
      [
        {
          text: "Cancel",
          onPress: () => {
            swipeableRef.current?.close();
          },
        },
        {
          text: "Delete",
          onPress: async () => {
            const pathParams = { circuitId: circuit.id };
            dispatch(deleteCircuit(circuit.id));
            await deleteCircuitAPI({ pathParams });
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  function RightAction(_: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + SWIPE_COMP_WIDTH }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            backgroundColor: "red",
            width: SWIPE_COMP_WIDTH,
            height: height,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
        </TouchableOpacity>
      </Reanimated.View>
    );
  }

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={25}
        renderRightActions={RightAction}
        ref={swipeableRef}
      >
        <Pressable
          onPress={handleCircuitPressed}
          style={[styles.container, { height: height }]}
        >
          <View style={[styles.color, { backgroundColor: circuit.color }]} />
          <View style={styles.cardInfoContainer}>
            <Text>{circuit.name}</Text>
            {isChecked ? (
              <CheckIcon size={25} color={"black"} style={{ marginRight: 5 }} />
            ) : null}
          </View>
        </Pressable>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

export default CircuitCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  color: {
    width: 15,
    height: 15,
    borderRadius: "100%",
  },
  cardInfoContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
});
