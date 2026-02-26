<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,50:203a43,100:2c5364&height=200&section=header&text=NGO%20Old%20Age%20Home%20Management%20App&fontSize=35&fontColor=ffffff&animation=fadeIn&fontAlignY=35"/>
</p>

<p align="center">
  <b>📱 Digitizing Resident Management for NGOs & Old Age Homes</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-Mobile%20App-61DAFB?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/TypeScript-Strongly%20Typed-3178C6?style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/badge/Expo-Development-000020?style=for-the-badge&logo=expo"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
</p>

---

## 📌 Overview

The **NGO Old Age Home Management App** is a React Native mobile application designed to digitize and streamline resident management in old age homes.

This application replaces manual record-keeping with a structured digital system for:

- Resident profiles  
- Attendance trackin
- Medical logs  
- Emergency contact management  

Built as part of a community initiative, this project demonstrates real-world software solutions for social impact.

---

## 🎯 Problem Statement

Many NGOs and old age homes still rely on:

- Paper-based records  
- Manual attendance tracking  
- Unstructured medical documentation  

This leads to:
- Data loss  
- Inefficient management  
- Difficulty in monitoring residents  

This app provides a centralized digital management system to solve these challenges.

---

## ✨ Key Features

- 👤 Add & Manage Resident Profiles  
- 📅 Attendance Tracking System  
- 💊 Medical Log Management  
- 📞 Emergency Contact Details  
- 📊 Organized Resident Overview  
- 📱 Clean and responsive mobile UI  

---

## 🏗️ Application Architecture

The project follows a modular mobile application structure.

### 1️⃣ Presentation Layer
- React Native screens
- Component-based UI structure
- Clean navigation flow

### 2️⃣ Data Layer
- Mock data handling (extendable to backend API)
- Structured resident objects
- Attendance & medical record models

### 3️⃣ Navigation Layer
- Stack navigation system
- Screen-to-screen routing

---

## 📂 Project Structure

```
Ngo-Oldage-Home-Management-App/
│
├── assets/                     # App icons & images
│
├── screens/                    # Application screens
│   ├── AddResidentScreen.tsx
│   ├── ResidentListScreen.tsx
│   ├── ResidentProfileScreen.tsx
│   ├── AttendanceScreen.tsx
│   ├── MedicalLogScreen.tsx
│   ├── SettingsScreen.tsx
│   └── TermsScreen.tsx
│
├── App.tsx                     # Root component
├── index.ts                    # Entry point
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── app.json                    # Expo configuration
├── .gitignore
└── README.md
```

---

## 🧠 Core Modules Explained

### 🔹 AddResidentScreen
Handles creation of new resident profiles with personal and contact details.

### 🔹 ResidentListScreen
Displays all registered residents in structured list format.

### 🔹 ResidentProfileScreen
Shows detailed profile including:
- Age
- Address
- Emergency contact
- Medical information
- Attendance history

### 🔹 AttendanceScreen
Tracks daily attendance records.

### 🔹 MedicalLogScreen
Stores and manages medical history and prescriptions.

---

## 🔄 Application Flow

1. Admin opens the application.
2. Admin adds resident details.
3. Resident data is stored in structured format.
4. Attendance and medical logs are recorded.
5. Admin can view detailed profile anytime.

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Mobile Framework | React Native |
| Language | TypeScript |
| Development Tool | Expo |
| Navigation | React Navigation |
| Architecture | Component-Based |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Ngo-Oldage-Home-Management-App.git
cd Ngo-Oldage-Home-Management-App
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm start
```

Or using Expo:

```bash
npx expo start
```

---

## 🚀 Future Enhancements

- 🔐 Authentication system  
- ☁️ Backend integration (Node.js / Firebase)  
- 📊 Analytics dashboard  
- 📁 Cloud-based data storage  
- 📤 Export reports (PDF/Excel)  
- 🌙 Dark mode support  

---

## 🌍 Social Impact

This project was developed to support NGOs in transitioning from manual record systems to digital management.

It demonstrates how technology can improve:

- Administrative efficiency  
- Data organization  
- Healthcare tracking  
- Emergency management  

---

## 👨‍💻 Author

**Ravi Shankar**  
B.Tech CSE (AIML)  
AI & Full Stack Enthusiast  

GitHub: https://github.com/shanky-ux  

---

## 📜 License

This project is licensed under the MIT License.
