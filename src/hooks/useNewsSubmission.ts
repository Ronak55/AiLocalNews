import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import * as yup from "yup";
import { NavigationProp, NewsItem } from "../types/news";
import { saveNewsToStorage } from "../utils/newsStorage";
import { validateAndEditNews } from "../utils/newsValidator";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .required("Description is required"),
  city: yup.string().required("City is required"),
  topic: yup.string().required("Topic is required"),
  firstName: yup.string().required("First name is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

export const useNewsSubmission = (navigation: NavigationProp) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsItem>({
    resolver: yupResolver(schema),
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access media library is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => setImage(null);

const onSubmit = async (data: NewsItem) => {
  setLoading(true);
  console.log("Submitting news:::::", data);
  try {
    const result = await validateAndEditNews(data);
    if (!result.accepted) {
      Alert.alert(
        "❌ Rejected by AI",
        result.reason || "Submission was not accepted."
      );
      return;
    }

    const cleanedNews: NewsItem & { image: string | null } = {
      title: result.title ?? data.title,
      description: result.summary ?? data.description,
      city: data.city,
      topic: data.topic,
      firstName: data.firstName,
      phone: data.phone,
      image: image || null,
    };

    await saveNewsToStorage(cleanedNews);
    reset();
    setImage(null);
    navigation.navigate("NewsFeed");
    // Alert.alert(
    //   "✅ Approved by AI",
    //   "Your news was accepted and published to the feed.",
    //   [
    //     {
    //       text: "OK",
    //       onPress: () => navigation.navigate("NewsFeed"),
    //     },
    //   ]
    // );
  } catch (err) {
    console.error("Submission error:", err);
    Alert.alert(
      "Error",
      "Something went wrong while processing your submission."
    );
  } finally {
    setLoading(false);
  }
};


  return {
    control,
    handleSubmit,
    errors,
    image,
    loading,
    pickImage,
    removeImage,
    onSubmit,
  };
};
