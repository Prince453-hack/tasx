import { Stack } from "expo-router";

export default function HomeRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "TasX", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
