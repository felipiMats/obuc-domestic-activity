import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LogoObuc from '@assets/logo_tech.png'

export function SignIn() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  return (
    <View className="flex-1 w-full px-8">
      <View className='flex-1 items-center justify-center'>
        <Image className="w-60 h-auto" resizeMode="contain"  source={LogoObuc}  />
      </View>

      <View className='flex h-200 w-full mb-8'>
        <TouchableOpacity onPress={() => {navigation.navigate('signUpName')}} className='flex flex-row items-center h-12 w-full justify-center rounded-3xl bg-green-400'>
          <Text className='text-center font-outfitMedium leading-relaxed text-base text-black'>
            Inscreva-se
          </Text>
        </TouchableOpacity>

        <View className='flex flex-row items-center mb-4 mt-3 h-12 w-full justify-center rounded-3xl bg-transparent '>
          <Text className='text-center font-outfitRegular leading-relaxed text-base text-green-700'>
            Já tem uma conta?
          </Text>
          <TouchableOpacity onPress={() => {navigation.navigate('login')}}>
            <Text className='text-center font-outfitBold leading-relaxed ml-1 text-base text-green-900'>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}