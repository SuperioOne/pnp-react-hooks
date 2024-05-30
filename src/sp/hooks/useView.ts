import "@pnp/sp/views";
import { DisableOptionValueType } from "../../types";
import { IViewInfo } from "@pnp/sp/views/types";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { isUUID } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ViewOptions extends PnpHookOptions<ODataQueryable> {
  disabled?:
    | DisableOptionValueType
    | { (listId: string, viewId?: string): boolean };
}

/**
 * Returns a list view.
 * @param listId List GUID id or title. Changing the value resends request.
 * @param viewId View title or view GUID id.
 * @param options PnP hook options.
 * @param deps useView refreshes response data when one of the dependencies changes.
 */
export function useView(
  listId: string,
  viewId?: string,
  options?: ViewOptions,
  deps?: React.DependencyList,
): IViewInfo | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [view, setView] = useState<IViewInfo | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const spList = resolveList(sp.web, listId);

      switch (typeof viewId) {
        case "string": {
          return isUUID(viewId)
            ? createInvokable(spList.views.getById(viewId))
            : createInvokable(spList.views.getByTitle(viewId));
        }
        case "undefined":
          return createInvokable(spList.defaultView);
        default:
          throw new TypeError("viewId value type is not string or undefined.");
      }
    },
    [listId, viewId],
  );

  const _mergedDeps = mergeDependencies([listId, viewId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(
      opt?.disabled,
      defaultCheckDisable,
      listId,
      viewId,
    );

    return opt;
  }, [listId, viewId, globalOptions, options]);

  useQueryEffect(invokableFactory, setView, _options, _mergedDeps);

  return view;
}
