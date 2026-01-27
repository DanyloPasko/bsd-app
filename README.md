# BSD App

## Installation

1) Install Node.js and npm.
2) Install dependencies:

```bash
npm install
```

3) Create a `.env` file with the API base URL:

```bash
EXPO_PUBLIC_API_BASE=https://www.boerse-stuttgart.de
```

4) For iOS (macOS), install CocoaPods and run:

```bash
cd ios
pod install
```

## Framework choice

This app is built with Expo on top of React Native. Expo is used to speed up development and provide a consistent dev-client workflow across platforms.

## Menu rendering approach

The side menu is rendered via a custom React Navigation drawer. Menu items are fetched from the API, normalized into a tree, and displayed with a simple stack-based drill‑down. Leaf items update the current WebView URL.

## Deep link handling

Deep links are handled in `App.tsx` using Expo Linking. The app parses the incoming URL and routes known paths (for example, `events`) to the corresponding WebView URL.

## Run with Expo Go (iOS/Android)

1) Start Metro:

```bash
npx expo start
```

2) Open Expo Go on your iPhone or Android device and scan the QR code.

## Download ready APK (Android)

To preview the finished app without running the code, download and install this APK:
- https://expo.dev/artifacts/eas/x6cp4EyVQVfSiD5qeLvy3j.apk

## Deep linking tests require a dev build

To test deep links, either install the ready Android APK above or build a dev build yourself (Expo Go does not support this).

## Android dev build

Option 1: install the prebuilt dev build:
- https://expo.dev/accounts/danil.pasco/projects/bsd-app/builds/9fa8f267-df4d-4b84-9d4b-487698b45140

Option 2: build your own dev build:
- Update `app.json` if needed.
- Build with EAS (`eas build`) or Android Studio.

## iOS dev build

1) Open `ios/*.xcworkspace` in Xcode.
2) In Signing & Capabilities, select your Team (Apple ID).
3) Connect your iPhone to the Mac via cable (or choose a simulator).
4) Click Run/Build.
