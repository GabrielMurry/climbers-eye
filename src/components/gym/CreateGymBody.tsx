import { View, Text } from "react-native";
import React from "react";
import SelectGymType from "./SelectGymType";
import AddressTextInput from "../googlePlacesAutoComplete/AddressTextInput";
import CustomTextInput from "../custom/inputs/CustomInput";
import CommonTextInput from "../common/CommonTextInput";

type CreateGymBodyProps = {
  isCommercialGym: boolean;
  setIsCommercialGym: (isCommercialGym: boolean) => void;
  gymName: string;
  setGymName: (gymName: string) => void;
  gymAddress: string;
  setGymAddress: (gymAddress: string) => void;
  setPlaceID: (id: number) => void;
};

const CHAR_LIMIT = 100;

const CreateGymBody: React.FC<CreateGymBodyProps> = ({
  isCommercialGym,
  setIsCommercialGym,
  gymName,
  setGymName,
  gymAddress,
  setGymAddress,
  setPlaceID,
}) => {
  return (
    <View style={{ gap: 15 }}>
      <SelectGymType
        isCommercialGym={isCommercialGym}
        setIsCommercialGym={setIsCommercialGym}
      />
      <CommonTextInput
        setValue={setGymName}
        value={gymName}
        title={isCommercialGym ? "Gym Name" : "Home Name"}
      />
      <AddressTextInput
        address={gymAddress}
        setAddress={setGymAddress}
        placeholder={"Enter gym address"}
        description={"Gym Address to be displayed to all users."}
        charLimit={CHAR_LIMIT}
        setPlaceID={setPlaceID}
        title="Gym Address"
        opacity={isCommercialGym ? undefined : 0.25}
      />
    </View>
  );
};

export default CreateGymBody;
