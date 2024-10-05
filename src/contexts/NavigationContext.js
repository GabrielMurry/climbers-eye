import React, { createContext, useContext } from "react";

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children, value }) => (
  <NavigationContext.Provider value={value}>
    {children}
  </NavigationContext.Provider>
);
