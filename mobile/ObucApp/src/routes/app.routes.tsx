import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/signIn';
import { Home } from '../screens/home';
import { useAuth } from '@hooks/AuthContext';

type AppRoutes = {
  appHome: undefined;
  appAuth: undefined;
  signIn: undefined;
  home: undefined;
  signInHome: undefined;
};

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