# Event Check-ins App

![React Native](https://img.shields.io/badge/Frontend-React%20Native-blue?style=flat-square&logo=react) ![Django](https://img.shields.io/badge/Backend-Django-green?style=flat-square&logo=django) ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat-square&logo=postgresql) ![Static Badge](https://img.shields.io/badge/Status-uncomplete-red?style=flat-square)

## 🚀 Overview

This **Event Check-ins App** is a full-stack application built with **Django** and **React Native**. Designed for efficient event management, it enables organizers to:

- Create events 🗓️
- Generate and send participant QR codes 📧
- Manage check-ins via QR code scanning ✅

Developed as part of a **Google Developer Group (GDG) Club Algiers challenge**, it showcases full-stack development skills, including API creation, mobile app development, and deployment.

---

## 🎯 Features

### 🔐 Authentication
- **Admins**: Create and manage events.
- **Organizers**: Scan QR codes to check in participants.

### 🗓️ Event Management
- Admins can create events.
- Participants receive personalized emails with their unique QR codes and event details.

### 📲 QR Code Check-ins
- Organizers scan QR codes for instant participant check-ins.
- Secure backend validation ensures smooth operation.

### 📧 Email Notifications
- Automated emails sent via **Gmail API** using OAuth2, containing QR codes and event information.

### 🌐 Deployment
- Backend hosted on **Render** with a **PostgreSQL** database.
- Mobile app built with **React Native**.

---

## 🛠️ Tech Stack

### **Backend**
- ![Django](https://img.shields.io/badge/-Django-092E20?style=flat-square&logo=django&logoColor=white)
- PostgreSQL
- Gmail API (OAuth2 for secure email integration)
- Django REST Framework

### **Frontend**
- ![React Native](https://img.shields.io/badge/-React%20Native-61DAFB?style=flat-square&logo=react&logoColor=black)

### **Tools**
- Postman for API testing
- Render for deployment
- OAuth2 for secure authentication

---

## 📂 Project Documentation

Check out the [📚 Official Docs](https://domenez-dev.gitbook.io/event-checkins-app) for complete details!

---

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.x
- Node.js and npm (for React Native)
- PostgreSQL (database)
- Google Cloud account (for Gmail API OAuth2 credentials)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/domenez-dev/event-checkins-app.git
    cd event-checkins-app
    ```

2. Install dependencies:
    ```bash
    cd backend/checkins-backend
    pip install -r requirements.txt
    ```

3. Copy the environment variables from the .env.example file
    ```bash
    mv ../backend/.env.example .env
    ```

4. Apply migrations:
    ```bash
    python manage.py migrate
    ```

5. Run the server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Use Expo or a device emulator to run the app.

---

## 🧪 Testing the API

Use **Postman** to test the API endpoints. Import the Postman collection from `docs/API-Documentation.json` and try endpoints like:

- Create participant (`POST /api/participants/`)
- Create event (`POST /api/events/`)
- Check-in QR code (`POST /api/checkins/`)

---

## 🚀 Deployment

1. Push your code to GitHub.
2. On Render, set up:
    - **Web Service** for the Django backend.
    - **Database** for PostgreSQL.
3. Add environment variables for database and Gmail API credentials.

Your app is now live 🎉!

---

## 👥 Contributors
Abdou2425
beskie04
fbben

gdg Developers Integrating Program for 2024/2025 Team Dev 6:

|<img src="https://avatars.githubusercontent.com/domenez-dev" width="140">|<img src="https://avatars.githubusercontent.com/Abdou2425" width="140">|<img src="https://avatars.githubusercontent.com/beskie04" width="140">|<img src="https://avatars.githubusercontent.com/fbben" width="140">
|:---------------------------------------------------:|:---------------------------------------------------:|:---------------------------------------------------:|:---------------------------------------------------:|
| [**Bouzara Zakaria**](https://github.com/domenez-dev) | [**Abed Abderrahmane**](https://github.com/Abdou2425) | [**bachferrag bouchra**](https://github.com/beskie04) | [**Fares Benziada**](https://github.com/fbben) |

---

## 📜 License

The app was created for **educational purposes** as part of a **challenge from the Google Developer Group (GDG) Club Algiers**. It demonstrates practical skills in full-stack development, including backend API creation, frontend mobile app development, and deployment.
