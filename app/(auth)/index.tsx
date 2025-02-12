import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import {
  isClerkAPIResponseError,
  useClerk,
  useSignIn,
} from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function SignInScreen() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [error, setError] = useState<ClerkAPIError[]>([]);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    setIsSignedIn(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        console.error("Failed to sign in");
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        setError(error.errors);
      }
    } finally {
      setIsSignedIn(false);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <BodyScrollView contentContainerStyle={{ padding: 20, marginTop: 20 }}>
      <TextInput
        label="Email"
        value={emailAddress}
        placeholder="Enter Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <TextInput
        label="Password"
        value={password}
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={(pass) => setPassword(pass)}
      />
      <Button
        onPress={onSignInPress}
        loading={isSignedIn}
        disabled={!emailAddress || !password || isSignedIn}
      >
        Sign In
      </Button>

      {error.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Don't have an account?</ThemedText>
        <Button onPress={() => router.push("/sign-up")} variant="ghost">
          Sign Up
        </Button>
      </View>

      <View
        style={{
          marginTop: 16,
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: "auto",
        }}
      >
        <ThemedText>Forgot Password</ThemedText>
        <Button onPress={() => router.push("/reset-password")} variant="ghost">
          Reset Password
        </Button>
      </View>
    </BodyScrollView>
  );
}
