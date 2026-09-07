# MediCare - Medical & Healthcare Management System (MERN Stack)

MediCare is a full-featured Healthcare Management & Consultation Platform built using React, Vite, Tailwind CSS, Express.js, Node.js, and MongoDB.

---

## 🌟 Features

### 🏢 Public Portal
- **Home Page**: Hero section, core services, top doctor highlights, pharmacy preview.
- **About Hospital**: Hospital mission, accreditation badges, emergency hotline info.
- **Doctor Directory**: Search by doctor name, filter by medical specialty, view profiles, and book appointments.
- **Online Pharmacy**: Browse OTC & Rx medicines by category, filter search, add to cart, and checkout with simulated payment gateway.
- **Lab Test Booking**: Certified diagnostic packages with home sample collection options.
- **Medical Blog**: Health articles written by specialist doctors.
- **Contact Page**: Direct inquiry form and 24/7 emergency care contacts.

### 👤 Patient Dashboard
- View upcoming and past appointments.
- Track appointment approval status (Pending, Approved, Rejected, Completed).
- View doctor prescriptions & medical notes.
- Manage personal health profile (Age, Gender, Blood Group, Address).

### 🩺 Doctor Dashboard
- Manage patient consultation queue.
- Approve or Reject appointment requests.
- Add digital prescriptions & diagnostic notes.
- Update doctor profile & consultation fees.

### 🛡️ Admin Dashboard
- Hospital metrics & stats overview (Total Doctors, Patients, Consultations, Pharmacy stock).
- **Manage Doctors**: Onboard new doctors, edit profiles, delete doctor records.
- **Manage Patients**: View patient registry and contact details.
- **Manage Pharmacy**: Add new medicines, adjust price & stock levels, delete items.
- **Manage Appointments**: Master view of all system appointments.

---

## 🔑 Demo Login Accounts

| Role | Email | Password |
|---|---|---|
| **Patient** | `patient@medicare.com` | `patient123` |
| **Doctor** | `sarah.jenkins@medicare.com` | `doctor123` |
| **Admin** | `admin@medicare.com` | `admin123` |

---

## 🛠️ Quick Setup & Installation

### 1. Install Backend Dependencies & Start Server
```bash
cd server
npm install
npm run seed  # Pre-populates sample doctors, medicines, admin & patients
npm run dev   # Runs backend server at http://localhost:5000
```

### 2. Install Frontend Dependencies & Start Client
```bash
cd client
npm install
npm run dev   # Runs React client at http://localhost:5173
```
