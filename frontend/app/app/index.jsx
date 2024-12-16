
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,   TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function App() {

  
  return (
    <View style={styles.container}>
      
      <TouchableOpacity  style={styles.buttonText}>
        <Link href="/Scanner"> // link to the file Scanner.jsx
          <Text style={{ color: 'white' }}>Scan QR Code</Text>
        </Link>
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
    backgroundColor: '#000080', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    color: 'white',
    borderRadius: 20, 
    textAlign: 'center',
    fontSize: 16, 
    overflow: 'hidden', 
    elevation: 3, 
  },
});
