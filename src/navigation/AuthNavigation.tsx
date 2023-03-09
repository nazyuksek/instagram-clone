import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen";

export type AuthNavigationParamList = {
  LoginScreen: undefined;
};

export type AuthNavigationProp =
  NativeStackNavigationProp<AuthNavigationParamList>;

function AuthNavigation() {
  const Stack = createNativeStackNavigator<AuthNavigationParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
