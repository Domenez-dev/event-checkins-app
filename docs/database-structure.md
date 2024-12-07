### **Database Schema Overview**

#### **Tables**:
1. **Users**:
   - `id` (Primary Key)
   - `name`, `email`, `password`
   - `created_at`

2. **Events**:
   - `id` (Primary Key)
   - `name`, `description`
   - `start_time`, `end_time`
   - `created_by` (ForeignKey to Users)

3. **Check-Ins**:
   - `id` (Primary Key)
   - `name`
   - `email`
   - `event_id` (ForeignKey to Events)
   - `check_in_time`

4. **QR Codes**:
   - `id` (Primary Key)
   - `event_id` (ForeignKey to Events)
   - `qr_data` (JSONB for flexibility)
   - `created_at`

