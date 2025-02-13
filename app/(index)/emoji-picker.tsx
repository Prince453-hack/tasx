import { ThemedText } from "@/components/ThemedText";
import { emojis } from "@/constants/Colors";
import { useTaskCreation } from "@/context/TaskCreationContext";
import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function EmojiPickerScreen() {
  const { setSelectedEmoji } = useTaskCreation();
  const router = useRouter();
  const theme = useColorScheme();

  const handleEmojiPress = (emoji: string) => {
    setSelectedEmoji(emoji);
    router.back();
  };

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? "white" : "#212121",
        paddingBottom: 130,
      }}
    >
      <View style={styles.draggable} />

      <ThemedText style={styles.text}>Choose an Emoji</ThemedText>
      <FlatList
        data={emojis}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleEmojiPress(item)}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 40 }}>{item}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item}
        numColumns={5}
        automaticallyAdjustContentInsets
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  draggable: {
    height: 6,
    width: 40,
    backgroundColor: "gray",
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "700",
  },
});
