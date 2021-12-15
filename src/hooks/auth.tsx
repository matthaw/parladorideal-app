import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { api } from '../services/api';
import { getLocalToken, setLocalToken } from '../utils/util';

interface IAuthContextData {
  token: string;
  setToken: any;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState('');

  getLocalToken().then((res) => {
    if (res) setToken(res);
  });

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
