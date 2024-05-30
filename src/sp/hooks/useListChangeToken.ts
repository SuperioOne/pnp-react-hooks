import {
  ErrorOptions,
  ContextOptions,
  BehaviourOptions,
  DisableOptionValueType,
} from "../../types";
import { IList } from "@pnp/sp/lists/types";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { shallowEqual } from "../../utils/compare";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { IListInfo } from "@pnp/sp/lists/types";

export interface ListTokenOptions
  extends ErrorOptions,
    ContextOptions,
    BehaviourOptions {
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export class ChangeTokenInfo implements IChangeTokenInfo {
  constructor(listInfo?: IListInfo) {
    if (typeof listInfo === "object") {
      this.CurrentChangeToken = listInfo.CurrentChangeToken.StringValue;
      this.Id = listInfo.Id;
      this.LastChanges = {
        LastItemDeletedDate: listInfo.LastItemDeletedDate,
        LastItemModifiedDate: listInfo.LastItemModifiedDate,
        LastItemUserModifiedDate: listInfo.LastItemUserModifiedDate,
      };
    }
  }

  Id: string;
  CurrentChangeToken: string;
  LastChanges: Timings;
}

export interface IChangeTokenInfo {
  Id: string;
  CurrentChangeToken: string;
  LastChanges: Timings;
}

interface Timings {
  LastItemDeletedDate: string;
  LastItemModifiedDate: string;
  LastItemUserModifiedDate: string;
}

/**
 * Returns list current change token and last modified dates.
 * @param list List GUID id or title. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useListChangeToken refreshes response data when one of the dependencies changes.
 */
export function useListChangeToken(
  list: string,
  options?: ListTokenOptions,
  deps?: React.DependencyList,
): IChangeTokenInfo | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [token, setToken] = useState<IChangeTokenInfo | null | undefined>();

  const _setTokenProxy = useCallback(
    (newToken: IChangeTokenInfo | null | undefined) => {
      if (!shallowEqual(newToken, token)) {
        setToken(newToken);
      }
    },
    [token],
  );

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const spList = resolveList(sp.web, list).select(
        "CurrentChangeToken",
        "ID",
        "LastItemDeletedDate",
        "LastItemModifiedDate",
        "LastItemUserModifiedDate",
      );

      const action = async function (this: IList): Promise<IChangeTokenInfo> {
        const listInfo = await this();
        return new ChangeTokenInfo(listInfo);
      };

      return createInvokable(spList, action);
    },
    [list],
  );

  const _mergedDeps = mergeDependencies([list], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions<undefined>(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, list);

    return opt;
  }, [list, options, globalOptions]);

  useQueryEffect(invokableFactory, _setTokenProxy, _options, _mergedDeps);

  return token;
}
