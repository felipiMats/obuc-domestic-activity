import { TaskDTO } from "@dtos/TaskDTO";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CardTaskProps {
  data: TaskDTO;
}

const CardTask: React.FC<CardTaskProps> = ({ data }) => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return(
    <View className='flex flex-row p-4 mb-4 w-full h-auto rounded-2xl bg-green-950'>
      <View className='flex-1'>
        <Text className='text-white text-lg font-outfitMedium capitalize'>{data.name}</Text>
        <Text className='text-gray-300 text-xs font-outfitRegular'>{data.userName}</Text>
      </View>
      <View className="flex items-center justify-center">
        <View className={`flex items-center justify-center w-24 h-6 rounded-2xl ${data.status == 'não iniciada' ? 'bg-red-300' : data.status == 'em andamento' ? 'bg-orange-300' : 'bg-green-300'}`} >
          <Text className='text-black text-xs font-outfitRegular capitalize'>{data.status}</Text>
        </View> 
        <TouchableOpacity onPress={() => navigation.navigate('task', {taskId: data.id!})}>
          <View className='flex items-center justify-center w-32 h-6 mt-2 rounded-2xl bg-white' >
            <Text className='text-black text-xs font-outfitRegular'>Ver mais</Text>
          </View> 
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default memo(CardTask);
