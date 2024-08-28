import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { CaretLeft, WarningCircle, X } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import nameValidationSchema from "@utils/zod/nameValidationSchema";

import { useEffect, useState } from "react";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";

type FormDataPros = {
  name: string;
};

export function SignUpName() {
  const [isIos, setIsIos] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataPros>({
    resolver: zodResolver(nameValidationSchema),
    mode: "onChange",
  });

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleCreateName({ name }: FormDataPros) {
    navigation.navigate("signUpEmail", { name });
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
            <View className="flex flex-row justify-between items-center">
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <CaretLeft weight="bold" size={28} />
              </TouchableOpacity>
            </View>

            <Text className="leading-relaxed text-base text-gray-900 font-outfitRegular">
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
              <View className="flex h-1 w-8 rounded-3xl bg-green-400"></View>
            </View>
          </View>

          <View className="flex-1 w-full mt-10">
            <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
              Qual o seu nome?
            </Text>

            <View className="flex-row items-center justify-center">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`flex w-full h-12 mt-8 border-b-2 text-base text-gray-700 ${
                      errors.name?.message
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(handleCreateName)}
                    selectionColor="#000000"
                  />
                )}
              />
              {errors.name?.message && (
                <View className="-ml-6 mt-8">
                  <WarningCircle size={24} color="#DD4C45" />
                </View>
              )}
            </View>

            {errors.name?.message && (
              <Text className="leading-relaxed text-sm text-red-400 font-outfitRegular">
                {errors.name?.message}
              </Text>
            )}

            <View className="flex-1 w-full items-end justify-end mt-4 mb-10 bg-white">
              <Button
                next
                onPress={handleSubmit(handleCreateName)}
                title="Continuar"
                bg={isValid ? "on" : "off"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
