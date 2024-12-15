import React from "react";
import Home from "./Screens/AdminHomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventFormScreen from "./Screens/EventFormScreen";
const   Stack=createStackNavigator()
export default function index() {
  //we will define (under the folder `app`) our screens,
  //for now, we will return the Home, as the first screen,
  //it will change to the authed page that will redirect to Home Page.
  return (
    <Stack.Navigator>
    <Stack.Screen name="AdminHomeScreen" component={Home} />
    <Stack.Screen name="Screens/EventFormScreen" component={EventFormScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
   
  );
}