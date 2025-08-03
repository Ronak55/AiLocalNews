import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller } from "react-hook-form";
import {
    ActivityIndicator,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNewsSubmission } from "../hooks/useNewsSubmission";
import { NavigationProp, NewsItem } from "../types/news";

export default function NewsSubmissionScreen() {
 const navigation = useNavigation<NavigationProp>();
  const {
    control,
    handleSubmit,
    errors,
    image,
    loading,
    pickImage,
    removeImage,
    onSubmit
  } = useNewsSubmission(navigation);

  const renderInput = (
    name: keyof NewsItem,
    label: string,
    multiline?: boolean
  ) => (
    <View style={styles.inputGroup} key={name}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={`Enter ${label}`}
            value={value ?? ''}
            onChangeText={onChange}
            multiline={multiline}
            numberOfLines={multiline ? 6 : 1}
            style={[styles.input, multiline && styles.multilineInput]}
          />
        )}
      />
      {errors[name] && <Text style={styles.error}>{errors[name]?.message}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>🗞️ News Submission Form</Text>
      {[
        { name: "title", label: "Title" },
        { name: "description", label: "Description", multiline: true },
        { name: "city", label: "City" },
        { name: "topic", label: "Topic" },
        { name: "firstName", label: "First Name" },
        { name: "phone", label: "Phone Number" },
      ].map((field) =>
        renderInput(
          field.name as keyof NewsItem,
          field.label,
          field.multiline
        )
      )}

      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text style={styles.imageButtonText}>
          {image ? "Change Image" : "Upload Image (Optional)"}
        </Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: image }}
            style={styles.previewImage}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={removeImage} style={styles.removeIcon}>
            <Text style={styles.removeIconText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.submitButton, loading && { opacity: 0.7 }]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.submitButtonText}>Submit News</Text>
        )}
      </TouchableOpacity>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  multilineInput: {
    height: 150,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  imageButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  imageButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 16,
    alignSelf: "stretch",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  removeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  removeIconText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
  },
});
