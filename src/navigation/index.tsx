import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import AuthNavigation from "./AuthNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppNavigation from "./AppNavigation";
import useAuthentication from "../hooks/useAuthentication";

export type RootStackParamList = {
  Application: undefined;
  Authentication: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Navigation() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isLoggedIn } = useAuthentication();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Application" component={AppNavigation} />
        ) : (
          <Stack.Screen name="Authentication" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
