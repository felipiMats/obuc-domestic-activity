import { TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, SignOut } from "phosphor-react-native";
import LogoObuc from '@assets/logo_tech.png'
import { useAuth } from "@hooks/AuthContext";
import { useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Header() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { signOut } = useAuth();

  return (
    <View className="flex flex-row h-28 w-full px-6 justify-between items-center">
      {
        navigation.canGoBack() && route.name != 'home' &&
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('home');
          }}
        >
          <ArrowLeft color="#000000" size={32} />
        </TouchableOpacity>
      }
      

      <View className='flex-1 items-center justify-center'>
        <Image className="w-32 h-12" resizeMode="contain"  source={LogoObuc}  />
      </View>

      <TouchableOpacity onPress={signOut}>
        <SignOut color="#000000" />
      </TouchableOpacity>
    </View>
  );
}
