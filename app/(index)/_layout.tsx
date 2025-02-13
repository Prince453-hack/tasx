import Button from "@/components/ui/button";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";

export default function HomeRoutesLayout() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "TasX", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="list/new/index"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.9, 0.9],
          sheetGrabberVisible: true,
          headerShown: false,
          sheetCornerRadius: 25,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.75, 1],
          sheetGrabberVisible: true,
          headerShown: false,
          sheetCornerRadius: 25,
        }}
      />
      <Stack.Screen
        name="list/new/scan"
        options={{
          presentation: "fullScreenModal",
          headerLargeTitle: false,
          headerTitle: "Scan QR Code",
          headerLeft: () => (
            <Button variant="ghost" onPress={() => router.back()}>
              Cancel
            </Button>
          ),
        }}
      />
    </Stack>
  );
}
