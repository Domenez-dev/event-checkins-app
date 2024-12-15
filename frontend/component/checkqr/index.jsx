import {Camera ,  CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button , TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { Link } from 'expo-router';
import Scanner from "./Scanner"
import { useCheck } from "../../context/CheckProvider";
export default function App() {
  const {  token } = useCheck();
  if(!token){
      return (
          <KeyboardAvoidingView  behavior="padding">
          <Text>you cant access this page you first should login </Text>
        </KeyboardAvoidingView>
        );
    }
  const [permission , requestPermission]= useCameraPermissions()
  
  return (
    <View style={styles.container}>
      
      <TouchableOpacity  style={styles.buttonText}>
       
          <Text style={{ color: 'white' }} onPress={() => navigation.navigate("SCANNERQR")} >Scan QR Code</Text>
      
      </TouchableOpacity>
    
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: '#000080', // Keeps your original color
    paddingVertical: 10, // Adjusts vertical padding for height
    paddingHorizontal: 20, // Adjusts horizontal padding for width
    color: 'white',
    borderRadius: 20, // Rounded corners to mimic the uploaded button
    textAlign: 'center',
    fontSize: 16, // Adjusts text size for readability
    overflow: 'hidden', // Ensures the text stays within the rounded edges
    elevation: 3, // Adds a subtle shadow for depth (Android only)
  },
});
