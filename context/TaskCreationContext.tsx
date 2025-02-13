import { createContext, PropsWithChildren, useContext, useState } from "react";

type TaskCreationContextType = {
  selectedEmoji: string;
  selectedColor: string;
  setSelectedEmoji: (emoji: string) => void;
  setSelectedColor: (color: string) => void;
};

const TaskCreationContext = createContext<TaskCreationContextType | undefined>(
  undefined
);

export function TaskCreationProvider({ children }: PropsWithChildren) {
  const [selectedEmoji, setSelectedEmoji] = useState("📅");
  const [selectedColor, setSelectedColor] = useState("#9CCAFF");

  return (
    <TaskCreationContext.Provider
      value={{
        selectedColor,
        selectedEmoji,
        setSelectedColor,
        setSelectedEmoji,
      }}
    >
      {children}
    </TaskCreationContext.Provider>
  );
}

export const useTaskCreation = () => {
  const context = useContext(TaskCreationContext);

  if (context === undefined) {
    throw new Error(
      "useTaskCreation must be used within a TaskCreationProvider"
    );
  }

  return context;
};
