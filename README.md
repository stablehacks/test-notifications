# PopIn Notifications Template

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Emulator (for Android development)
- Expo Go app on your physical device (optional)

## Installation

1. **Clone and navigate to the project directory**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Update your Novu App ID, API Key, and Subscriber ID**

- The following pages need to have an app id, api key, and subscriber id for the test notifications to work:
  - App.js: needs App ID, API key, and subscriber ID
  - NotificationPreferences.js: needs subscriber ID and API Key in the PATCH request

4. **Start the development server**
   ```bash
   npx expo start
   ```
5. **Test Notification System**
   Toggle the notifiation preferences on the notification preferences screen, then reload the subscriber preferences tab in Novu to see the changes
