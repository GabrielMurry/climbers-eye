import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import BoulderCard from "../../components/common/BoulderCard";
import EmptyCard from "../../components/home/EmptyCard";
import ErrorCard from "../../components/home/ErrorCard";
import { useSelector, useDispatch } from "react-redux";
import ModalOptions from "../../components/custom/ModalOptions";
import ListHeader from "../../components/home/ListHeader";
import { resetBoulders } from "../../redux/features/boulder/boulderSlice";
import { useBoulderListData } from "../../hooks/useBoulderListData";

const THEME_STYLE = "white";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);
  const filters = useSelector((state) => state.filter);
  const { boulders } = useSelector((state) => state.boulder);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const hasEditPermission = true;

  const { isLoading, isError, fetchListData } = useBoulderListData(
    setPage,
    searchQuery,
    filters
  );

  const onRefresh = useCallback(() => {
    dispatch(resetBoulders());
    setRefreshing(true);
    setPage(1);
    fetchListData(1);
  }, []);

  const renderListHeader = () => (
    <ListHeader
      gym={gym}
      setIsModalVisible={setIsModalVisible}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      hasEditPermission={hasEditPermission} // put in component
      navigation={navigation}
    />
  );

  const renderBoulderCard = ({ item }) => (
    <BoulderCard boulder={item} navigation={navigation} />
  );

  const handleEditGymPress = () => {
    setIsModalVisible(false);
    navigation.navigate("GymStack", { screen: "EditGym" });
  };

  const renderEmptyComponent = () => {
    if (isLoading) return;
    return (
      <>
        {isError ? (
          <ErrorCard message={"Error retrieving boulders."} />
        ) : (
          <EmptyCard message={"No boulders found."} />
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        {/* Main List */}
        <FlatList
          data={boulders}
          renderItem={renderBoulderCard}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
          onEndReached={() => fetchListData(page)}
          onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
          ListHeaderComponent={renderListHeader()}
          ListFooterComponent={() => isLoading && <ActivityIndicator />}
          ListEmptyComponent={renderEmptyComponent}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </View>
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={[
          { title: "Edit Gym", onPress: handleEditGymPress },
          {
            title: "Cancel",
            onPress: () => setIsModalVisible(false),
            color: "gray",
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {
    flex: 1,
    rowGap: 10,
  },
});
