import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import Landing from './screens/landing';
import Login from './screens/login';
import Signup from './screens/signup';
import Main from './screens/main';
import Explorer from './screens/explorer';
import MyRecipes from './screens/myrecipes';
import Profile from './screens/profile';

import { baseFontSize, colors } from './shared/fonts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: { fontFamily: 'Poppins', fontSize: baseFontSize * 2 },
        headerStyle: {
          backgroundColor: colors.third,
        },
        tabBarActiveTintColor: colors.fourth,
        tabBarLabelStyle: {
          fontFamily: 'Poppins',
          marginBottom: 1
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Explorer"
        component={Explorer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="My Recipes"
        component={MyRecipes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={size} color={colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={colors.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{ headerShown: false, gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;