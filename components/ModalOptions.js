import { View, Text, Modal, Pressable } from "react-native";
import React from "react";

const ModalOptions = ({ isModalVisible, setIsModalVisible, optionsData }) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      {/* Add modal content here */}
      <Pressable
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 }}
        onPress={() => setIsModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            position: "absolute",
            bottom: 0,
            paddingBottom: 35,
          }}
        >
          {optionsData.map((option) => (
            <Pressable
              style={{
                justifyContent: "center",
                padding: 20,
              }}
              key={option.title}
              onPress={option.onPress}
            >
              <Text style={{ color: option.color ? option.color : "black" }}>
                {option.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalOptions;
