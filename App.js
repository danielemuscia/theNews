import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsListScreen from "./src/screens/NewsListScreen";
import AccountScreen from "./src/screens/AccountScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { Provider as NewsProvider } from "./src/context/NewsContext";
import AuthProvider from "./src/context/AuthContext";
import SingleNewsScreen from "./src/screens/SingleNewsScreen";
import { navigationRef } from "./src/navigationRef";
import {AuthContext} from "./src/context/AuthContext";
import ReadLaterScreen from "./src/screens/ReadLaterScreen";
import RecoverPasswordScreen from './src/screens/RecoverPasswordScreen'
import {Entypo, FontAwesome} from '@expo/vector-icons'


const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const NewsStack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator headerMode='none'>
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Signin" component={SigninScreen} />
      <AuthStack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
    </AuthStack.Navigator>
  );
};

const TabsStackScreen = () => {
  return (
    <Tabs.Navigator tabBarOptions={{activeTintColor: 'black', showLabel:false}}>
      <NewsStack.Screen name="NewsList" component={NewsListScreen} options={{tabBarIcon: ({focused}) => (focused?<FontAwesome name="newspaper-o" color="black" size={24} />:<FontAwesome name="newspaper-o" color="gray" size={24} />)}} />
      <NewsStack.Screen name="ReadLater" component={ReadLaterScreen} options={{tabBarIcon: ({focused}) => (focused?<FontAwesome name="bookmark-o" color="black" size={24} />:<FontAwesome name="bookmark-o" color="gray" size={24} />)} } />
      <AuthStack.Screen name="Account" component={AccountScreen} options={{tabBarIcon: ({focused}) => (focused?<FontAwesome name="user-o" color="black" size={24} />:<FontAwesome name="user-o" color="gray" size={24} />)}} />
    </Tabs.Navigator>
  );
};

const App = () => {
  const { isSignedIn, loading } = useContext(AuthContext);

  if(loading){
    return <SplashScreen />
  }
  return (
    <Stack.Navigator headerMode='none'>
      {
        isSignedIn ? 
        <>
        <Stack.Screen name="Tabs" component={TabsStackScreen} /> 
        <Stack.Screen name="SingleNews" component={SingleNewsScreen} /> 
        </>
        :
        <Stack.Screen name="Auth" component={AuthStackScreen} />
      }
    </Stack.Navigator>
  );
};

export default function () {
  return (
    <AuthProvider>
      <NewsProvider>
        <NavigationContainer ref={navigationRef}>
          <App />
        </NavigationContainer>
      </NewsProvider>
    </AuthProvider>
  );
}
