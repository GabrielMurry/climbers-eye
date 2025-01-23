import { useEffect, useState } from "react";
import { Option } from "../utils/types/options";
import { useModalOptions } from "../contexts/ModalOptionsContext";

export const useOptions = (newOptions?: Option[]) => {
  const { closeModal } = useModalOptions();

  const [options, setOptions] = useState<Option[]>([
    { title: "Cancel", onPress: closeModal, color: "gray" },
  ]);

  const addOption = (newOption: Option) => {
    setOptions((prevOptions) => [newOption, ...prevOptions]);
  };

  const addOptions = (newOptions: Option[]) => {
    setOptions((prevOptions) => [...newOptions, ...prevOptions]);
  };

  useEffect(() => {
    if (newOptions) {
      addOptions(newOptions);
    }
  }, []);

  return { addOption, addOptions, options };
};
