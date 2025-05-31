import { NovuProvider } from "@novu/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./pages/HomeScreen";
import NotificationPreferences from "./pages/NotificationPreferences";
import NotificationsScreen from "./pages/NotificationsScreen";

//  Novu configuration
// Replace with your actual Novu App ID, API key and a subscriber ID
// Novu App ID and API Key can be found in the "API Keys" section of your Novu dashboard
const NOVU_APP_IDENTIFIER = "YOUR_NOVU_APP_IDENTIFIER";
const NOVU_API_KEY = "YOUR_NOVU_API_KEY";
const SUBSCRIBER_ID = "YOUR_SUBSCRIBER_ID";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NovuProvider
      applicationIdentifier={NOVU_APP_IDENTIFIER}
      subscriberId={SUBSCRIBER_ID}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationPreferences"
            component={NotificationPreferences}
            options={{ title: "Update your preferences" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NovuProvider>
  );
}
