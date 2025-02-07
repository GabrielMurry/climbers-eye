import { Text, Modal, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { Option } from "../../../utils/types/options";

type OptionsModalProps = {
  isVisible: boolean;
  options: Option[];
  closeModal: () => void;
};

const OptionsModal: React.FC<OptionsModalProps> = ({
  isVisible,
  options,
  closeModal,
}) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      {/* background darkened */}
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "black",
          opacity: 0.5,
        }}
        onPress={() => closeModal()}
      />
      {/* content */}
      {options.map((option) => (
        <SafeAreaView key={option.title}>
          <Pressable
            style={{
              justifyContent: "center",
              backgroundColor: "white",
              padding: 20,
            }}
            onPress={option.onPress}
          >
            <Text style={{ color: option.color }}>{option.title}</Text>
          </Pressable>
        </SafeAreaView>
      ))}
    </Modal>
  );
};

export default OptionsModal;
