export type Suggestion = {
  place_id: number;
  description: string;
};

export type AddressTextInputProps = {
  address: string;
  setAddress: (address: string) => void;
  placeholder: string;
  charLimit: number;
  description: string;
  setPlaceID: (id: number) => void;
};
