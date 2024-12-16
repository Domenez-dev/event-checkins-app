# Authentication

## Overview

The authentication module provides functions for user sign-in, logout, and access control for different parts of the application based on user roles (admin and super user).

## Functions

### 1. Sign-In
- **Description**: Authenticates the user by posting the email and password to the backend. On success, it retrieves and stores a token and the user's admin status.
- **Process**:
  - **Request**: Sends a POST request with the user's email and password.
  - **Response**: Receives a token and an `is_admin` boolean.
  - **Storage**: Stores the token in `AsyncStorage` for authorization in future requests. The `is_admin` boolean is stored to control access to admin-specific features.
- **Usage**:
  - The token is used to set the authorization header for authenticated requests.
  - The `is_admin` boolean allows the application to restrict access to certain features to only admin users.

### 2. Logout
- **Description**: Logs out the user by invalidating the token on the backend and clearing stored session data.
- **Process**:
  - **Request**: Sends a POST request with the token to the backend endpoint to invalidate it.
  - **Response**: On success, the token is deleted on the backend.
  - **Storage**: Clears the token and `is_admin` status from `AsyncStorage`.

## Access Control

### Check QR Page
- **Access**: This page is accessible only to super users and admins.

### Event Page
- **Access**: This page is accessible only to admins. Regular users cannot access this page.

## Example Code

### Sign-In Function
```javascript
async function signIn(email, password) {
  try {
    const response = await fetch('https://your-backend-endpoint/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('is_admin', JSON.stringify(data.is_admin));
      // Handle successful sign-in
    } else {
      // Handle sign-in error
    }
  } catch (error) {
    // Handle network or other errors
  }
}
```

Public code references from 1 repository
Logout Function
```JavaScript

async function logout() {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('https://your-backend-endpoint/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    if (response.ok) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('is_admin');
      // Handle successful logout
    } else {
      // Handle logout error
    }
  } catch (error) {
    // Handle network or other errors
  }
}
```
