import { MergeableStore, OptionalSchemas } from "tinybase/with-schemas";
import * as UIReact from "tinybase/ui-react/with-schemas";
import { createClientPersister } from "./createClientPersister";

export const useCreateClientPersisterAndStart = <
  Schemas extends OptionalSchemas
>(
  storeId: string,
  store: MergeableStore<Schemas>,
  initialContentJSON?: string,
  then?: () => void
) =>
  (UIReact as UIReact.WithSchemas<Schemas>).useCreatePersister(
    store,
    (store: MergeableStore<Schemas>) => createClientPersister(storeId, store),
    [storeId],
    async (persister) => {
      let initialContent = undefined;

      try {
        initialContent = JSON.parse(initialContentJSON);
      } catch (error) {
        console.log(error);
      }

      await persister.load(initialContent);
      await persister.startAutoSave();
      then?.();
    },
    [initialContentJSON]
  );
