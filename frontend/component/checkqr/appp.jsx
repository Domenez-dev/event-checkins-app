import React from "react";
import Index from "./index";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Scanner from "./Scanner";
const   Stack=createStackNavigator()
export default function index() {
  //we will define (under the folder `app`) our screens,
  //for now, we will return the Home, as the first screen,
  //it will change to the authed page that will redirect to Home Page.
  return (
    <Stack.Navigator>
    <Stack.Screen name="SCANNER" component={Index} />
    <Stack.Screen name="SCANNERQR" component={Scanner} options={{ headerShown: false }} />
  </Stack.Navigator>
   
  );
}