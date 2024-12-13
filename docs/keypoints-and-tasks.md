### **1. Authentication System (Organizers)**
- **Login Screen**:
  - Input fields for email and password.
  - Integration with the backend for authentication via API.
  - Show error messages for invalid credentials.
  - Handle authorization token storage securely.

- **Logout Functionality**:
  - Logout button that clears the token and navigates to the login screen.

---

### **2. Event Management**
- **Dashboard/Home Screen**:
  - List all events created by the organizers.
  - Include an option to create a new event.

- **Create Event Screen**:
  - Form with fields for event details (`name`, `description`, `start date`, `end date`, `location`).
  - Submit button to send data to the backend and create an event.
  - Feedback (success message or error).

- **Event Details Screen**:
  - Display details of a selected event.
  - Show a list of participants for the event.

---

### **3. Participant Management**
- **Participant List Screen**:
  - Display a list of participants for the selected event.
  - Indicate whether each participant has checked in or not.

---

### **4. QR Code Functionality**
- **QR Code Scanning**:
  - Implement a QR code scanner using a library like `react-native-qrcode-scanner` (or any library you think should do).
  - On successful scan:
    - Extract data (`participant_id`, `event_id` and `signature`) from the QR code.
    - Send the scanned data to the backend API to update the participant’s check-in status.
;

---

### **5. API Integration**
- Define and document all API endpoints (provided by the backend).
- Ensure proper error handling for all API requests.
- Implement loaders and feedback during API calls.

---

### **6. Deployment and Testing**
- Using some lightweight tool that will be decided later for quick development and testing.
- Ensure compatibility with both Android and iOS.
- Test QR code scanning across different devices.

---

### **For the Frontend Team**
1. **First Developer**:
   - Authentication (Login/Logout).
   - Token management and navigation setup.

2. **Second Developer**:
   - Dashboard and Event Management.
   - Create Event and Event Details screens.

3. **Third Developer**:
   - QR Code Scanning
   - Sending a request to backend server containing Extracted data

