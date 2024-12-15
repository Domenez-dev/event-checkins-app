## Event Check-in System - Backend Documentation

### Overview

The Event Check-in System backend is built with Django and serves as the foundation for managing participants, events, and check-ins using QR codes. The system supports two types of users (admins and organizers) with different roles, an email system to send QR codes to participants, and a mechanism to verify check-ins using scanned QR codes.

The backend is deployed on Render with PostgreSQL as the database, and Django's built-in authentication system is used to manage user authentication. The frontend is built with React Native, which interacts with this backend for user authentication, event creation, and participant check-ins.

### Features

1. **User Authentication**:
    
    - Admins and organizers are authenticated using Django's built-in authentication system.
    - Admin users have full permissions for creating events and managing the system, while organizers can only check participants' QR codes.
    - [Details about User Model](#User-Model) and [Authentication System](#Authentication-System).
2. **Email System**:
    
    - QR codes, along with participant and event IDs and hashed signatures, are sent to participants via email using the Gmail API with OAuth2.
    - [Details about Email Setup](#Email-System).
3. **Event Management**:
    
    - Admins can create new events and manage participants.
    - Each event has associated participants with QR codes for check-in.
    - [Details about Event Creation](#Event-Management).
4. **Check-in System**:
    
    - Participants scan their QR codes, which are verified by the server to determine whether they are checked in.
    - The server handles the scanned QR code data and processes it accordingly.
    - [Details about Participant Check-in](#Check-in-System).
5. **Deployment**:
    
    - The app is deployed on Render with PostgreSQL for database services.
    - [Details about Deployment](#Deployment).

### User Model

The user model extends Django's `AbstractUser`, adding an attribute `is_admin` to differentiate between admin and organizer users. Admins have permission to create events and view events, while organizers are only able to check participants' QR codes. The model uses Django's built-in authentication system, ensuring secure login and token-based sessions.

- **Admin Users**: Can create events, view events, and manage the system.
- **Organizer Users**: Can only check-in participants using the scanned QR codes.

### Authentication System

The system uses Django's authentication to manage users. The authentication flow is token-based, and sessions are handled via Django's built-in token system. Admin users have full access to the event creation and management features, while organizers only have the ability to check-in participants.

For more details, check out [Authentication Setup](#Authentication-Setup).

### Email System

The email system utilizes the Gmail API with OAuth2 to send QR codes to participants. Each email contains a unique QR code for the participant, along with the corresponding event ID, participant ID, and a hashed signature for validation.

- **Gmail API Setup**: OAuth2 credentials are required to authenticate and send emails.
- **QR Code Generation**: QR codes are generated containing essential details like participant ID and event ID.

For more details on setting up the email system, visit [Email System Setup](#Email-System-Setup).

### Event Management

Admins can create new events and assign participants to these events. Each event has a unique ID, and participants are sent QR codes with their event ID and participant ID.

- **Event Creation**: Admin users can create events via the backend.
- **Participant Assignment**: Participants are automatically assigned to events and receive their QR codes via email.

For more details on event creation, see [Event Management](#Event-Management).

### Participant Check-in

The check-in system verifies participants using QR codes. When a participant scans their QR code, the app sends the QR code data to the server, which checks the validity of the information and updates the participant's check-in status.

- **QR Code Scanning**: The frontend sends the scanned QR code data, which includes participant ID, event ID, and the hashed signature.
- **Check-in Validation**: The server checks if the data is correct and marks the participant as checked-in if valid.

For more information on the check-in process, visit [Check-in System Details](#Check-in-System).

### Deployment

The application is hosted on Render, a cloud platform, and uses PostgreSQL for database services. The app runs as a web service on Render and is connected to a PostgreSQL database for storing user, event, and participant information.

- **Database**: PostgreSQL is used for data persistence.
- **Render**: The app is deployed on Render, which provides both the web service and the database service.

For deployment details, visit [Deployment on Render](#Deployment).