import React from "react";
import Header from "../common/header/Header";
import { useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import OptionsIcon from "../common/header/OptionsIcon";
import { useOptions } from "../../hooks/useOptions";
import { useModalOptions } from "../../contexts/ModalOptionsContext";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = () => {
  const navigation = useNavigation();

  const gym = useAppSelector((state) => selectGym(state));

  const { closeModal } = useModalOptions();

  const handleEditGymPress = () => {
    closeModal();
    navigation.navigate("GymStack", { screen: "EditGym" });
  };

  const { options } = useOptions([
    { title: "Edit Gym", onPress: handleEditGymPress, color: "black" },
  ]);

  return (
    <Header leftText={gym.name} rightIcon={<OptionsIcon options={options} />} />
  );
};

export default HomeHeader;
