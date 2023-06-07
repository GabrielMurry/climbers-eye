import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { request } from "../api/requestMethods";
import { useSelector } from "react-redux";
import CircuitBottomSheet from "../components/circuitComponents/CircuitBottomSheet";
import CircuitCard from "../components/circuitComponents/CircuitCard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { PlusIcon } from "react-native-heroicons/outline";

const CircuitScreen = () => {
  const { userID } = useSelector((state) => state.userReducer);
  const { spraywallID } = useSelector((state) => state.spraywallReducer);

  const CIRCUIT_ITEM_HEIGHT = 45;

  const [searchQuery, setSearchQuery] = useState("");
  const [circuits, setCircuits] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  // for managing opening and closing rows
  let row = [];
  let prevOpenedRow;

  useEffect(() => {
    fetchCircuitData();
  }, []);

  fetchCircuitData = async () => {
    const response = await request("get", `circuit/${userID}/${spraywallID}`);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setCircuits(response.data);
    }
  };

  const handleAddNewCircuitPressed = () => {
    setBottomSheetVisible(true);
  };

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderCircuitCards = ({ item, index }) => {
    const handleCircuitPressed = () => {
      setCircuits((prevCircuits) => {
        const newCircuits = [...prevCircuits];
        const index = newCircuits.findIndex((i) => i.id === item.id);
        newCircuits[index].isSelected = !newCircuits[index].isSelected;
        return newCircuits;
      });
    };

    const renderRightView = (onDeleteHandler) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Button
            color="red"
            onPress={(e) => onDeleteHandler(e)}
            title="DELETE"
          />
        </View>
      );
    };

    const onDelete = () => {
      Alert.alert(
        "Delete Circuit",
        `Are you sure you want to delete "${item.name}"?`,
        [
          {
            text: "Cancel",
            onPress: () => {
              row[index].close();
            },
          },
          {
            text: "Delete",
            onPress: async () => {
              console.log("delete", item.id);
              const response = await request(
                "delete",
                `delete_circuit/${userID}/${spraywallID}/${item.id}`
              );
              if (response.status !== 200) {
                console.log(response.status);
                return;
              }
              fetchCircuitData();
              row[index].close();
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightView(onDelete)}
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
      >
        <Pressable onPress={handleCircuitPressed}>
          <CircuitCard circuit={item} height={CIRCUIT_ITEM_HEIGHT} />
        </Pressable>
      </Swipeable>
    );
  };

  // footer in list to provide a 'gap' or 'space' at the bottom for the user to scroll to (so all circuits are visible and the last circuit row is not covered by the 'add new circuit' button)
  const renderFooter = () => {
    return <View style={{ height: CIRCUIT_ITEM_HEIGHT }} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={searchQuery}
        onChangeText={(value) => setSearchQuery(value)}
        placeholder="Search your circuits"
        autoComplete="off"
      />
      <View style={styles.flatListContainer}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={circuits}
          renderItem={renderCircuitCards}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderFooter}
        />
      </View>
      <TouchableOpacity
        style={styles.addNewCircuitButton}
        onPress={handleAddNewCircuitPressed}
      >
        <PlusIcon size={30} color={"green"} />
      </TouchableOpacity>
      {bottomSheetVisible ? (
        <CircuitBottomSheet
          setBottomSheetVisible={setBottomSheetVisible}
          circuits={circuits}
          setCircuits={setCircuits}
          userID={userID}
          spraywallID={spraywallID}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default CircuitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "rgb(229, 228, 226)",
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
  flatListContainer: {
    marginTop: 15,
    flex: 1,
  },
  flatList: {
    gap: 15,
    paddingHorizontal: 20,
  },
  addNewCircuitButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: "100%",
    position: "absolute",
    bottom: 30,
    right: 25,
    // adding shadow to add new circuit button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
});
