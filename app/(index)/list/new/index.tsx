import IconCircle from "@/components/IconCircle";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { backgroundColors, emojis } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function NewTaskScreen() {
  const theme = useColorScheme();
  const [taskId, setTaskId] = useState("");
  const isValidTaskId = useMemo(() => isValidUUID(taskId), [taskId]);
  const router = useRouter();

  const randomEmojis = useMemo(
    () => emojis[Math.floor(Math.random() * emojis.length)],
    []
  );

  const randomColor = useMemo(
    () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    []
  );

  const joinTaskTaskCallback = (taskId: string) => {};

  const handleJoinTask = () => {};

  const handleDismissTo = (screen: Href) => {
    if (router.canDismiss()) {
      router.dismiss();

      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  };

  return (
    <BodyScrollView
      contentContainerStyle={{
        backgroundColor: theme === "light" ? "white" : "#212121",
        height: "100%",
        paddingHorizontal: 25,
        gap: 32,
      }}
    >
      <View style={styles.draggable}></View>
      <View
        style={{ alignItems: "center", gap: 16, padding: 20, marginTop: 15 }}
      >
        <IconCircle
          emoji={randomEmojis}
          size={75}
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
        <Button onPress={() => handleDismissTo("/list/new/create")}>
          Create New Task
        </Button>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginTop: 15,
          }}
        >
          <View style={styles.line} />
          <Text style={{ color: "gray" }}>or join existing</Text>
          <View style={styles.line} />
        </View>
      </View>

      <View style={{ gap: 16 }}>
        <TextInput
          placeholder="Enter task code"
          containerStyle={{ marginBottom: 0 }}
          value={taskId}
          onChangeText={setTaskId}
          onSubmitEditing={(e) => joinTaskTaskCallback(e.nativeEvent.text)}
        />

        <Button onPress={handleJoinTask} disabled={!isValidTaskId}>
          Join Task
        </Button>
        <Button
          variant="ghost"
          onPress={() => handleDismissTo("/list/new/scan")}
        >
          Scan QR Code
        </Button>
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
