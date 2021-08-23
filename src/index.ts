import { Guid } from "./utils/Guid";
import { useListItem as t } from "./hooks/useListItem";

export const useListItem = t;

useListItem(123, { list: new Guid(), web: "123", });