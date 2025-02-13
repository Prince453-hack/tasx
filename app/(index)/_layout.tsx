import Button from "@/components/ui/button";
import { TaskCreationProvider } from "@/context/TaskCreationContext";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

export default function HomeRoutesLayout() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <TinyBaseProvider>
      <TaskCreationProvider>
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
              headerTitleAlign: "center",
              headerLargeTitle: false,
              headerTitle: "Scan QR Code",
              headerLeft: () => (
                <Button variant="ghost" onPress={() => router.back()}>
                  Cancel
                </Button>
              ),
            }}
          />
          <Stack.Screen
            name="emoji-picker"
            options={{
              headerShadowVisible: false,
              presentation: "formSheet",
              sheetAllowedDetents: [0.5, 0.5],
              sheetCornerRadius: 25,
              sheetGrabberVisible: true,
            }}
          />
          <Stack.Screen
            name="color-picker"
            options={{
              headerShadowVisible: false,
              presentation: "formSheet",
              sheetAllowedDetents: [0.5, 0.5],
              sheetCornerRadius: 25,
              sheetGrabberVisible: true,
            }}
          />
        </Stack>
      </TaskCreationProvider>
    </TinyBaseProvider>
  );
}
