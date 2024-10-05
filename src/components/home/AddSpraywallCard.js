import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/styles";
import { PlusIcon } from "react-native-heroicons/outline";
import CustomModal from "../modal/CustomModal";

const AddSpraywallCard = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <TouchableOpacity
        style={{
          height: "100%",
          aspectRatio: 1,
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={toggleModal}
      >
        <View
          style={{
            height: "110%",
            aspectRatio: 1,
            position: "absolute",
            borderRadius: 2,
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
            borderWidth: 2,
          }}
        />
        <PlusIcon color={colors.primary} />
      </TouchableOpacity>
      <CustomModal
        isVisible={modalVisible}
        onClose={toggleModal}
        navigation={navigation}
        isBoulder={false}
      />
    </>
  );
};

export default AddSpraywallCard;
