import React, { createContext, useContext, useState, useCallback } from "react";
import { Option } from "../utils/types/options";
import OptionsModal from "../components/options/OptionsModal";

type ModalOptionsProviderProps = {
  children: React.JSX.Element;
};

type ModalOptionsContext = {
  isVisible: boolean;
  options: Option[];
  openModal: (options: Option[]) => void;
  closeModal: () => void;
};

const defaultValues: ModalOptionsContext = {
  isVisible: false,
  options: [],
  openModal: () => {
    console.warn("openModal is not implemented");
  },
  closeModal: () => {
    console.warn("closeModal is not implemented");
  },
};

const ModalOptionsContext = createContext<ModalOptionsContext>(defaultValues);

export const ModalOptionsProvider: React.FC<ModalOptionsProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const openModal = useCallback((newOptions: Option[]) => {
    console.log("hi");
    setOptions(newOptions);
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setOptions([]);
  }, []);

  return (
    <ModalOptionsContext.Provider
      value={{ isVisible, options, openModal, closeModal }}
    >
      {children}
      <OptionsModal />
    </ModalOptionsContext.Provider>
  );
};

export const useModalOptions = () => useContext(ModalOptionsContext);
