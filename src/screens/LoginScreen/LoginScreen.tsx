import React, { useState } from "react";
import { Button, Image, Pressable, Text, TextInput, View } from "react-native";
import { verticalScale } from "react-native-size-matters";
import { styles } from "./LoginScreen.style";
import { Feather } from "@expo/vector-icons";

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const [securePassword, setSecurePassword] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.loginScreen}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/png/logo.png")}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone number, username or email"
        placeholderTextColor="#727272"
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="Password"
          placeholderTextColor="#727272"
          secureTextEntry={securePassword}
        />
        <Pressable
          style={styles.eyeOff}
          onPress={() => setSecurePassword(!securePassword)}
        >
          {securePassword ? (
            <Feather name="eye-off" size={24} color="gray" />
          ) : (
            <Feather name="eye" size={24} color="#0095F6" />
          )}
        </Pressable>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
}

export default LoginScreen;
