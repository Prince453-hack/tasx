import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { appleBlue, backgroundColors, emojis } from "@/constants/Colors";
import { useTaskCreation } from "@/context/TaskCreationContext";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateScreen() {
  const handleCreateTask = () => {};
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { selectedColor, setSelectedColor, setSelectedEmoji, selectedEmoji } =
    useTaskCreation();

  useEffect(() => {
    setSelectedEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    setSelectedColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    return () => {
      setSelectedEmoji("");
      setSelectedColor("");
    };
  }, []);

  return (
    <>
      <Stack.Screen
        options={{ headerTitle: "New Task", headerTitleAlign: "center" }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Essentials Tasks"
            size="lg"
            variant="ghost"
            returnKeyType="done"
            value={taskName}
            onChangeText={setTaskName}
            onSubmitEditing={handleCreateTask}
            autoFocus
            inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />

          <Link
            href={{ pathname: "/emoji-picker" }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}
          >
            <View style={styles.emojiContainer}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>

          <Link
            href={{ pathname: "/color-picker" }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}
          >
            <View style={styles.emojiContainer}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: selectedColor,
                  borderRadius: 100,
                }}
              />
            </View>
          </Link>
        </View>
        <TextInput
          placeholder="Description (optional)"
          variant="ghost"
          returnKeyType="done"
          value={taskDescription}
          onChangeText={setTaskDescription}
          inputStyle={styles.descriptionInput}
          onSubmitEditing={handleCreateTask}
        />

        <Button
          onPress={handleCreateTask}
          disabled={!taskName}
          variant="ghost"
          textStyle={styles.createButtonText}
        >
          Create List
        </Button>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: appleBlue,
    fontWeight: "normal",
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
