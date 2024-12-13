import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Signin from "./component/signin/auth";
import Event from "./component/event/event";
import CheckQr from "./component/checkqr/check";
import { CheckProvider } from "../frontend/context/CheckProvider";

import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json", // Common trigger for preflight requests
};
const TabNav = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <CheckProvider>
        <TabNav.Navigator>
          <TabNav.Screen name={"HOME"} component={Signin} />
          <TabNav.Screen name={"EVENT"} component={Event} />
          <TabNav.Screen name={"CHECKQR"} component={CheckQr} />
        </TabNav.Navigator>
      </CheckProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
