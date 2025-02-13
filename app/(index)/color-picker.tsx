import { ThemedText } from "@/components/ThemedText";
import { backgroundColors } from "@/constants/Colors";
import { useTaskCreation } from "@/context/TaskCreationContext";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

export default function ColorPickerScreen() {
  const router = useRouter();
  const { setSelectedColor } = useTaskCreation();
  const theme = useColorScheme();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    router.back();
  };

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? "white" : "#212121",
        paddingBottom: 130,
      }}
    >
      <View style={styles.draggable} />

      <ThemedText style={styles.text}>Choose a Color</ThemedText>
      <FlatList
        data={backgroundColors}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleColorSelect(item);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: item,
              }}
            />
          </Pressable>
        )}
        numColumns={5}
        keyExtractor={(item) => item}
        automaticallyAdjustContentInsets
        contentInsetAdjustmentBehavior="automatic"
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          paddingBottom: 100,
        }}
      />
    </View>
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
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "700",
  },
});
