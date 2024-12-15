import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Signin() {
  const navigation = useNavigation();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  async function loginUser(e) {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("authentication/login/", {
        email,
        password,
      });
      //i add this
      console.log(data.is_admin);
      console.log(data.token);
      const token = data.token;
      async function savetoken() {
        await AsyncStorage.setItem("auth_token", token);
        await AsyncStorage.setItem("is_admin", JSON.stringify(data.is_admin));
      }
      savetoken();
      //end
      setdata({
        email: "",
        password: "",
      });
      navigation.navigate("EVENT");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.error);
      }
      console.log(error);
    }
  }
  async function logoutUser(e) {
    e.preventDefault();
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const is_admin = await AsyncStorage.getItem("is_admin");
      if (!token) {
        alert("you are already logout");
        return;
      } else if (!is_admin) {
        alert("you are an anonnyme ");
        return;
      }
      console.log(token);
      console.log(is_admin)
      if (token) {
        await axios.post(
          "authentication/logout/",
          {},
          {
            headers: { Authorization: `token ${token}` },
          }
        );
      }
      async function deleteToken() {
        await AsyncStorage.removeItem("auth_token");
        await AsyncStorage.removeItem("is_admin");
      }
      deleteToken();
      alert("loged out success");
      navigation.navigate("EVENT");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.detail);
      }
      console.log(error);
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("../../assets/register.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.text}>Sign In</Text>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            setdata({ ...data, email: text });
          }}
          value={data.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => {
            setdata({ ...data, password: text });
          }}
          secureTextEntry
          value={data.password}
        />
      </View>

      {/* <Button title="Sign In" style={styles.signup} onPress={loginUser } /> */}
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logoutUser}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B1F0F7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inputGroup: {
    width: "100%", // Make sure inputs take full width
    marginBottom: 20, // Add some space below the inputs
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10, // Adjust margin to reduce space
    fontSize: 18,
    borderRadius: 20,
  },
  text: {
    fontSize: 50,
    marginBottom: 20, // Adjust margin for better spacing
  },
  button: {
    backgroundColor: "#007BFF", // Change this to your desired button color
    paddingVertical: 18, // Increase vertical padding for a bigger button
    paddingHorizontal: 40, // Increase horizontal padding for a bigger button
    borderRadius: 25, // Set border radius to 25
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the text inside the button
    marginTop: 10, // Add some space above the button
  },
  buttonText: {
    color: "#FFFFFF", // Change text color to white
    fontSize: 20, // Adjust font size as needed
  },
});
