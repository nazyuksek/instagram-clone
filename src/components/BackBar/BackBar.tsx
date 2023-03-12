import React from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./BackBar.style";
import { NavigationProp } from "@react-navigation/native";

interface BackBarProps {
  navigation: any;
}

function BackBar({ navigation }: BackBarProps) {
  function handleBackButtonPressed() {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={handleBackButtonPressed}>
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
      </Pressable>
    </View>
  );
}

export default BackBar;
