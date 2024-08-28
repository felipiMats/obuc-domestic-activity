import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/signIn';
import { Home } from '../screens/home';
import { useAuth } from '@hooks/AuthContext';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { SignUpName } from '@screens/signIn/signUp/signUpName';
import { SignUpEmail } from '@screens/signIn/signUp/signUpEmail';
import { SignUpPassword } from '@screens/signIn/signUp/signUpPassword';
import { Login } from '@screens/signIn/login';
import { CreateTask } from '@screens/task/createTask';
import { Task } from '@screens/task/task';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Plus } from 'phosphor-react-native';

type AppRoutes = {
  appHome: undefined;
  appAuth: undefined;
  signIn: undefined;
  login: undefined;
  signUpName: undefined;
  signUpEmail: { name: string};
  signUpPassword: { name: string; email: string};
  signInHome: undefined;
  home: undefined;
  createTask: undefined;
  task: {taskId: number};
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createStackNavigator<AppRoutes>();
const BottomTab = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Navigator
      initialRouteName={
        user.name == undefined
          ? "signIn"
          : "appHome"
      }
    >
      <Screen name="appAuth" component={AppAuth} options={{ headerShown: false }} />
      <Screen name="appHome" component={AppHome} options={{ headerShown: false }} />
    </Navigator>
  );
}

function AppAuth() {
  return (
    <Navigator>
      <Screen name="signInHome" component={SignIn} options={{ headerShown: false }} />
      <Screen name="login" component={Login} options={{ headerShown: false }} />
      <Screen name="signUpName" component={SignUpName} options={{ headerShown: false }} />
      <Screen name="signUpEmail" component={SignUpEmail} options={{ headerShown: false }} />
      <Screen name="signUpPassword" component={SignUpPassword} options={{ headerShown: false }} />
    </Navigator>
  );
}

function AppHome() {
  return (
    <BottomTab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#00D931',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#166534',
          borderTopWidth: 0,
          height: 55,
        }
      }}
      initialRouteName='home'
    >
      <BottomTab.Screen name="createTask" component={CreateTask}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <View className='flex items-center justify-center' >
              <View className='w-16 h-16 -mt-8 bg-green-400 border-2 border-green-300 rounded-full flex items-center justify-center'>
                <Plus color='white' size={48} weight='light' />
              </View>
              <Text className='text-xs text-white'>Tarefa</Text>
            </View>
          )
        }}
      />
      <BottomTab.Screen name="home" component={Home} options={{ headerShown: false, tabBarButton: () => null }}  />
      <BottomTab.Screen name="task" component={Task} options={{ headerShown: false, tabBarButton: () => null }}  />
    </BottomTab.Navigator>
  );
}