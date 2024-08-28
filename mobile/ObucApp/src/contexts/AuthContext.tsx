import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { ReactNode, createContext, useEffect, useState } from "react";
import { storageUserSave, storageUserLoad, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean; 
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user,setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      console.info('Token', token)
      setUser(userData)
    } catch (error) {
      throw error;
    }
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error;
    } 
  }

  async function signIn(email: string, password: string) {
    try {
      const {data} = await api.post(`/login`, {
        email,
        password
      });


      if (data.user.id && data.user.name) {
        setIsLoadingUserStorageData(true)
        await storageUserAndTokenSave(data.user, data.token)
        await userAndTokenUpdate(data.user, data.token);
      }
    } 
    catch (error) {
      console.error('Error SignIn:', error);
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserRemove()
      await storageAuthTokenRemove();
      setUser({} as UserDTO)
    } 
    catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signUp(email: string, name: string, password: string) {
    try {
      const { data } = await api.post('/register', {
        email,
        name,
        password
      });

      if (data.user.id && data.user.name) {
        setIsLoadingUserStorageData(true)
        await storageUserAndTokenSave(data.user, data.token)
        await userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      console.error('Error SignUp:', error);
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      const userLogged = await storageUserLoad();
      const {token} = await storageAuthTokenGet();

      if(userLogged && token) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;       
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {loadUserData()}, [])

  return (
    <AuthContext.Provider value={{user, signIn, signOut, signUp, isLoadingUserStorageData}}>
      {children}
    </AuthContext.Provider>
  );
}