import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, Text, TextInput, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { styles } from "./LoginScreen.style";
import { Feather } from "@expo/vector-icons";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthentication from "../../hooks/useAuthentication";
import * as SecureStore from "expo-secure-store";
import AuthModel from "../../models/authModel";

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const [securePassword, setSecurePassword] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsLoggedIn } = useAuthentication();

  async function save(user: AuthModel) {
    await SecureStore.setItemAsync("email", user.email);
    await SecureStore.setItemAsync("password", user.password);
  }

  const registerSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  async function onSubmit(data: any) {
    if (!errors.email && !errors.password) {
      setIsLoggedIn(true);
      setEmail(data.email);
      setPassword(data.password);
      await save({ email, password });
    }
  }

  return (
    <View style={styles.loginScreen}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/png/logo.png")}
        />
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              { borderColor: !errors.email ? "#DBDBDB" : "red" },
            ]}
            placeholder="Phone number, username or email"
            placeholderTextColor="#727272"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
        name="email"
        defaultValue={email}
      />
      {errors.email && (
        <View style={{ width: scale(300) }}>
          <Text style={{ marginTop: verticalScale(8), color: "red" }}>
            {errors.email.message?.toString()}
          </Text>
        </View>
      )}
      <View style={styles.passwordInputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { borderColor: !errors.password ? "#DBDBDB" : "red" },
              ]}
              placeholder="Password"
              placeholderTextColor="#727272"
              secureTextEntry={securePassword}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="password"
          defaultValue={password}
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
      {errors.password && (
        <View style={{ width: scale(300) }}>
          <Text style={{ marginTop: verticalScale(8), color: "red" }}>
            {errors.password.message?.toString()}
          </Text>
        </View>
      )}
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
}

export default LoginScreen;
