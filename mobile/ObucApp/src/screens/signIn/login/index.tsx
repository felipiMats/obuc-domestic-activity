import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
  } from "react-native";
  
  import { useNavigation } from "@react-navigation/native";
  import { AppNavigatorRoutesProps } from "@routes/app.routes";
  
  import { CaretLeft, WarningCircle, X } from "phosphor-react-native";
  import { Button } from "@components/Button";
  
  import { Controller, useForm } from "react-hook-form";
  import { useEffect, useState } from "react";
  import { useAuth } from "@hooks/AuthContext";
import emailValidationSchema from "@utils/zod/emailValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import passwordValidationSchema from "@utils/zod/passwordValidationSchema";
import loginValidationSchema from "@utils/zod/loginValidationSchema";
  
  type FormDataPros = {
    email: string;
    password: string;
  };
  
  export function Login() {
    const { signIn } = useAuth();
  
    const [isIos, setIsIos] = useState(false);
    const {
      control,
      handleSubmit,
      formState: { errors, isValid }
    } = useForm<FormDataPros>({
      resolver: zodResolver(loginValidationSchema),
      mode: "onChange",
    });
  
    const navigation = useNavigation<AppNavigatorRoutesProps>();
  
    const [pinError, setPinError] = useState(false);
  
    async function handleLogin({ email, password }: FormDataPros) {
      await signIn(email, password);
    }
  
    useEffect(() => {
      if (Platform.OS === "ios") {
        setIsIos(true);
      }
    });
  
    return (
      <KeyboardAvoidingView
        enabled={isIos}
        behavior={"padding"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-8 bg-white">
            <View className="flex flex-row h-36 items-center justify-between">
              <View className="flex flex-row justify-center items-center">
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <CaretLeft weight="bold" size={28} />
                </TouchableOpacity>
              </View>
  
              <Text className="text-center leading-relaxed text-base text-gray-900 font-outfitRegular">
                Entrar
              </Text>
  
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("signInHome");
                }}
              >
                <X weight="bold" size={28} />
              </TouchableOpacity>
            </View>
  
            <View className="flex h-1 w-full -mt-6 justify-center items-center">
              <View className="flex h-1 w-36 rounded-3xl bg-gray-200">
                <View className="flex h-1 w-32 rounded-3xl bg-green-400"></View>
              </View>
            </View>
  
            <View className="flex-1 w-full mt-10">
              <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
                Digite seu email
              </Text>
  
              <View className="flex-row items-center justify-center">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className={`flex w-full h-12 mt-4 border-b-2 text-base text-gray-700 ${
                        errors.email?.message || pinError
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                      onChangeText={(e) => {
                        onChange(e), setPinError(false);
                      }}
                      value={value}
                      autoCapitalize="none"
                      selectionColor="#000000"
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(handleLogin)}
                    />
                  )}
                />
                {errors.email?.message && (
                  <View className="-ml-6 mt-8">
                    <WarningCircle size={24} color="#DD4C45" />
                  </View>
                )}
              </View>
  
              {errors.email?.message ? (
                <Text className="leading-relaxed text-sm text-red-400 font-outfitRegular">
                  {errors.email?.message}
                </Text>
              ) : null}
  
              <Text className="leading-relaxed mt-8 text-xl text-gray-900 font-outfitRegular">
                Digite sua senha
              </Text>
  
              <View className="flex-row items-center justify-center">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className={`flex w-full h-12 mt-4 border-b-2 text-base text-gray-700 ${
                        errors.password?.message || pinError
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                      onChangeText={(e) => {
                        onChange(e), setPinError(false);
                      }}
                      value={value}
                      autoCapitalize="none"
                      selectionColor="#000000"
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(handleLogin)}
                    />
                  )}
                />
                {errors.password?.message && (
                  <View className="-ml-6 mt-8">
                    <WarningCircle size={24} color="#DD4C45" />
                  </View>
                )}
              </View>
  
              {errors.password?.message ? (
                <Text className="leading-relaxed text-sm text-red-400 font-outfitRegular">
                  {errors.password?.message}
                </Text>
              ) : null}
  
              <View className="flex-1 w-full items-end justify-end mt-4 mb-10 bg-white">
                <Button
                  next
                  onPress={handleSubmit(handleLogin)}
                  title="Entrar"
                  bg={isValid ? "on" : "off"}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  