import React, { createContext, useContext } from "react";

type NavigationContextType = {
  value: string;
};

export const StackName = {
  HomeStack: "HomeStack",
  ProfileStack: "ProfileStack",
} as const;

export type StackNameType = (typeof StackName)[keyof typeof StackName];

const NavigationContext = createContext<StackNameType>(StackName.HomeStack);

export const useNavigationContext = () => useContext(NavigationContext);

type NavigationProviderProps = {
  children: React.ReactNode;
  value: StackNameType;
};

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
  value,
}) => (
  <NavigationContext.Provider value={value}>
    {children}
  </NavigationContext.Provider>
);
