import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (isSignedIn) return <Redirect href="/(index)" />;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Sign In", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerTitle: "Sign Up", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="reset-password"
        options={{ headerTitle: "Reset Password", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
