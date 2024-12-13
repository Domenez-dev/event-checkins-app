# Event Check-ins App - Full Stack Project

## Overview

This project is a full-stack event check-ins application built with **Django** for the backend and **React Native** for the mobile frontend. The app allows event organizers to create events, generate participant QR codes for check-ins, and manage the check-in process efficiently using QR code scanning.

The app was created for **educational purposes** as part of a **challenge from the Google Developer Group (GDG) Club Algiers**. It demonstrates practical skills in full-stack development, including backend API creation, frontend mobile app development, and deployment.

## Features

- **Authentication**:
    - Two types of users: Admins and Organizers, with different access privileges.
    - Admin users can create and manage events.
    - Organizers can scan participants' QR codes to check them in.

- **Event Creation**:
    - Admin users can create new events.
    - Each event has participants who are notified via email with unique QR codes containing event and participant details.

- **QR Code Check-ins**:
    - Participants receive QR codes that are scanned by the organizers to check them in.
    - The backend verifies the QR codes and handles check-in logic.

- **Email Notifications**:
    - Emails are sent to participants using the **Gmail API** with OAuth2 authentication, containing their unique QR codes and event details.

- **Deployment**:    
    - The app is deployed on **Render**, with a **PostgreSQL** database for data storage.
    - The app is accessible on mobile devices using the **React Native** frontend.

## Tech Stack

- **Backend**:
    - Django (Python Framework)
    - PostgreSQL
    - Gmail API with OAuth2 for sending emails
    - Django REST Framework for API development
    - Django Authentication system with custom user model

- **Frontend**:    
    - React Native for mobile app development

- **Tools & Libraries**:    
    - **Postman** for API testing
    - **Render** for deployment (both web service and database)
    - **OAuth2** for secure email integration

## Setup Instructions

### Prerequisites

- Python 3.x
- Node.js and npm (for React Native)
- PostgreSQL (for database)
- Google Cloud account (for Gmail API OAuth2 credentials)

### Backend Setup

1. Clone the repository:
    
    ```bash
    git clone https://github.com/domenez-dev/event-checkins-app.git
    cd event-checkins-app
    ```
    
2. Install backend dependencies:
    
    ```bash
    pip install -r requirements.txt
    ```
    
3. Set up environment variables for database and Gmail API credentials:
    
    - Create a `.env` file in the root directory and add the following:
        
        ```bash
        DATABASE_URL=database_url
        SECRET_KEY=django_secret_key
        ```
        
4. Apply database migrations:
    
    ```bash
    python manage.py migrate
    ```
    
5. Run the backend server:
    
    ```bash
    python manage.py runserver
    ```
    

### Frontend Setup

1. Navigate to the **frontend** directory:
    
    ```bash
    cd frontend
    ```
    
2. Install React Native dependencies:
    
    ```bash
    npm install
    ```
    
3. Run the React Native development server:
    
    ```bash
    npm start
    ```
    
4. Use Expo or a physical device/emulator to run the mobile app.
    

### Testing the API

You can test the backend APIs using **Postman**:

- Import the Postman collection from the `docs/API-Documentation.json` file.
- Test API endpoints like:
    - Create participant (`POST /api/participants/`)
    - Event creation (`POST /api/events/`)
    - Check-in QR code (`POST /api/checkins/`)

### Deployment

1. Push the code to your GitHub repository.
2. Set up **Render** services for both web and database:
    - Create a Render account and link your GitHub repository.
    - Deploy the Django app as a **Web Service** and PostgreSQL as a **Database**.
3. Set environment variables in Render’s settings for database and Gmail API credentials.
4. Your app should now be live and accessible through the provided Render URL.

## Documentation

- [API Endpoints Documentation](docs/API-Documentation.md)
- [Database Structure Documentation](docs/backend/database-structure.md)
- [GitHub Workflow Documentation](docs/Workflow-for-github)
- OAuth2 and Gmail API Integration
- Testing and QA Procedures
- Deployment and Maintenance Guide

## Contributing