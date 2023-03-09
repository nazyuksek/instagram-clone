import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

export type AppNavigationParamList = {
  HomeScreen: undefined;
};

export type AppNavigationProp =
  NativeStackNavigationProp<AppNavigationParamList>;

function AppNavigation() {
  const Stack = createNativeStackNavigator<AppNavigationParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
