import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SignUp() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [code, setCode] = useState<string>("");

  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);

  const onSignInPress = async () => {};

  const onVerifyPress = async () => {};

  if (pendingVerification) {
    <BodyScrollView contentContainerStyle={{ padding: 20 }}>
      <TextInput
        value={code}
        label={`Enter the verification we send to ${emailAddress}`}
        placeholder="Enter Verification Code"
        onChangeText={(code) => setCode(code)}
      />
      <Button
        loading={isLoading}
        disabled={!code || isLoading}
        onPress={onVerifyPress}
      >
        Verify
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}
    </BodyScrollView>;
  }

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
        loading={isLoading}
        disabled={!emailAddress || !password || isLoading}
      >
        Continue
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}
    </BodyScrollView>
  );
}
