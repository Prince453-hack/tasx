import { useUser } from "@clerk/clerk-expo";
import * as UIReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore, NoValuesSchema } from "tinybase/with-schemas";
import { useCreateClientPersisterAndStart } from "./persistence/useCreateClientPersisterAndStart";
import { useCallback } from "react";
import { randomUUID } from "expo-crypto";
import TaskListStore from "./TaskListStore";
import { useCreateServerSynchronizerAndStart } from "./synchronization/useServerSynchronizationAndStart";

const TASK_ID_PREFIX = "taskListsStore-";

const TABLE_SCHEMA = {
  lists: {
    id: { type: "string" },
    initialContentJson: { type: "string" },
  },
} as const;

const {
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideStore,
  useRowIds,
  useStore,
  useTable,
} = UIReact as UIReact.WithSchemas<[typeof TABLE_SCHEMA, NoValuesSchema]>;

const useStoreId = () => TASK_ID_PREFIX + useUser().user.id;

export const useAddTaskListCallback = () => {
  const store = useStore(useStoreId());

  return useCallback(
    (name: string, description: string, emoji: string, color: string) => {
      const id = randomUUID();
      store.setRow("lists", id, {
        id,
        initialContentJson: JSON.stringify([
          {},
          {
            id,
            name,
            description,
            emoji,
            color,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]),
      });

      return id;
    },
    [store]
  );
};

export const useTaskListIds = () => useRowIds("lists", useStoreId());

export default function TaskListsStore() {
  const storeId = useStoreId();
  const store = useCreateMergeableStore(() =>
    createMergeableStore().setTablesSchema(TABLE_SCHEMA)
  );

  useCreateClientPersisterAndStart(storeId, store);
  useCreateServerSynchronizerAndStart(storeId, store);
  useProvideStore(storeId, store);

  const currentUserList = useTable("lists", storeId);

  return Object.entries(currentUserList).map(
    ([listId, { initialContentJson }]) => (
      <TaskListStore
        listId={listId}
        initialContentJson={initialContentJson}
        key={listId}
      />
    )
  );
}
