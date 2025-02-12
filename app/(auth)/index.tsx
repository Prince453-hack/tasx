import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SignInScreen() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const onSignInPress = async () => {};

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
