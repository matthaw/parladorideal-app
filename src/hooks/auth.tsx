import React, { createContext, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getLocalToken, setLocalToken } from '../utils/util';

interface IUser {
  payload: {
    name: string;
    email: string;
  };
  iat: number;
  exp: number;
}

interface IAuthContextData {
  token: string;
  setToken: any;
  user: IUser;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<IAuthContextData>({} as IAuthContextData);

  getLocalToken().then((res) => {
    if (res) {
      const user = jwtDecode<IUser>(res);

      if (user.exp && new Date(user.exp * 1000) <= new Date()) {
        setLocalToken('');
        setAuth({} as IAuthContextData);
      }

      setAuth({
        token: res,
        setToken: setLocalToken,
        user: user,
      });
    }
  });

  return (
    <AuthContext.Provider value={{ token: auth.token, setToken: setAuth, user: auth.user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
