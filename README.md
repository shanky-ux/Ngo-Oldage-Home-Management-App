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
  <img src="https://img.shields.io/badge/Status-Actively%20Maintained-brightgreen?style=for-the-badge"/>
</p>

---

## 📌 Overview

The **NGO Old Age Home Management App** is a React Native mobile application designed to digitize and streamline resident management in NGOs and old age homes.
It replaces manual registers with a structured and scalable digital system.

---

## 🚀 Current Development Status

This project is actively being improved with:
- Code refactoring
- UI improvements
- Architecture enhancements
- Future backend integration planning

📅 *Regular updates are being pushed to maintain consistency and continuous development.*

---

## 🎯 Problem Statements

Many NGOs still rely on:
- Paper-based records  
- Manual attendance  
- Disorganized medical tracking  

This causes:
- Data loss  
- Monitoring difficulty  
- Poor scalability  

This app provides a centralized digital solution.

---

## ✨ Key Features

- 👤 Add & Manage Resident Profiles  
- 📅 Attendance Tracking  
- 💊 Medical Logs  
- 📞 Emergency Contacts  
- 📊 Structured Data View  
- 📱 Clean Mobile Interface  

---

## 🧠 Core Modules

- AddResidentScreen  
- ResidentListScreen  
- ResidentProfileScreen  
- AttendanceScreen  
- MedicalLogScreen  

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    USER([👤 NGO Staff / Admin]) --> APP

    subgraph APP["📱 PRESENTATION LAYER — React Native Screens"]
        S1[AddResidentScreen]
        S2[ResidentListScreen]
        S3[ResidentProfileScreen]
        S4[AttendanceScreen]
        S5[MedicalLogScreen]
    end

    S1 & S2 & S3 & S4 & S5 --> NAV

    subgraph NAV["🧭 NAVIGATION LAYER"]
        N1[Stack Navigator]
        N2[Tab Navigator]
        N1 <--> N2
    end

    NAV --> STATE

    subgraph STATE["📦 DATA LAYER — Local State Management"]
        ST1[useState / useContext]
        ST2[Custom Hooks]
        ST3[TypeScript Models & Schemas]
        ST1 --- ST2
        ST2 --- ST3
    end

    STATE --> STORE

    subgraph STORE["💾 LOCAL STORAGE"]
        AS[(AsyncStorage)]
    end

    STORE -->|Planned Integration| BACKEND

    subgraph BACKEND["☁️ BACKEND LAYER — Upcoming"]
        B1[Firebase Auth]
        B2[Firestore Database]
        B3[Node.js REST API]
        B1 --- B2
        B2 --- B3
    end

    style APP fill:#0f2027,color:#fff,stroke:#00C9A7
    style NAV fill:#162535,color:#fff,stroke:#00C9A7
    style STATE fill:#1a2f3a,color:#fff,stroke:#00C9A7
    style STORE fill:#203a43,color:#fff,stroke:#00C9A7
    style BACKEND fill:#2c5364,color:#fff,stroke:#00C9A7,stroke-dasharray: 6 3
    style USER fill:#00C9A7,color:#000
```

---

## 🔄 End-to-End Processing Flow

```mermaid
flowchart TD
    A([👤 NGO Staff Opens App]) --> B[Home Dashboard]
    B --> C{Select Action}

    C -->|Add New| D[AddResidentScreen]
    C -->|View Records| E[ResidentListScreen]
    C -->|Mark Attendance| F[AttendanceScreen]
    C -->|Log Health| G[MedicalLogScreen]

    D --> D1[Fill Resident Form]
    D1 --> D2[Validate TypeScript Schema]
    D2 --> D3[(Save to Local State / AsyncStorage)]

    E --> E1[Fetch Resident List]
    E1 --> E2[ResidentProfileScreen]
    E2 --> E3{Action}
    E3 -->|Edit| D
    E3 -->|View Logs| G

    F --> F1[Load Today's Residents]
    F1 --> F2[Mark Present / Absent]
    F2 --> F3[(Update Attendance Record)]

    G --> G1[Select Resident]
    G1 --> G2[Enter Medication / Notes]
    G2 --> G3[(Save Medical Entry)]

    D3 & F3 & G3 --> H[(Local Data Store)]
    H -->|Future Integration| I[☁️ Firebase / Node.js Backend]

    style A fill:#0f2027,color:#fff
    style I fill:#2c5364,color:#fff,stroke-dasharray: 5 5
    style H fill:#203a43,color:#fff
```

---

## 🌐 Request Lifecycles

```mermaid
sequenceDiagram
    participant U as 👤 User (Staff)
    participant UI as 📱 UI Screen
    participant NAV as 🧭 Navigator
    participant HOOK as ⚙️ Hook / State
    participant STORE as 💾 Local Store
    participant API as ☁️ Backend API (Planned)

    U->>UI: Triggers Action (e.g. Add Resident)
    UI->>NAV: Navigate to AddResidentScreen
    NAV-->>UI: Screen Mounted

    U->>UI: Fills Form & Submits
    UI->>HOOK: Call handleSubmit()
    HOOK->>HOOK: Validate with TypeScript schema
    alt Validation Passes
        HOOK->>STORE: Save resident data
        STORE-->>HOOK: Confirm saved
        HOOK-->>UI: Show success toast
        UI-->>NAV: Navigate back to list
    else Validation Fails
        HOOK-->>UI: Show inline error
    end

    Note over STORE,API: Future: sync local → cloud
    STORE-->>API: POST /residents (planned)
    API-->>STORE: 200 OK + ID assigned
```

---

## ☁️ Cloud Execution Flow *(Planned Architecture)*

```mermaid
flowchart LR
    subgraph CLIENT["📱 Mobile Client"]
        A[React Native App]
        B[Local AsyncStorage Cache]
    end

    subgraph GATEWAY["🔐 API Gateway"]
        C[Auth Middleware\nJWT Verification]
        D[Rate Limiter]
    end

    subgraph BACKEND["⚙️ Backend Services"]
        E[Node.js REST API]
        F[Resident Service]
        G[Attendance Service]
        H[Medical Log Service]
    end

    subgraph STORAGE["☁️ Cloud Storage"]
        I[(Firebase Firestore)]
        J[(Firebase Auth)]
        K[Firebase Storage\nProfile Photos]
    end

    A -->|HTTPS Request + JWT| C
    C --> D
    D --> E
    E --> F & G & H
    F & G & H --> I
    C --> J
    A --> B
    B -.->|Offline Sync| E
    F --> K

    style CLIENT fill:#0f2027,color:#fff
    style GATEWAY fill:#1a1a2e,color:#fff
    style BACKEND fill:#203a43,color:#fff
    style STORAGE fill:#2c5364,color:#fff
```

> 💡 *Cloud execution is part of the upcoming backend integration roadmap. The mobile app is being designed to be cloud-ready from day one.*

---

## 🛠 Tech Stack

- React Native  
- TypeScript  
- Expo  
- React Navigation  

---

## 🔮 Upcoming Improvements

- 🔐 Admin Authentication  
- ☁️ Firebase / Node.js Backend  
- 📊 Dashboard Analytics  
- 📤 PDF Report Export  
- 🌙 Dark Mode  

---

## 📊 Project Goal

To demonstrate how mobile technology can create **real-world social impact solutions** for NGOs and community organizations.

---

## 👨‍💻 Author

**Ravi Shankar**  
B.Tech CSE (AIML)  
AI & Full Stack Enthusiast  
GitHub: https://github.com/shanky-ux  

---

## 📜 License

MIT License

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:2c5364,50:203a43,100:0f2027&height=120&section=footer"/>
</p>
