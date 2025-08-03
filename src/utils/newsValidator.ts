import { NewsItem } from "../types/news";

const SPAMMY_WORDS = ["buy now", "earn money", "click here"];
const UNSAFE_WORDS = ["violence", "kill", "hate", "bomb"];
const RELEVANT_KEYWORDS = [
  "local",
  "incident",
  "accident",
  "festival",
  "event",
  "community",
];

export const validateAndEditNews = async (data: NewsItem) => {
  const desc = data.description.toLowerCase();
  const title = data.title.toLowerCase();

  const isSpam = SPAMMY_WORDS.some(word => title.includes(word) || desc.includes(word));
  const hasUnsafeContent = UNSAFE_WORDS.some(word => desc.includes(word));
  const isRelevant = RELEVANT_KEYWORDS.some(word => desc.includes(word));
  const isTooShort = data.description.trim().length < 50;

  if (isSpam || hasUnsafeContent || isTooShort || !isRelevant) {
    return {
      accepted: false,
      reason:
        "Your submission was rejected. It may be too short, off-topic, or contain inappropriate content.",
    };
  }

  const sentences = data.description
    .trim()
    .match(/[^.!?]+[.!?]+/g) || [];

  const summary = sentences.slice(0, 2).join(" ").trim();

  return {
    accepted: true,
    title: `Local News: ${data.title.trim()}`,
    summary: summary || `${data.description.trim().slice(0, 120)}...`,
  };
};
