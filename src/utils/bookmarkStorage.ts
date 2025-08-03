import AsyncStorage from "@react-native-async-storage/async-storage";

export const getBookmarkStatus = async (title: string): Promise<boolean> => {
  try {
    const key = `bookmark:${title}`;
    const stored = await AsyncStorage.getItem(key);
    return !!stored;
  } catch (err) {
    console.error("Error reading bookmark:", err);
    return false;
  }
};

export const toggleBookmarkStatus = async (
  title: string,
  currentStatus: boolean
): Promise<boolean> => {
  try {
    const key = `bookmark:${title}`;
    if (currentStatus) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, "true");
    }
    return !currentStatus;
  } catch (err) {
    console.error("Error toggling bookmark:", err);
    return currentStatus;
  }
};
