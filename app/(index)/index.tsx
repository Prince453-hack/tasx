import IconCircle from "@/components/IconCircle";
import TaskListItem from "@/components/TaskListItem";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue, backgroundColors } from "@/constants/Colors";
import { useTaskListIds } from "@/stores/TaskListsStore";
import { Link, Stack, useRouter } from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const taskListIds = useTaskListIds();

  const renderEmptyList = () => {
    return (
      <BodyScrollView
        style={styles.emptyStateContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <IconCircle
          emoji="📪"
          backgroundColor={
            backgroundColors[
              Math.floor(Math.random() * backgroundColors.length)
            ]
          }
        />
        <Button onPress={() => router.push("/list/new")} variant="ghost">
          Create your first task
        </Button>
      </BodyScrollView>
    );
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
      <FlatList
        data={taskListIds}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
        contentInsetAdjustmentBehavior="automatic"
        // renderItem={({ item: taskId }) => (
        //   <Link
        //     href={{ pathname: "/(index)/list/[taskId]", params: { taskId } }}
        //   >
        //     <TaskListItem listId={taskId} />
        //   </Link>
        // )}
        renderItem={({ item: taskId }) => <TaskListItem listId={taskId} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  emptyStateContainer: {
    gap: 8,
    paddingTop: 100,
  },
  headerButton: {
    padding: 8,
    paddingRight: 0,
    marginHorizontal: Platform.select({ web: 16, default: 0 }),
  },
  headerButtonLeft: {
    paddingLeft: 0,
  },
});
