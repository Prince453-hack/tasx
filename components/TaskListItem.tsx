import { View, Text } from "react-native";
import React from "react";
import { useTaskListValue } from "@/stores/TaskListStore";
import { ThemedText } from "./ThemedText";

const TaskListItem = ({ listId }: { listId: string }) => {
  const [name] = useTaskListValue(listId, "name");

  return (
    <>
      <ThemedText>{name}</ThemedText>
    </>
  );
};

export default TaskListItem;
