import React from "react";
import {
    ActivityIndicator,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import NewsCard from "../components/NewsCard";
import { useNewsFeed } from "../hooks/useNewsFeed";

export default function NewsFeedScreen() {
  const {
    loading,
    filteredNews,
    cityFilter,
    topicFilter,
    setCityFilter,
    setTopicFilter,
  } = useNewsFeed();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading news feed...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📰 Local News Feed</Text>

      <View style={styles.filters}>
        <TextInput
          placeholder="Filter by City"
          style={styles.input}
          value={cityFilter}
          onChangeText={setCityFilter}
        />
        <TextInput
          placeholder="Filter by Topic"
          style={styles.input}
          value={topicFilter}
          onChangeText={setTopicFilter}
        />
      </View>

      {filteredNews.length === 0 ? (
        <Text style={styles.emptyText}>No news found. Try changing filters.</Text>
      ) : (
        <FlatList
          data={filteredNews}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <NewsCard news={item} />}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 40 : 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1c1c1e",
    marginBottom: 20,
    textAlign: "center",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#444",
  },
});
