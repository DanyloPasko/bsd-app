# BSD App

A mobile application built with React Native featuring WebView navigation and deep linking support.

---

## 📋 Requirements

- **Node.js 20+**
- **npm** or **yarn**
- For iOS: **Xcode** and **CocoaPods**
- For Android: **Android Studio** or **EAS CLI**

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file with the API base URL:

```env
EXPO_PUBLIC_API_BASE=https://www.boerse-stuttgart.de
```

### 3. Install iOS Dependencies (macOS)

```bash
cd ios
pod install
cd ..
```

### 4. Run with Expo Go

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app on your device (iOS/Android).

---

## 📱 Building & Distribution

### Ready APK for Android

A pre-built APK for quick demonstration:
- [Download APK](https://expo.dev/artifacts/eas/iqjmXF5Asp8Cg4TPgzFbAe.apk)

### Dev Build for Android

Dev Build is required to test deep linking (Expo Go does not support this).

**Option 1: Use Pre-built Dev Build**
- [Dev Build for Android](https://expo.dev/accounts/danil.pasco/projects/bsd-app/builds/cf20504e-bf33-4458-8cdb-58b212780c3a)

**Option 2: Build Your Own Dev Build**
```bash
eas build --platform android --profile preview
```

### Dev Build for iOS

1. Open `ios/*.xcworkspace` in Xcode
2. Go to **Signing & Capabilities** and select your Team (Apple ID)
3. Connect your iPhone via cable or select a simulator
4. Click **Run** / **Build**

---

## 🏗️ Architecture

### Technology Stack

- **Expo** — Framework for rapid React Native application development
- **React Native** — Cross-platform mobile development
- **React Navigation** — Screen navigation and routing
- **WebView** — Embedded browser for displaying web content
- **Reanimated** — High-performance animations

### Project Structure

```
src/
├── api/              # API client and menu configuration
├── fonts/            # Typography and font styles
├── hooks/            # Custom React hooks
├── navigation/       # Navigation and routing
├── screens/          # Application screens
│   └── MenuScreen/   # Menu screen
│       └── components/
│           ├── Header.tsx
│           └── menu/              # Menu components
│               ├── Menu.tsx
│               └── components/
│                   ├── MenuItemComponent.tsx
│                   ├── MenuStatus.tsx
│                   └── MenuHeader.tsx
├── store/            # Global state management (Zustand)
└── utils/            # Utilities and constants
```

### Key Components

#### Menu Screen
- Full-screen menu opened from the header
- Menu items fetched from API and displayed as a tree structure
- Supports drill-down navigation through submenus
- Tapping on leaf items updates the WebView URL and closes the menu

#### Deep Linking
- Deep links are handled in `App.tsx` using Expo Linking
- Parses incoming URLs and routes known paths (e.g., `events` → corresponding WebView URL)

---

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
