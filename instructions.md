# Project Specification: Börse Stuttgart Mobile Wrapper

## 1. Objective
[cite_start]Build a minimal React Native application using **TypeScript** that wraps the Börse Stuttgart web app and implements native navigation components[cite: 1, 2, 23].

## 2. Core Behavior & Navigation
* [cite_start]**Cold Start:** Load the web app from `https://www.boerse-stuttgart.de/de-de`[cite: 5, 6].
* [cite_start]**Default Screen:** Market Overview (Marktübersicht)[cite: 7].
* **Webview Integration:** Use `react-native-webview`. [cite_start]All web content must be displayed inside the app shell[cite: 4, 7].
* [cite_start]**User-Agent:** For the mobile version of the site, all requests must use the User-Agent: `bsgapp`[cite: 29, 30].

## 3. Native Menu Configuration
[cite_start]The app must feature a **Native Menu** (Drawer or Modal) that controls the WebView[cite: 8, 9]:
* [cite_start]**API Endpoint:** `https://www.boerse-stuttgart.de/de-de/api/bsg-feature-navigation/MenuConfiguration/GetConfiguration`[cite: 11, 12].
* **Requirements:**
    * [cite_start]Support nested (multilevel) menu items[cite: 13].
    * [cite_start]Selecting an item must load the corresponding URL into the WebView[cite: 14].
    * [cite_start]Ignore "secure" flags; treat them as normal links[cite: 15].
    * [cite_start]Search functionality can be omitted[cite: 25].

## 4. Deep Linking
* [cite_start]**Protocol:** `bsgapp://events`[cite: 18].
* [cite_start]**Target:** Must open the Events screen at `https://www.boerse-stuttgart.de/de-de/anlegerclub/events/`[cite: 19, 20].

## 5. UI & Styling
* [cite_start]**Brand Color:** `rgb(100, 50, 250)`[cite: 27].
* [cite_start]**Splash Screen:** Single-colored screen using the brand color[cite: 28].
* [cite_start]**Visuals:** Align the UI with the provided reference images (Purple header with "Börse Stuttgart" title)[cite: 25, 39].

## 6. Technical Constraints
* [cite_start]**Framework:** React Native CLI or Expo[cite: 22].
* [cite_start]**Language:** TypeScript[cite: 23].
* [cite_start]**State Management:** Candidate's choice[cite: 24].