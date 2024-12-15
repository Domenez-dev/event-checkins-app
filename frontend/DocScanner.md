Scanner Component Documentation

Overview

The Scanner component provides functionality for scanning barcodes using the device's camera. It integrates with a backend server to process scanned data and provides feedback to the user via custom alerts and a loading indicator.

Features

Camera Permissions:
Requests camera access from the user.
Displays a prompt if permissions are not granted.

Barcode Scanning:
Utilizes the CameraView component to scan barcodes.
Processes scanned data and sends it to a backend endpoint.

Debounce Logic:
Prevents multiple scans by disabling scanning temporarily after each successful scan.

Feedback Mechanism:
Shows a loading indicator while the backend request is in progress.
Displays success or error messages in a custom alert box.

Retry Button:
Allows users to retry the scan if an error occurs.



State Variables

permission (object):
Tracks the camera permission state.
Values: null, granted, or denied.

isLoading (boolean):
Indicates if data is being sent to the backend.

scanError (boolean):
Tracks if there was an error during the backend request.

customMessage (string | null):
Holds success or error messages to display 

hasScanned (boolean):
Prevents multiple scans by temporarily disabling scanning after a barcode is detected.

Key Functions

1. handleBarcodeScanned(e)
Description: Handles barcode scan events.
Parameters:
e (object): The event containing barcode data.
Logic:
Parses scanned data and sends it to the backend using a POST request.
Displays a success or error message based on the server response.
Implements a debounce mechanism to prevent multiple scans.

2. handleRetry()
Description: Resets error states and clears the alert message.
Parameters: None.
Logic:
Resets scanError and customMessage state variables.

3. requestPermission()
Description: Requests camera permissions from the user.
Parameters: None.
Logic:
Uses useCameraPermissions to handle camera access.
Backend Integration
URL: https://event-checkins-app.onrender.com/qr-code-scan/
Method: POST
Headers:
json
{
  "Content-Type": "application/json",
  "Authorization": "Token <your-token-here>"
}
Body:
Sends the scanned data as a JSON payload.
Response Handling:
Displays responseData.message on success.
Displays errorData.error on failure.




Dependencies

expo-camera: For accessing and using the camera.
expo-router: For navigation and routing.
react-native: For UI components like View, Text, and TouchableOpacity.
