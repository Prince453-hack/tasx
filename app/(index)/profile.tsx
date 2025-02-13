import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function ProfileScreen() {
  const theme = useColorScheme();

  return (
    <BodyScrollView
      contentContainerStyle={{
        backgroundColor: theme === "light" ? "white" : "#212121",
        height: "100%",
      }}
    >
      <View style={styles.draggable}></View>
      <ThemedText>Profile List</ThemedText>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  draggable: {
    height: 6,
    width: 40,
    backgroundColor: "gray",
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
  },
});
