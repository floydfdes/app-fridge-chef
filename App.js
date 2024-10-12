import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; // Import icons from Expo Icons
import { baseFontSize, colors } from './shared/fonts';

import Explorer from './screens/explorer'; // Add this import
import Landing from './screens/landing';
import Login from './screens/login';
import Main from './screens/main';
import MyRecipes from './screens/myrecipes';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './screens/profile';
import React from 'react';
import Signup from './screens/signup';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

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
