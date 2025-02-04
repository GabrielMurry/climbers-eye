import { View, Text } from "react-native";
import React from "react";
import SelectGymType from "./SelectGymType";
import CustomInput from "../custom/CustomInput";
import AddressTextInput from "../googlePlacesAutoComplete/AddressTextInput";

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
    <View style={{ paddingHorizontal: 20, gap: 15 }}>
      <SelectGymType
        isCommercialGym={isCommercialGym}
        setIsCommercialGym={setIsCommercialGym}
      />
      <CustomInput
        value={gymName}
        setValue={setGymName}
        placeholder={isCommercialGym ? "Enter gym name" : "Enter home name"}
        title={isCommercialGym ? "Gym Name" : "Home Name"}
        bordered={true}
        rounded={true}
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
