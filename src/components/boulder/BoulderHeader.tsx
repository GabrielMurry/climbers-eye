import { Alert } from "react-native";
import React from "react";
import Header from "../common/header/Header";
import { useNavigation } from "@react-navigation/native";
import { selectBoulder } from "../../redux/features/boulder/boulderSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import {
  deleteBoulderAPI,
  updateBoulderAPI,
} from "../../services/boulder/boulder";
import {
  deleteBoulder,
  updateBoulder,
} from "../../redux/features/boulder/boulderSlice";
import { Option } from "../../utils/types/options";
import BackIcon from "../common/header/BackIcon";
import OptionsIcon from "../common/header/OptionsIcon";
import { useOptions } from "../../hooks/useOptions";

type BoulderHeaderProps = {
  boulderId: number;
};

const BoulderHeader: React.FC<BoulderHeaderProps> = ({ boulderId }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const boulder = useAppSelector((state) => selectBoulder(state, boulderId));
  const user = useAppSelector((state) => selectUser(state));

  const handleDeleteBoulder = () => {
    Alert.alert(
      "Delete Boulder",
      `Are you sure you want to delete "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const pathParams = { boulderId: boulder.id };
            const response = await deleteBoulderAPI(pathParams);
            if (response.status === 204) {
              navigation.goBack();
              dispatch(deleteBoulder(boulder.id));
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handlePublishBoulder = () => {
    Alert.alert(
      "Publish Boulder",
      `Are you sure you want to publish "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Publish",
          onPress: async () => {
            const data = { publish: true };
            const pathParams = { boulderId: boulder.id };
            const response = await updateBoulderAPI(pathParams, data);
            if (response.status === 200) {
              navigation.goBack();
              dispatch(updateBoulder(boulder.id, { publish: true }));
            }
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  };

  const getOptions = () => {
    const options: Option[] = [
      // { title: "Share", onPress: () => shareInfo(boulder) },
      // { title: "Report", onPress: handleReportPress },
    ];
    // If your boulder is not published, add option to publish boulder
    if (!boulder.publish && boulder.setter === user.username) {
      options.unshift({
        title: "Publish Boulder",
        onPress: handlePublishBoulder,
        color: "blue",
      });
    }
    // If you are the setter of a boulder, give option to delete boulder
    if (boulder.setter === user.username) {
      const deleteBoulderOption = {
        title: "Delete Boulder",
        onPress: handleDeleteBoulder,
        color: "red",
      };
      const cancelOptionIndex = options.length - 1;
      options.splice(cancelOptionIndex, 0, deleteBoulderOption);
    }
    return options;
  };

  const { options } = useOptions(getOptions());

  return (
    <Header
      leftIcon={<BackIcon />}
      rightIcon={<OptionsIcon options={options} />}
    />
  );
};

export default BoulderHeader;
