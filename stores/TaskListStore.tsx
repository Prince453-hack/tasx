import * as UIReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore } from "tinybase/with-schemas";
import { useCreateClientPersisterAndStart } from "./persistence/useCreateClientPersisterAndStart";
import { useCreateServerSynchronizerAndStart } from "./synchronization/useServerSynchronizationAndStart";
import { useUserIdAndNickname } from "@/hooks/useNickname";

const TASK_ID_PREFIX = "taskListStore-";

const VALUES_SCHEMA = {
  listId: { type: "string" },
  name: { type: "string" },
  description: { type: "string" },
  emoji: { type: "string" },
  color: { type: "string" },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
} as const;

const TABLES_SCHEMA = {
  objectives: {
    id: { type: "string" },
    name: { type: "string" },
    quantity: { type: "number" },
    units: { type: "string" },
    isDone: { type: "boolean", default: false },
    category: { type: "string", default: "" },
    notes: { type: "string" },
    createdBy: { type: "string" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
  collaborators: {
    nickname: { type: "string" },
  },
} as const;

type Schemas = [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA];
type TaskListValueId = keyof typeof VALUES_SCHEMA;
type TaskListCellId = keyof (typeof TABLES_SCHEMA)["objectives"];

const {
  useCell,
  useCreateMergeableStore,
  useProvideStore,
  useRowCount,
  useSetCellCallback,
  useSortedRowIds,
  useDelRowCallback,
  useSetValueCallback,
  useStore,
  useTable,
  useValue,
} = UIReact as UIReact.WithSchemas<Schemas>;

const useStoreId = (listId: string) => TASK_ID_PREFIX + listId;

export default function TaskListStore({
  listId,
  initialContentJson,
}: {
  listId: string;
  initialContentJson: string;
}) {
  const storeId = useStoreId(listId);
  const store = useCreateMergeableStore(() =>
    createMergeableStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA)
  );

  const [userId, nickname] = useUserIdAndNickname();

  useCreateClientPersisterAndStart(storeId, store, initialContentJson, () =>
    store.setRow("collaborators", userId, { nickname })
  );

  useCreateServerSynchronizerAndStart(storeId, store);
  useProvideStore(storeId, store);

  return null;
}
