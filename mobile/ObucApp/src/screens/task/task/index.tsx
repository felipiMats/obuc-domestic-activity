import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { TaskDTO } from "@dtos/TaskDTO";
import { useTask } from "@hooks/TaskContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft, Eraser, Trash, X } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text, Modal } from "react-native";

export function Task() {
  const route = useRoute();
  const { taskId } = route.params as { taskId: number };
  const { fetchTaskById, updateTask, deleteTask } = useTask();
  const [task, setTask] = useState<TaskDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleModalStatus, setVisibleModalStatus] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('em andamento');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function handleGetTask() {
    try {
      setLoading(true);
      const task = await fetchTaskById(taskId);
      setTask(task);
    } catch (error) {
      console.log("Error fetchTaskById:", error)
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus() {
    await updateTask(
      task?.id!,
      task?.name!,
      task?.userName!,
      task?.description!,
      updateStatus
    );
    handleGetTask();
    setVisibleModalStatus(false);
  }

  async function handleUpdateDelete() {
    await deleteTask(task?.id!)
    navigation.navigate('home')
    setVisibleModalDelete(false);
  }

  useEffect(() => {
    handleGetTask();
  },[taskId]);

  return(
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
            Tarefa
          </Text>

          <View className="w-8" />
        </View>

        <View className="flex h-1 w-full -mt-6 justify-center items-center">
          <View className="flex h-1 w-36 rounded-3xl bg-gray-200">
            <View className="flex h-1 w-36 rounded-3xl bg-green-400"></View>
          </View>
        </View>

        {
          loading ?
          <Loading /> :
          <View className="flex-1 w-full mt-10">
            <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
              Nome da Tarefa
            </Text>

            <View className="flex-row items-center justify-center">
              <Text
                className={`flex w-full h-12 mt-4 border-b-2 text-base text-gray-700 border-gray-200`}
              >
                {task?.name}
              </Text>
            </View>

            <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
              Responsável da Tarefa
            </Text>

            <View className="flex-row items-center justify-center">
              <Text
                className={`flex w-full h-12 mt-8 border-b-2 text-base text-gray-700 border-gray-200`}
              >
                {task?.userName}
              </Text>
            </View>

            <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
              Descrição da Tarefa
            </Text>

            <View className="flex-row items-center justify-center">
              <Text
                className={`flex w-full mt-4 border-b-2 text-base text-gray-700 border-gray-200`}
                >
                {task?.description}
              </Text>
            </View>

            <Text className="leading-relaxed mt-4 text-xl text-gray-900 font-outfitRegular">
              Status
            </Text>

            <View className="flex-row items-center justify-between">
              <View className={`flex items-center justify-center mt-4 w-32 h-8 rounded-2xl ${task?.status == 'não iniciada' ? 'bg-red-300' : task?.status == 'em andamento' ? 'bg-orange-300' : 'bg-green-300'}`} >
                <Text className='text-black text-base font-outfitRegular capitalize'>{task?.status}</Text>
              </View> 
              <View className="flex items-center justify-center" >
                <TouchableOpacity onPress={() => setVisibleModalStatus(true)}>
                  <Text className="leading-relaxed text-base mt-2 text-gray-900 font-outfitRegular">
                    Alterar Status
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisibleModalDelete(true)}>
                  <Text className="leading-relaxed text-base mt-2 text-gray-900 font-outfitRegular">
                    Apagar Tarefa
                  </Text>
                </TouchableOpacity>
              </View> 

            </View>
          </View>
        }
        <Modal
          animationType="fade"
          visible={visibleModalStatus}
          transparent={visibleModalStatus}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              className="flex absolute w-full h-full bg-black bg-opacity-50 justify-center items-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            >
              <View className="flex w-4/5 h-80 justify-between rounded-2xl bg-white opacity-170">
                <View className="flex mt-6 mr-6 h-8 items-end justify-end">
                  <TouchableOpacity
                    onPress={() => setVisibleModalStatus(false)}
                  >
                    <X size={24} />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-1 justify-center items-center mt-6 px-8">
                  <View className="flex text-xl items-center">
                    <Eraser size={32} color="#000000" />
                    <Text className="text-xl mt-6 font-outfitSemiBold text-center">
                      Alterar Status
                    </Text>
                  </View>
                </View>

                <View className="flex-row mt-4 items-center justify-center gap-2">
                  <TouchableOpacity onPress={() => setUpdateStatus('não iniciada')}>
                    <View className={`flex items-center justify-center mt-4 w-20 ${updateStatus == 'não iniciada' && 'border-2'} h-8 rounded-2xl bg-red-400 `} >
                      <Text className='text-black text-xs font-outfitRegular capitalize'>não iniciada</Text>
                    </View> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setUpdateStatus('em andamento')}>
                    <View className={`flex items-center justify-center mt-4 w-24 ${updateStatus == 'em andamento' && 'border-2'} border-gray-500 h-8 rounded-2xl bg-orange-300`} >
                      <Text className='text-black text-xs font-outfitRegular capitalize'>em andamento</Text>
                    </View> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setUpdateStatus('concluída')}>
                    <View className={`flex items-center justify-center mt-4 w-20 ${updateStatus == 'concluída' && 'border-2'} h-8 rounded-2xl bg-green-300 `} >
                      <Text className='text-black text-xs font-outfitRegular capitalize'>concluída</Text>
                    </View> 
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center justify-center gap-4 mt-12 mb-6">
                  <Button
                    title="Cancelar"
                    bg="on-gray"
                    onPress={() => setVisibleModalStatus(false)}
                  />
                  <Button
                    title="Confirmar"
                    bg="on"
                    onPress={handleUpdateStatus}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          visible={visibleModalDelete}
          transparent={visibleModalDelete}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              className="flex absolute w-full h-full bg-black bg-opacity-50 justify-center items-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            >
              <View className="flex w-4/5 h-80 justify-between rounded-2xl bg-white opacity-170">
                <View className="flex mt-6 mr-6 h-8 items-end justify-end">
                  <TouchableOpacity
                    onPress={() => setVisibleModalDelete(false)}
                  >
                    <X size={24} />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-1 justify-center items-center mt-6 px-8">
                  <View className="flex text-xl items-center">
                    <Trash size={32} color="#000000" />
                    <Text className="text-xl mt-6 font-outfitSemiBold text-center">
                      Apagar Tarefa
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center justify-center gap-4 mt-12 mb-6">
                  <Button
                    title="Cancelar"
                    bg="on-gray"
                    onPress={() => setVisibleModalDelete(false)}
                  />
                  <Button
                    title="Confirmar"
                    bg="on"
                    onPress={handleUpdateDelete}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}