import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setErrors([]);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        console.error(signUpAttempt);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
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
      </BodyScrollView>
    );
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
        onPress={onSignUpPress}
        loading={isLoading}
        disabled={!emailAddress || !password || isLoading}
      >
        Sign Up
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "black" }}>
          {error.message}
        </ThemedText>
      ))}
    </BodyScrollView>
  );
}
