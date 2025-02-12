import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function HomeScreen() {
  const { signOut } = useClerk();

  const useSignOut = () => {
    signOut();
    router.replace("/(auth)");
  };

  return (
    <BodyScrollView contentContainerStyle={{ padding: 20 }}>
      <ThemedText type="title">Home</ThemedText>
      <Button onPress={useSignOut}>Sign Out</Button>
    </BodyScrollView>
  );
}
