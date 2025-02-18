import { ThemedText } from "@/components/ThemedText";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList } from "react-native";

export default function ListScreen() {
  const router = useRouter();
  const { taskId } = useLocalSearchParams() as { taskId: string };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "" }} />
      <FlatList
        data={[taskId]}
        renderItem={({ item }) => <ThemedText>{item}</ThemedText>}
        contentInsetAdjustmentBehavior="automatic"
      />
    </>
  );
}
