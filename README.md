# 📰 AI Local News App

An AI-powered mobile app that allows users to validate and improve local news articles using a mocked GPT editing flow. Built with React Native using Expo.

---

## 📱 Download & Test

- **Android (APK):** [Download here](https://expo.dev/accounts/irohnyyy/projects/local-news-ai/builds/afb0f678-836c-4a2d-8732-e5dac5c77faf)
- **iOS (Expo Preview only):** View it using Expo Go [here](https://expo.dev/accounts/irohnyyy/projects/local-news-ai/updates)

> iOS builds were tested via Expo Go (no real device builds due to macOS/Apple ID limitations)

---

## 🛠️ Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/Ronak55/AiLocalNews.git
cd AiLocalNews
```
### 2. Install dependencies

```bash
npm install
```
### 3. Start the app

```bash
npx expo start
```
You can scan the QR code using the Expo Go app on your Android or iOS device.

## 🧠 Rules used to accept or reject a submission:

❌ Spammy language is flagged (e.g., "buy now", "earn money", "click here")
⚠️ Unsafe content like "violence", "kill", "hate", "bomb" causes rejection
📉 Too short descriptions (under 50 characters) are rejected
🧩 Irrelevant topics (not mentioning local events or incidents) are rejected
✂️ Editing strategy for accepted news:

If a submission passes all checks:

The title is prefixed with "Local News:"
The description is summarized using the first 1–2 sentences

## 🧱 Assumptions & Limitations

No GPT or OpenAI API is used — all editing is mock logic written by us
News Submissions are stored in local storage implemented using react native async storage
