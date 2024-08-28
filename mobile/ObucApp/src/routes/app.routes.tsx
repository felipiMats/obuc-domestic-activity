import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/signIn';
import { Home } from '../screens/home';
import { useAuth } from '@hooks/AuthContext';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { SignUpName } from '@screens/signIn/signUp/signUpName';
import { SignUpEmail } from '@screens/signIn/signUp/signUpEmail';
import { SignUpPassword } from '@screens/signIn/signUp/signUpPassword';

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
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createStackNavigator<AppRoutes>();

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
      <Screen name="signUpName" component={SignUpName} options={{ headerShown: false }} />
      <Screen name="signUpEmail" component={SignUpEmail} options={{ headerShown: false }} />
      <Screen name="signUpPassword" component={SignUpPassword} options={{ headerShown: false }} />
    </Navigator>
  );
}

function AppHome() {
  return (
    <Navigator
    >
      <Screen name="home" component={Home} options={{ headerShown: false }}  />
    </Navigator>
  );
}