import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStackNavigator";

export type NewsItem = {
  title: string;
  description: string;
  city: string;
  topic: string;
  firstName: string;
  phone: string;
  image?: string | null; // Optional image URL
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type NewsSubmissionProps = {
  onSubmitNews: (data: NewsItem & { image: string | null }) => void;
};