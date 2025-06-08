import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import {
  selectSpraywall,
  selectSpraywalls,
} from "../../redux/features/spraywall/spraywallSelectors";
import { Spraywall } from "../../utils/types/spraywall";
import Header from "../../components/common/header/Header";
import { padding } from "../../utils/styles";
import { PlusIcon } from "react-native-heroicons/outline";
import { setSelectedSpraywallId } from "../../redux/features/spraywall/spraywallSlice";
import { useModalOptions } from "../../contexts/ModalOptionsContext";
import { useOptions } from "../../hooks/useOptions";
import OptionsIcon from "../../components/common/header/OptionsIcon";

const GymScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const gym = useAppSelector((state) => selectGym(state));
  const spraywalls = useAppSelector((state) => selectSpraywalls(state));
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  const dispatch = useAppDispatch();

  const renderSpraywallItem = ({ item }: { item: Spraywall }) => {
    return (
      <Pressable
        style={{
          width: 110,
          height: 110,
          backgroundColor: item.id === spraywall?.id ? "green" : "",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => dispatch(setSelectedSpraywallId(item.id))}
      >
        <Image
          source={{ uri: item.url }}
          style={{ width: 100, height: 100, borderRadius: 20 }}
        />
      </Pressable>
    );
  };

  const renderFooter = () => {
    return (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
          borderRadius: 20,
          backgroundColor: "lightgray",
        }}
        onPress={() =>
          navigation.navigate("SpraywallStack", { screen: "CreateSpraywall" })
        }
      >
        <PlusIcon />
      </Pressable>
    );
  };

  const { closeModal } = useModalOptions();

  const handleEditGymPress = () => {
    closeModal();
    navigation.navigate("GymStack", { screen: "EditGym" });
  };

  const { options } = useOptions([
    {
      title: "Edit gym",
      onPress: handleEditGymPress,
      color: "black",
    },
  ]);

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <Header
        leftText={gym.name}
        rightIcon={<OptionsIcon options={options} />}
      />
      <View style={{ paddingHorizontal: padding.general }}>
        <FlatList
          data={spraywalls}
          renderItem={renderSpraywallItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{
            gap: 10,
            alignItems: "center",
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          paddingTop: padding.general,
        }}
      >
        <Image
          source={{ uri: spraywall?.url }}
          style={{ width: 300, height: 300, borderRadius: 20 }}
        />
      </View>
    </View>
  );
};

export default GymScreen;
