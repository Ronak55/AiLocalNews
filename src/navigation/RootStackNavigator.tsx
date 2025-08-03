import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NewsFeedScreen from "../screens/NewsFeedScreen";
import NewsSubmissionScreen from "../screens/NewsSubmissionScreen";

export type RootStackParamList = {
  NewsSubmission: undefined;
  NewsFeed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="NewsSubmission">
      <Stack.Screen
        name="NewsSubmission"
        component={NewsSubmissionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
