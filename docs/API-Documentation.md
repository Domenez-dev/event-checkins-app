# API Documentation

This document describes the APIs and endpoints for the event check-ins app, making it easier for the frontend to integrate with the backend.

---

## Base URL
1. app root url for development :
	- `127.0.0.1:8000/`

2. always add this to your request header except for Login endpoint:
	- `Content-Type: application/json`
	- `Authorization: Token <token>`

3.  `<token>` is retrieved after a user successfully in logged in and is used to Authenticate active user session
 

---

## Authentication

### Login

**Endpoint:** `POST /authentication/login/`

**Description:** Authenticates an organizer and returns a token for accessing secured endpoints.

#### Request
- **Headers:**
  - `Content-Type: application/json`

- **Body:**
  ```json
  {
    "email": "<email>",
    "password": "<password>"
  }
  ```

#### Response
- **Success (200):**
  ```json
  {
    "token": "<auth_token>"
  }
  ```

- **Error (401):** Invalid credentials.
  ```json
  {
    "error": "Invalid username or password."
  }
  ```

### Logout

**Endpoint:** `POST /authentication/logout/`

**Description:** Logs out the organizer and invalidates the token.

#### Request
- **Headers:**
  - `Content-Type: application/json`

#### Response
- **Success (204):**
  No content.

---

## Endpoints

### 1. Scan QR Code

**Endpoint:** `POST /qr-code-scan/`

**Description:** Handles scanning and verifying QR codes for participants at an event.

#### Request
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Token <token>`

- **Body:**
  ```json
  {
    "event_id": "<event_id>",
    "participant_id": "<participant_id>",
    "signature": "<qr_signature>"
  }
  ```

#### Response
- **Success (200):**
  ```json
  {
    "message": "Check-in successful."
  }
  ```

- **Error (400):** Missing required fields.
  ```json
  {
    "error": "Missing required fields."
  }
  ```

- **Error (403):** Invalid QR signature.
  ```json
  {
    "error": "Invalid signature."
  }
  ```

- **Error (404):** Participant or Event not found.
  ```json
  {
    "error": "Not found."
  }
  ```

- **Error (409):** Participant already checked in.
  ```json
  {
    "error": "Participant already checked in."
  }
  ```

### 2. Event Management

#### Create Event

**Endpoint:** `POST /events/create/`

**Description:** Allows organizers to create a new event.

#### Request
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Token <token>`

- **Body:**
  ```json
  {
    "name": "Event Name",
    "date": "2024-12-15",
    "location": "Event Location"
  }
  ```

#### Response
- **Success (201):**
  ```json
  {
    "id": 10,
    "name": "Event Name",
    "date": "2024-12-15",
    "location": "Event Location",
    "participants": []
  }
  ```

- **Error (400):** Missing or invalid fields.
  ```json
  {
    "error": "Invalid input."
  }
  ```

#### List Events

**Endpoint:** `GET /events/list/`

**Description:** Retrieves a list of all events created by the organizer.

#### Request
- **Headers:**
  - `Authorization: Token <token>`
  - `Content-Type: application/json`

#### Response
- **Success (200):**
  ```json
  [
    {
      "id": 1,
      "name": "Event One",
      "date": "2024-12-10",
      "location": "Location A"
    },
    {
      "id": 2,
      "name": "Event Two",
      "date": "2024-12-12",
      "location": "Location B"
    }
  ]
  ```

#### Event Details (Participants)

**Endpoint:** `GET /events/details/?event_id=1/`

**Description:** Retrieves the list of participants for a specific event, including their check-in status.

#### Request
- **Headers:**
  - `Authorization: Token <token>`
  - `Content-Type: application/json`

- **Path Parameter:**
  - `event_id` - ID of the event.

#### Response
- **Success (200):**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "check_in_time": "2024-12-10T09:30:00Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "check_in_time": null
    }
  ]
  ```

- **Error (404):** Event not found.
  ```json
  {
    "error": "Event not found."
  }
  ```

#### Manual Participant Check-in

**Endpoint:** `GET /events/check-in/`

**Description:** Fetches the annual statistics of participant check-ins across all events.

#### Request
- **Headers:**
  - `Authorization: Token <token>`
  - `Content-Type: application/json`

#### Response
- **Success (200):**
  ```json
  {
    "total_events": 12,
    "total_participants": 345,
    "checked_in": 289
  }
  ```


