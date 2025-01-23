import React, { createContext, useContext, useState, useCallback } from "react";
import { ImageObjUri } from "../utils/types/image";
import FullScreenImageModal from "../components/image/FullScreenImageModal";

type ModalFullScreenImageProviderProps = {
  children: React.JSX.Element;
};

type ModalFullScreenImageContext = {
  isVisible: boolean;
  image: ImageObjUri;
  openModal: (uri: string, width: number, height: number) => void;
  closeModal: () => void;
};

const DEFAULT_VAL: ModalFullScreenImageContext = {
  isVisible: false,
  image: { uri: "", width: 0, height: 0 },
  openModal: () => {
    console.warn("openModal is not implemented");
  },
  closeModal: () => {
    console.warn("closeModal is not implemented");
  },
};

const ModalFullScreenImageContext =
  createContext<ModalFullScreenImageContext>(DEFAULT_VAL);

export const ModalFullScreenImageProvider: React.FC<
  ModalFullScreenImageProviderProps
> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState<ImageObjUri>(DEFAULT_VAL.image);

  const openModal = useCallback(
    (uri: string, width: number, height: number) => {
      setImage({ uri, width, height });
      setIsVisible(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setImage(DEFAULT_VAL.image);
  }, []);

  return (
    <ModalFullScreenImageContext.Provider
      value={{ isVisible, image, openModal, closeModal }}
    >
      {children}
      <FullScreenImageModal />
    </ModalFullScreenImageContext.Provider>
  );
};

export const useModalFullScreenImage = () =>
  useContext(ModalFullScreenImageContext);
