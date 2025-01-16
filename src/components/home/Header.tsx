import { View, Text } from "react-native";
import React from "react";
import GymAndOptions from "./GymAndOptions";
import FlatListSpraywalls from "./FlatListSpraywalls";

type HeaderProps = {
  setIsModalVisible: (isVisible: boolean) => void;
  hasEditPermission: boolean;
};

const Header: React.FC<HeaderProps> = ({
  setIsModalVisible,
  hasEditPermission,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <GymAndOptions setIsModalVisible={setIsModalVisible} />
      <FlatListSpraywalls
        highlight={true}
        hasEditPermission={hasEditPermission}
        height={100}
      />
    </View>
  );
};

export default Header;
