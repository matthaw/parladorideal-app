import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Home } from '../screens/Home';
import { Post } from '../screens/Post';
import theme from '../global/theme';
import { Platform } from 'react-native';
import { Update } from '../screens/Update';

const { Navigator, Screen } = createBottomTabNavigator();

function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
        header: () => null, // remove header bar
      }}
      initialRouteName="Posts"
    >
      <Screen
        name="Meus posts"
        component={Update}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons size={size} color={color} name="edit" />,
        }}
      />
      <Screen
        name="Posts"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons size={size} color={color} name="grid-view" />
          ),
          title: 'Posts',
        }}
      />
      <Screen
        name="Novo"
        initialParams={{
          title: 'Novo post',
          action: 'Postar',
        }}
        component={Post}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons size={size} color={color} name="post-add" />
          ),
        }}
      />
    </Navigator>
  );
}

export { AppRoutes };
