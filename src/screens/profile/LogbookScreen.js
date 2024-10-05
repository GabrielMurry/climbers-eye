import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getLogbookList } from "../../services/profile";
import { useSelector } from "react-redux";
import BoulderCard from "../../components/common/BoulderCard";

const LogbookScreen = ({ navigation }) => {
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );

  const [logbookBoulders, setLogbookBoulders] = useState([]);

  const fetchLogbookData = async () => {
    const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
    const response = await getLogbookList(pathParams);
    setLogbookBoulders(response.data);
  };
  useEffect(() => {
    fetchLogbookData();
  }, []);
  const renderBoulderCard = ({ item }) => {
    return <BoulderCard boulder={item} navigation={navigation} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={logbookBoulders}
        renderItem={renderBoulderCard}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
        // onEndReached={() => fetchListData(page)}
        // onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
        // ListEmptyComponent={renderEmptyComponent}
        // onRefresh={onRefresh}
        // refreshing={refreshing}
      />
    </View>
  );
};

export default LogbookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
