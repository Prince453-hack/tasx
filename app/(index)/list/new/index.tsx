import IconCircle from "@/components/IconCircle";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { backgroundColors, emojis } from "@/constants/Colors";
import { useMemo } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function NewListScreen() {
  const theme = useColorScheme();

  const randomEmojis = useMemo(
    () => emojis[Math.floor(Math.random() * emojis.length)],
    []
  );

  const randomColor = useMemo(
    () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    []
  );

  return (
    <BodyScrollView
      contentContainerStyle={{
        backgroundColor: theme === "light" ? "white" : "#212121",
        height: "100%",
        paddingHorizontal: 25,
      }}
    >
      <View style={styles.draggable}></View>
      <View
        style={{ alignItems: "center", gap: 16, padding: 20, marginTop: 15 }}
      >
        <IconCircle
          emoji={randomEmojis}
          size={60}
          backgroundColor={randomColor}
          style={{ marginBottom: 8 }}
        />
        <ThemedText style={{ paddingTop: 2 }} type="title">
          Better Together
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.subtitle}>
          Create shared task and collaborate real-time with friends
        </ThemedText>
      </View>

      <View style={{ gap: 16 }}>
        <Button>New List</Button>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View style={styles.line} />
          <Text style={{ color: "gray" }}>or join existing</Text>
          <View style={styles.line} />
        </View>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: "gray",
    textAlign: "center",
  },
  draggable: {
    height: 6,
    width: 40,
    backgroundColor: "gray",
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
  },
});
