import React, { createContext, useCallback, useContext, useState } from "react";
import { ImageObjUrl } from "../utils/types/image";
import CameraModal from "../components/modal/camera/CameraModal";

type CameraProviderProps = {
  children: React.JSX.Element;
};

type CameraContext = {
  image: ImageObjUrl | null;
  openCamera: () => void;
  closeCamera: () => void;
};

const defaultValues: CameraContext = {
  image: null,
  openCamera: () => console.warn("openCamera is not implemented."),
  closeCamera: () => console.warn("closeCamera is not implemented."),
};

const CameraContext = createContext<CameraContext>(defaultValues);

export const CameraProvider: React.FC<CameraProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState<ImageObjUrl | null>(null);

  const openCamera = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeCamera = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <CameraContext.Provider value={{ image, openCamera, closeCamera }}>
      {children}
      <CameraModal
        image={image}
        setImage={setImage}
        isVisible={isVisible}
        closeCamera={closeCamera}
      />
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => useContext(CameraContext);
