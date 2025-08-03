import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NewsItem } from "../types/news";
import {
  getBookmarkStatus,
  toggleBookmarkStatus,
} from "../utils/bookmarkStorage";

type NewsCardProps = {
  news: NewsItem;
};

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const load = async () => {
      const status = await getBookmarkStatus(news.title);
      setIsBookmarked(status);
    };
    load();
  }, [news.title]);

  const handleToggleBookmark = async () => {
    const updated = await toggleBookmarkStatus(news.title, isBookmarked);
    setIsBookmarked(updated);
  };

  const maskPhone = (phone: string) =>
    phone.slice(0, 3) + "****" + phone.slice(-2);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{news.title}</Text>
        <TouchableOpacity
          onPress={handleToggleBookmark}
          accessibilityLabel="Bookmark toggle"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color="#007bff"
          />
        </TouchableOpacity>
      </View>
      {news.image ? (
        <Image source={{ uri: news.image }} style={styles.image} />
      ) : null}
      <Text style={styles.description}>{news.description}</Text>

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{news.city}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{news.topic}</Text>
        </View>
      </View>

      <Text style={styles.meta}>
        Posted by <Text style={styles.metaBold}>{news.firstName}</Text> |{" "}
        {maskPhone(news.phone)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: Platform.OS === "android" ? 3 : 0,
    borderWidth: 1,
    borderColor: "#f1f1f1",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f1f1f",
    flex: 1,
    marginRight: 8,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: "cover",
  },
  description: {
    fontSize: 15,
    color: "#4a4a4a",
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#eef4ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: "#3a8cff",
    fontWeight: "600",
  },
  meta: {
    fontSize: 12,
    color: "#666",
  },
  metaBold: {
    fontWeight: "600",
    color: "#222",
  },
});


export default NewsCard;
