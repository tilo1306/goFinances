import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import { IUser, userLogged } from "@storage/user/userLogged";
import { getUser } from "@storage/user/getUser";
import { userSignOut } from "@storage/user/userSignOut";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  user: IUser;
  sighInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface IAuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function sighInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const userLogging = {
          id: String(userInfo.id),
          email: userInfo.email!,
          name: userInfo.given_name!,
          photo: userInfo.picture!,
        };

        setUser(userLogging);
        await userLogged(userLogging);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
        const userInfo = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(userInfo);
        await userLogged(userInfo);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserStorage() {
    const userStorage = await getUser();

    if (userStorage) {
      setUser(userStorage);
      setUserStorageLoading(false);
    }
  }

  async function signOut() {
    setUser({} as IUser);
    await userSignOut();
  }

  useEffect(() => {
    setUserStorageLoading(true);
    loadUserStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        sighInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
