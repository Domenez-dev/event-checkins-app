import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import Overlay from './Overlay';

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [scanError, setScanError] = useState(false); // State for errors
  const [customMessage, setCustomMessage] = useState(null); // State for  messages
  const [hasScanned, setHasScanned] = useState(false); // in order to Prevent multiple scans

  const handleBarcodeScanned = async (e) => {
    if (hasScanned) return; // Ignore additional scans
    setHasScanned(true); // Lock scanning

    const scannedData = JSON.parse(e.data); 
    console.log("Scanned Data:", scannedData);
    setIsLoading(true);
    setScanError(false); // Reset error state before sending request
    setCustomMessage(null); // Clear any previous messages

    try {
      console.log("Sending data to backend...");
      const token = "ec8752e11ae0fea58a543c90ef8d7417c8239717";

      const response = await fetch('https://event-checkins-app.onrender.com/qr-code-scan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(scannedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        setCustomMessage(` ${errorData.error || 'An error occurred.'}`); // Set error message
        setScanError(true);
        return;
      }

      const responseData = await response.json();
      console.log('Response from backend:', responseData);
      setCustomMessage(`Success: ${responseData.message}`); // Set success message
    } catch (error) {
      console.error('Error sending data:', error.message);
      setCustomMessage('An error occurred while sending data to the server.'); // Set error message
      setScanError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setHasScanned(false), 2000); // Unlock scanning after 2 seconds
    }
  };

  const handleRetry = () => {
    setScanError(false); // Reset error state
    setCustomMessage(null); // Clear custom message
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to use the Camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay />

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {/*  Alert Box */}
      {customMessage && (
        <View style={styles.customAlert}>
          <Text style={styles.customAlertText}>{customMessage}</Text>
          {scanError && (
            <TouchableOpacity style={styles.retryButtonInside} onPress={handleRetry}>
              <Text style={styles.retryButtonTextInside}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 100,
    transform: [{ translateX: -100 }, { translateY: -50 }], 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000080',
    borderRadius: 10,
  },
  loadingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  customAlert: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#000080', 
    padding: 20,
    borderRadius: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, 
    alignItems: 'center',
  },
  customAlertText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButtonInside: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  retryButtonTextInside: {
    color: '#000080', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
