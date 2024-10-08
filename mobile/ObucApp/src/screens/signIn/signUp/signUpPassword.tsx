import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { CaretLeft, WarningCircle, X } from "phosphor-react-native";
import { Button } from "@components/Button";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import passwordValidationSchema from "@utils/zod/passwordValidationSchema";
import { useAuth } from "@hooks/AuthContext";

type RoutesParamsProps = {
  name: string;
  email: string;
};

type FormDataPros = {
  password: string;
  confirmPassword: string;
};

export function SignUpPassword() {
  const { signUp } = useAuth();

  const [isIos, setIsIos] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormDataPros>({
    resolver: zodResolver(passwordValidationSchema),
    mode: "onChange",
  });

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { name, email } = route.params as RoutesParamsProps;

  const [pinError, setPinError] = useState(false);

  async function handleCreatePassword({ password }: FormDataPros) {
    await signUp(email, name, password);
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
              Criar conta
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
                    onSubmitEditing={handleSubmit(handleCreatePassword)}
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

            <Text className="leading-relaxed mt-8 text-xl text-gray-900 font-outfitRegular">
              Confirme sua senha
            </Text>

            <View className="flex-row items-center justify-center">
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`flex w-full h-12 mt-4 border-b-2 text-base text-gray-700 ${
                      errors.confirmPassword?.message || pinError
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
                    onSubmitEditing={handleSubmit(handleCreatePassword)}
                  />
                )}
              />
              {errors.confirmPassword?.message && (
                <View className="-ml-6 mt-8">
                  <WarningCircle size={24} color="#DD4C45" />
                </View>
              )}
            </View>

            {errors.confirmPassword?.message ? (
              <Text className="leading-relaxed text-sm text-red-400 font-outfitRegular">
                {errors.confirmPassword?.message}
              </Text>
            ) : null}

            <View className="flex-1 w-full items-end justify-end mt-4 mb-10 bg-white">
              <Button
                next
                onPress={handleSubmit(handleCreatePassword)}
                title="Criar"
                bg={isValid ? "on" : "off"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
