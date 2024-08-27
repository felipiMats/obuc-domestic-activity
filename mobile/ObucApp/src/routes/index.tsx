import { useAuth } from "@hooks/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";

export function Routes() {
  const { isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
