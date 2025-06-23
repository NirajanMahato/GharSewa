# Technician Booking App

A modern and responsive mobile application built with **React Native (Expo Router)** that allows **customers** to book skilled technicians (e.g., electricians, plumbers, carpenters) based on location, and **technicians** to manage service requests, track earnings, and update their availability.

## 🌟 Features

### 🔑 Authentication

- Email/password registration and login for both customers and technicians
- Role-based navigation: Customer and Technician flows

### 📱 Customer App

- Search technicians by service type and location
- Two search modes: **Rapid** (fastest available) or **Slow** (view all)
- Real-time technician availability
- Live chat after technician accepts booking
- Booking history and status updates

### 🧰 Technician App

- Dashboard with toggle for **Online/Offline** status
- Accept or reject incoming service requests
- Manage service bookings and view customer details
- View monthly income and past payouts
- Profile editing and logout functionality

### 📦 Admin Panel (Web - coming soon)

- Technician approval/rejection
- Booking analytics and revenue reports
- Dispute management

---

## 🔧 Tech Stack

- **React Native (Expo Router)**
- **React Navigation + Drawer + Tabs**
- **MongoDB, Express.js (Backend)**
- **Socket.IO for real-time notifications**
- **AsyncStorage** for persistent auth
- **Custom UI with Tailwind-style themes + vector icons**

---

## 🚀 Getting Started

### Clone the Repo

```bash
git clone https://github.com/NirajanMahato/technician-booking-app.git
cd technician-booking-app
npm install
npm run android
```
