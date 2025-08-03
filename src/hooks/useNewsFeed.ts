import { useEffect, useState } from "react";
import { NewsItem } from "../types/news";
import { getAllNewsFromStorage } from "../utils/newsStorage";

export function useNewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [cityFilter, setCityFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewsFromStorage();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [news, cityFilter, topicFilter]);

  const loadNewsFromStorage = async () => {
    try {
      const storedNews = await getAllNewsFromStorage();
      setNews(storedNews);
    } catch (err) {
      console.error("Failed to load news", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = news.filter((item) => {
      const matchCity = cityFilter
        ? item.city.toLowerCase().includes(cityFilter.toLowerCase())
        : true;
      const matchTopic = topicFilter
        ? item.topic.toLowerCase().includes(topicFilter.toLowerCase())
        : true;
      return matchCity && matchTopic;
    });
    setFilteredNews(filtered);
  };

  return {
    loading,
    filteredNews,
    cityFilter,
    topicFilter,
    setCityFilter,
    setTopicFilter,
  };
}
