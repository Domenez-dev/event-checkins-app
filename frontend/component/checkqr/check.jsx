import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView
  
} from "react-native";
import { useCheck } from "../../context/CheckProvider";
export default function CheckQr() {
    const { isAdmin, token } = useCheck();
    if(!token){
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.text}>you cant access this page you first should login </Text>
          </KeyboardAvoidingView>
          );
      }
    if (!isAdmin ) {
        console.log(isAdmin)
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.text}>you are not an admin </Text>
          </KeyboardAvoidingView>
        );
      } 
      
return (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Text style={styles.text}>Qr code </Text>
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
