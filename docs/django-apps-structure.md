### **Django Apps Structure**

1. **`users`** (Authentication System for Organizers)
   - **Purpose**:
     - Handle organizer registration (via seeding) and login/logout.
     - Manage authentication and permissions.
   - **Features**:
     - Organizers login system.
     - Middleware for restricting access to organizer-only views.
   - **Models**: 
     - Organizer (inherits from `AbstractUser` or `BaseUser`).
   - **Views**: 
     - Login/logout endpoints.
   - **URLs**: 
     - `/login/`, `/logout/`.


2. **`events`** (Event Management)
   - **Purpose**:
     - Handle creation and management of events by organizers.
     - Store event details (name, date, description).
   - **Features**:
     - Organizer can create new events.
     - Event CRUD (as needed for organizers).
   - **Models**: 
     - Event (fields: `id`, `name`, `description`, `date`, `organizer_id`).
   - **Views**: 
     - Create event.
     - List organizer's events.
   - **URLs**: 
     - `/events/create/`, `/events/`.


3. **`participants`** (Participant Management & Email System)
   - **Purpose**:
     - Store participant details (name, email, check-in status, etc.).
     - Generate and send QR codes to participants via email.
   - **Features**:
     - Manage participant list for each event.
     - Generate QR codes for participants.
     - Send QR codes to participant emails.
   - **Models**:
     - Participant (fields: `id`, `name`, `email`, `event_id`, `checked_in`, `qr_code`).
   - **Views**:
     - Generate QR codes.
     - Send emails to participants.
   - **URLs**:
     - `/participants/` (CRUD operations).


4. **`checkins`** (QR Code Scanning & Validation)
   - **Purpose**:
     - Handle scanning and validation of QR codes.
     - Update participant check-in status in the database.
   - **Features**:
     - QR code validation API endpoint.
     - Update participant `checked_in` status in the database.
   - **Models**:
     - None (uses `participants` table for check-in updates).
   - **Views**:
     - Validate QR codes.
     - Update check-in status.
   - **URLs**:
     - `/checkin/` (QR code validation API).


5. **`utils`** (Reusable Utilities)
   - **Purpose**:
     - Include shared utilities like QR code generation, email sending, and HMAC signature logic.
   - **Features**:
     - QR code generation logic.
     - Email-sending logic (e.g., using Django’s `EmailMessage` or third-party APIs like SendGrid).
     - Signature generation and validation functions.
   - **Shared functions for**:
     - Generating QR codes.
     - Sending emails.
     - Hash/signature generation and validation.

