import React, { createContext, useContext, useState, useEffect } from "react";
import { useFont } from "@shopify/react-native-skia";
import interFontPath from "../assets/fonts/Inter-Font.ttf";

const FontContext = createContext({
  fonts: {},
  fontsLoaded: false,
});

export const FontProvider = ({ children }) => {
  // NOT efficient if scaled up - meaning needing many more font sizes. Each size is a whole new asset so more memory. More fonts to preload may mean longer app startup load time
  const interFont12 = useFont(interFontPath, 12);
  const interFont75 = useFont(interFontPath, 75);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (interFont12 && interFont75) {
      setFontsLoaded(true);
    }
  }, [interFont12, interFont75]);

  const fontValue = {
    fonts: { inter12: interFont12, inter75: interFont75 },
    fontsLoaded,
  };

  return (
    <FontContext.Provider value={fontValue}>{children}</FontContext.Provider>
  );
};

export const useFonts = () => useContext(FontContext);
