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
import { colors, padding } from "../../utils/styles";
import { PlusIcon } from "react-native-heroicons/outline";
import { setSelectedSpraywallId } from "../../redux/features/spraywall/spraywallSlice";
import { useModalOptions } from "../../contexts/ModalOptionsContext";
import { useOptions } from "../../hooks/useOptions";
import OptionsIcon from "../../components/common/header/OptionsIcon";
import SelectedWall from "../../components/gym/SelectedWall";

const GymScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const gym = useAppSelector((state) => selectGym(state));
  const spraywalls = useAppSelector((state) => selectSpraywalls(state));
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    return;
  }
  console.log(spraywalls);
  const dispatch = useAppDispatch();

  const renderSpraywallItem = ({ item }: { item: Spraywall }) => {
    return (
      <Pressable
        style={{
          width: 110,
          height: 110,
          backgroundColor: item.id === spraywall.id ? colors.primary : "",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => dispatch(setSelectedSpraywallId(item.id))}
      >
        <Image
          source={{ uri: item.url }}
          style={{ width: 100, height: 100, borderRadius: 5 }}
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
          borderRadius: 5,
          backgroundColor: "lightgray",
        }}
        onPress={() =>
          navigation.navigate("SpraywallStack", { screen: "CreateSpraywall" })
        }
      >
        <PlusIcon color={"black"} />
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
      <SelectedWall spraywall={spraywall} />
    </View>
  );
};

export default GymScreen;
