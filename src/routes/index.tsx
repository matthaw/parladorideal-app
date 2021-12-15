import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth';

function Routes() {
  const { token } = useAuth();

  return <NavigationContainer>{token ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>;
}

export { Routes };
