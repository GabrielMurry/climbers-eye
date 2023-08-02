import {
  View,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { request } from "../../api/requestMethods";
import { useSelector } from "react-redux";
import GymCard from "./GymCard";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";

const ModalProfile = ({
  isModalVisible,
  setIsModalVisible,
  spraywalls,
  spraywallIndex,
}) => {
  const { user } = useSelector((state) => state.userReducer);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await request("get", `get_all_user_gyms/${user.id}`);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setData(response.data.all_gyms_data);
    }
  };

  // Scroll List containing gym name items. Click on item --> drop down of that gym's spray walls preselected. Click for specific walls in that gym. multiple gyms can be selected

  const renderCards = ({ item }) => {
    return <GymCard gymCard={item} />;
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
          <View style={{ flexDirection: "row" }}>
            <ArrowLeftCircleIcon
              size={30}
              color="black"
              onPress={() => setIsModalVisible(false)}
            />
            <View
              style={{
                alignItems: "center",
                marginLeft: 20,
                paddingBottom: 10,
              }}
            >
              <Text style={{ fontSize: 24 }}>Select Gyms</Text>
            </View>
          </View>
          <FlatList
            contentContainerStyle={{ gap: 10, marginTop: 10 }}
            data={data}
            renderItem={renderCards}
            keyExtractor={(item) => item.id}
          />
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
