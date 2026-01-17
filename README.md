## Decription:

Please checkout the application which I have created using React Native as part of technical assessment for Wagons Learning Limited.

I have tried to cover all the mentioned points from the Assessment document shared via mail and have implemented all the requested functionalities. I apologies if I have missed something.

## 📁 Submission Contents

This folder contains:

1. **Source Code:** Full React Native project (excluding `node_modules` - I have removed the node_modules folder as it was mentioned as not required in document).
2. **APK File:** A signed release APK (`app-release.apk`) is included in the root directory for immediate testing on an Android device without needing a build environment.

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18 or newer recommended)
- Java Development Kit (JDK 17)
- Android Studio & Android SDK

### Steps to Run the Code

1.  Open the folder in VS Code or any relevant code editor.

    ## OR

    If no code editor is available, Open the folder -> Perform right mouse-click (anywhere in the open space visible) -> Click on "Open in terminal" option from the menu.

    ## OR

    Click on the folder's address bar -> Enter "cmd"

2.  In the opened terminal, enter the following commands sequentially:

        1. npm install -> It will install the node modules with all the necessary dependencies.

        2. npm start

    ## Now open one more terminal in the same way as before (Second terminal - while the first one is still open)

        3. npm run android (Please make sure that the mobile device is physically connected to the system via USB cable OR the android emulator is installed on the system)

3.  Once done you can either run the application locally on your mobile device OR can simply install the standalone application from the folder.

    **Please find the application in the same folder. Application is named as "app-release.apk"**

## Tech Stack and Approach

I followed the component-based architechture using Functional Components and React Hooks.

State management is achieved using _useState_.

List is rendered using _useEffect_.

Navigation is implemented using _Native Stack Navigation_.

I have used _Flatlist_ for rendering the list to improve the efficiency of the application.

I have used _axios_ for performing Network Calls (API calls) for fetching the JSON placeholder data. Added the retry mechanism incase of API response failure.
