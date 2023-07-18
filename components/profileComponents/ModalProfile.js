import {
  View,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";

const dataGyms = [
  {
    id: 1,
    name: "The Boulder Field",
    location: "500 El Camino Real",
  },
  {
    id: 2,
    name: "The Boulder Field",
    location: "500 El Camino Real",
  },
  {
    id: 3,
    name: "The Boulder Field",
    location: "500 El Camino Real",
  },
];

const ModalProfile = ({
  isModalVisible,
  setIsModalVisible,
  selectedGyms,
  setSelectedGyms,
}) => {
  const renderCards = ({ item }) => {
    const handleCardPress = () => {
      setSelectedGyms((prevSelectedGyms) => {
        const index = prevSelectedGyms.indexOf(item.id);

        if (index === -1) {
          // Gym ID not found in the array, append it
          return [...prevSelectedGyms, item.id];
        } else {
          // Gym ID found in the array, remove it
          const newGyms = [...prevSelectedGyms];
          newGyms.splice(index, 1);
          return newGyms;
        }
      });
    };

    return (
      <Pressable
        style={{
          backgroundColor: "lightblue",
          width: "100%",
          height: 50,
          borderRadius: 10,
          opacity: selectedGyms.includes(item.id) ? 1 : 0.5,
        }}
        onPress={handleCardPress}
      >
        <Text>The Boulder Field</Text>
      </Pressable>
    );
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <SafeAreaView style={styles.modalContent}>
          {/* Add modal content here */}
          <Text>Select Gyms</Text>
          <FlatList
            contentContainerStyle={{ gap: 10, marginTop: 10 }}
            data={dataGyms}
            renderItem={renderCards}
            keyExtractor={(item) => item.id}
          />
          <Pressable onPress={() => setIsModalVisible(false)}>
            <Text>Cancel</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default ModalProfile;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  modalContent: {
    flex: 1,
  },
});
