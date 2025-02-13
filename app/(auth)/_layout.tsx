import { useAuth } from "@clerk/clerk-expo";
import { DarkTheme } from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function AuthRoutesLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const theme = useColorScheme();

  if (!isLoaded) return null;
  if (isSignedIn) return <Redirect href="/(index)" />;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "#000000e5" : "#ffffffe4",
        },
        headerTitleStyle: {
          fontSize: 30,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen name="sign-up" options={{ headerTitle: "Sign Up" }} />
      <Stack.Screen
        name="reset-password"
        options={{ headerTitle: "Reset Password" }}
      />
    </Stack>
  );
}
