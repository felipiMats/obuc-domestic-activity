import { Header } from "@components/Header";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import CardTask from "@components/CardTask";
import { TaskDTO } from "@dtos/TaskDTO";
import { CheckSquareOffset, Funnel } from "phosphor-react-native";
import { useTask } from "@hooks/TaskContext";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useEffect, useState } from "react";

export function Home() {
  const { tasks, fetchTasks } = useTask();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [filterStatus, setFilterStatus] = useState('todas');
  const filter = ['todas', 'em andamento', 'não iniciada', 'concluída']

  useEffect(() => {
    filterStatus == 'todas' ? fetchTasks() : fetchTasks(filterStatus);
  },[filterStatus])

  const renderEmpty = (
    <View className="flex-1 mt-10 items-center justify-center">
      <CheckSquareOffset size={60} />
      <Text className="text-green-600 mt-4 self-center text-center font-outfitRegular">
        Ops, não há tarefas disponíveis,
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('createTask')}>
        <Text className="text-green-950 self-center text-center font-outfitRegular">
          {` Crie aqui.`} 
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1">
      <Header />

      <View className="flex-row items-center justify-center mt-6 h-10 pl-6 mb-6" >
        <View className="flex items-center justify-center w-8 h-10 rounded-xl bg-green-400" >
          <Funnel
            size={18}
            color={
              filterStatus == 'Todas'
                ? "white"
                : "#052e16"
            }
          />
        </View>
        
        <FlatList 
          data={filter}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setFilterStatus(item)} >
              <View className={`flex items-center justify-center w-auto bg-green-200 h-8 px-2 rounded-2xl ${item == filterStatus ? 'border-green-400' : 'border-gray-300'} border-2 `}  >
                <Text className='text-black text-sm text-center font-outfitRegular capitalize'>{item}</Text>
              </View> 
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View className="w-2" />
          )}
          ListFooterComponent={() => (
            <View className="w-2" />
          )}
          ListHeaderComponent={() => (
            <View className="w-2" />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <FlatList
      className="flex px-6"
        data={tasks}
        renderItem={({item}) => {
          return(
            <CardTask data={item as TaskDTO} />
          )
        }}
        keyExtractor={(item, index) => item.id!.toString()}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  )
}