import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import { router, Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { signOut } = useClerk();

  const useSignOut = () => {
    signOut();
    router.replace("/(auth)");
  };

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/(index)/list/new")}>
        <IconSymbol name="plus" color={appleBlue} size={30} />
      </Pressable>
    );
  };

  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => router.push("/(index)/profile")}>
        <IconSymbol name="gear" color={appleBlue} size={25} />
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <BodyScrollView contentContainerStyle={{ padding: 20 }}>
        <ThemedText type="title">Home</ThemedText>
        <Button onPress={useSignOut}>Sign Out</Button>
      </BodyScrollView>
    </>
  );
}
