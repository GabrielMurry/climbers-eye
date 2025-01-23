import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import { useModalOptions } from "../../../contexts/ModalOptionsContext";
import { Option } from "../../../utils/types/options";

type OptionsIconProps = {
  options: Option[];
};

const OptionsIcon: React.FC<OptionsIconProps> = ({ options }) => {
  const { openModal } = useModalOptions();

  return (
    <TouchableOpacity onPress={() => openModal(options)}>
      <EllipsisHorizontalIcon size={35} color={"black"} />
    </TouchableOpacity>
  );
};

export default OptionsIcon;
