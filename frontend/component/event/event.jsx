import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  
} from "react-native";

export default function Event() {
return (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Text style={styles.text}>Event </Text>
  </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#B1F0F7",
  alignItems: "center",
  justifyContent: "center",
  padding: 20 ,
},

text: {
  fontSize: 50,
  marginBottom: 20, // Adjust margin for better spacing
},

});
