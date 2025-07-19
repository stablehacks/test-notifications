import React from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Image,
} from "react-native";
import { useNotifications, Notification } from "@novu/react-native";
// import messaging from "@react-native-firebase/messaging";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export function NovuNotification() {
  const { notifications, isLoading, fetchMore, hasMore, refetch } =
    useNotifications();

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationHeader}>
        <View style={styles.notificationDot} />
      </View>
      <Text style={styles.notificationTitle}>
        {item.title || "Notification"}
      </Text>
      <Text style={styles.notificationBody}>{item.body}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#FF8C00" />
        <Text style={styles.footerText}>Loading more...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No updates available </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={styles.loadingText}>Loading notifications...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={["#FF8C00"]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f8fa",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FF8C00",
    fontWeight: "500",
  },
  listContainer: {
    padding: 16,
    backgroundColor: "#f5f8fa",
    minHeight: "100%",
  },
  notificationCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF8C00",
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  notificationBody: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
