import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewsItem } from "../types/news";

const STORAGE_KEY = "submittedNews";

export const saveNewsToStorage = async (news: NewsItem & { image: string | null }) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = [...parsed, news];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving news:", err);
  }
};

export const getAllNewsFromStorage = async (): Promise<(NewsItem & { image: string | null })[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading news from storage:", err);
    return [];
  }
};

export const clearAllNewsFromStorage = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
