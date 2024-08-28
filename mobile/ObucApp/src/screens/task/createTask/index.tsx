import { Button } from "@components/Button";
import { useTask } from "@hooks/TaskContext";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft, WarningCircle, X } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View, Text, TextInput, Platform } from "react-native";

type FormDataPros = {
  name: string;
  userName: string;
  description: string;
};

export function CreateTask() {
  const [isIos, setIsIos] = useState(false);
  const { createTask } = useTask();

  const [pinError, setPinError] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function handleCreateTask({ name, userName, description }: FormDataPros) {
    await createTask(name, userName, description);
    navigation.navigate('home');
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataPros>({
    mode: "onChange",
  });

  useEffect(() => {
    if (Platform.OS === "ios") {
      setIsIos(true);
    }
  });

  return(
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
                  navigation.navigate('home');
                }}
              >
                <ArrowLeft color="#000000" size={32} />
              </TouchableOpacity>
            </View>

            <Text className="text-center leading-relaxed text-base text-gray-900 font-outfitRegular">
              Criar Tarefa
            </Text>

            <View className="w-8" />
          </View>

          <View className="flex h-1 w-full -mt-6 justify-center items-center">
            <View className="flex h-1 w-36 rounded-3xl bg-gray-200">
              <View className="flex h-1 w-32 rounded-3xl bg-green-400"></View>
            </View>
          </View>

          <View className="flex-1 w-full mt-10">
            <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
              Digite o nome da Tarefa
            </Text>

            <View className="flex-row items-center justify-center">
              <Controller
                control={control}
                name="name"
                rules={{ required: "O nome é obrigatório" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`flex w-full h-12 mt-4 border-b-2 text-base text-gray-700 ${
                      errors.name?.message || pinError
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
                    onSubmitEditing={handleSubmit(handleCreateTask)}
                  />
                )}
              />
              {errors.name?.message && (
                <View className="-ml-6 mt-4">
                  <WarningCircle size={24} color="#DD4C45" />
                </View>
              )}
            </View>

            {errors.name?.message ? (
              <Text className="leading-relaxed text-sm text-red-400 font-outfitRegular">
                {errors.name?.message}
              </Text>
            ) : null}

            <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
              Digite o responsável da Tarefa
            </Text>

            <View className="flex-row items-center justify-center">
              <Controller
                control={control}
                name="userName"
                rules={{ required: "O responsável é obrigatório" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`flex w-full h-12 mt-8 border-b-2 text-base text-gray-700 ${
                      errors.userName?.message || pinError
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
                    onSubmitEditing={handleSubmit(handleCreateTask)}
                  />
                )}
              />
              {errors.userName?.message && (
                <View className="-ml-6 mt-4">
                  <WarningCircle size={24} color="#DD4C45" />
                </View>
              )}
            </View>

            {errors.userName?.message ? (
              <Text className="leading-relaxed text-sm text-red-400 font-outfitRegular">
                {errors.name?.message}
              </Text>
            ) : null}

            <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
              Digite a descrição da Tarefa
            </Text>

            <View className="flex-row items-center justify-center">
              <Controller
                control={control}
                name="description"
                rules={{ required: "A descrição é obrigatória" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`flex w-full h-12 mt-4 border-b-2 text-base text-gray-700 ${
                      errors.description?.message || pinError
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
                    onSubmitEditing={handleSubmit(handleCreateTask)}
                  />
                )}
              />
              {errors.description?.message && (
                <View className="-ml-6 mt-4">
                  <WarningCircle size={24} color="#DD4C45" />
                </View>
              )}
            </View>

            {errors.description?.message ? (
              <Text className="leading-relaxed text-sm text-red-400 font-outfitRegular">
                {errors.name?.message}
              </Text>
            ) : null}

            <View className="flex-1 w-full items-end justify-end mt-4 mb-10 bg-white">
              <Button
                next
                onPress={handleSubmit(handleCreateTask)}
                title="Criar"
                bg={isValid ? "on" : "off"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}