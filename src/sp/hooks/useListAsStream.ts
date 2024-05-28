import {
  ContextOptions,
  ErrorOptions,
  RenderOptions,
  BehaviourOptions,
} from "../../types/options";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import {
  IList,
  IRenderListDataAsStreamResult,
  IRenderListDataParameters,
} from "@pnp/sp/lists/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { RenderListDataOverrideParameters } from "../../types/RenderListDataOverrideParameters";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { convertToMap } from "../../utils/convertToMap";
import { createInvokable } from "../../utils/createInvokable";
import { isNull } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveList } from "../../utils/resolveList";
import { shallowEqual } from "../../utils/compare";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo, useRef } from "react";

export interface ListAsStreamOptions
  extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  disabled?:
    | DisableOptionValueType
    | { (list: string, parameters: RenderListParameters): boolean };
}

export interface RenderListParameters {
  dataParameters: IRenderListDataParameters;
  dataOverrideParameters?: RenderListDataOverrideParameters;

  /** Pass override parameters as query string. */
  useQueryParameters?: boolean;
}

/**
 * Returns data for the specified query view
 * @param list List GUID Id or title. Changing the value resends request.
 * @param parameters Sharepoint RenderAsStream parameters.
 * @param options PnP hook options.
 * @param deps useListAsStream refreshes response data when one of the dependencies changes.
 */
export function useListAsStream(
  list: string,
  parameters: RenderListParameters,
  options?: ListAsStreamOptions,
  deps?: React.DependencyList,
): Nullable<IRenderListDataAsStreamResult> {
  const globalOptions = useContext(InternalContext);
  const [listData, setListData] =
    useState<Nullable<IRenderListDataAsStreamResult>>();
  const _parameters = useRef<RenderListParameters>(parameters);
  let _params;

  if (_deepCompareParameters(_parameters.current, parameters)) {
    _params = _parameters.current;
  } else {
    _params = parameters;
    _parameters.current = parameters;
  }

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const spList = resolveList(sp.web, list);

      let overrideParams;
      let queryParams;

      if (_params.dataOverrideParameters) {
        if (_params.useQueryParameters) {
          overrideParams = null;
          queryParams = convertToMap(_params.dataOverrideParameters);
        } else {
          overrideParams = _params.dataOverrideParameters;
        }
      }

      const action = function (this: IList) {
        return this.renderListDataAsStream(
          _params.dataParameters,
          overrideParams,
          queryParams,
        );
      };

      return createInvokable(spList, action);
    },
    [list, _params],
  );

  const _mergedDeps = mergeDependencies([list, _params], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions<undefined>(globalOptions, options);
    opt.disabled = checkDisable(
      opt?.disabled,
      defaultCheckDisable,
      list,
      _params,
    );

    return opt;
  }, [list, _params, globalOptions, options]);

  useQueryEffect(invokableFactory, setListData, _options, _mergedDeps);

  return listData;
}

function _deepCompareParameters(
  right: RenderListParameters,
  left: RenderListParameters,
) {
  if (right === left) {
    return true;
  } else if (isNull(right) || isNull(left)) {
    return false;
  } else {
    return (
      shallowEqual(right.dataParameters, left.dataParameters) &&
      shallowEqual(right.useQueryParameters, left.useQueryParameters) &&
      shallowEqual(right.dataOverrideParameters, left.dataOverrideParameters)
    );
  }
}
