import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function NotificationPreferences() {
  const [inApp, setInApp] = useState(true);
  const [push, setPush] = useState(false);
  const [email, setEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (type) => {
    const updatedPrefs = {
      inApp: type === "inApp" ? !inApp : inApp,
      push: type === "push" ? !push : push,
      email: type === "email" ? !email : email,
    };

    setLoading(true);

    try {
      const response = await fetch(
        // add subscriber ID here
        `https://api.novu.co/v2/subscribers/<SUBSCRIBERID>/preferences`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // add API key to <APIKEY> placeholder
            Authorization: `ApiKey <APIKEY>`,
          },
          body: JSON.stringify({
            channels: {
              email: updatedPrefs.email,
              in_app: updatedPrefs.inApp,
              push: updatedPrefs.push,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response:", data);
      } else {
        setInApp(updatedPrefs.inApp);
        setPush(updatedPrefs.push);
        setEmail(updatedPrefs.email);
      }
    } catch (err) {
      console.error("Error updating preferences:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Preferences</Text>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={styles.loadingText}>Saving preferences...</Text>
        </View>
      )}

      <View style={styles.preference}>
        <Text style={styles.label}>In-App Notifications</Text>
        <View style={styles.switchContainer}>
          {loading && (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={styles.miniLoader}
            />
          )}
          <Switch
            value={inApp}
            onValueChange={() => handleToggle("inApp")}
            disabled={loading}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={inApp ? "#0000ff" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.preference}>
        <Text style={styles.label}>Push Notifications</Text>
        <View style={styles.switchContainer}>
          {loading && (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={styles.miniLoader}
            />
          )}
          <Switch
            value={push}
            onValueChange={() => handleToggle("push")}
            disabled={loading}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={push ? "#0000ff" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.preference}>
        <Text style={styles.label}>Email Notifications</Text>
        <View style={styles.switchContainer}>
          {loading && (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={styles.miniLoader}
            />
          )}
          <Switch
            value={email}
            onValueChange={() => handleToggle("email")}
            disabled={loading}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={email ? "#0000ff" : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  loadingText: {
    marginLeft: 10,
    color: "#0000ff",
    fontStyle: "italic",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniLoader: {
    marginRight: 8,
  },
});
