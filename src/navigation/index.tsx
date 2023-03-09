import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthNavigation from "./AuthNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppNavigation from "./AppNavigation";

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

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Application" component={AppNavigation} />
        {/* <Stack.Screen name="Authentication" component={AuthNavigation} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
