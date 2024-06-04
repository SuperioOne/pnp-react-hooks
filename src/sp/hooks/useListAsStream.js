import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Convert record to map object.
 * @template T
 * @param {Record<string, T>} obj
 * @returns {Map<string, T>}
 */
function convertToMap(obj) {
  const fields = Object.keys(obj);
  const map = new Map();

  /** @type{string} **/
  let key;
  /** @type{T} **/
  let value;

  for (let index = 0; index < fields.length; index++) {
    key = fields[index];
    value = Reflect.get(obj, key);

    map.set(key, value);
  }

  return map;
}

/**
 * Returns data for the specified query view
 *
 * @param {string} list - List GUID Id or title. Changing the value resends request.
 * @param {import("./options").RenderListParameters} parameters - Sharepoint RenderAsStream parameters.
 * @param {import("./options").ListAsStreamOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useListAsStream refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/lists").IRenderListDataAsStreamResult | null | undefined}
 */
export function useListAsStream(list, parameters, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/lists").IRenderListDataAsStreamResult | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/lists").IRenderListDataAsStreamResult | null |undefined>>
   *  ]}
   **/
  const [listData, setListData] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      const spList = resolveList(sp.web, list);

      let overrideParams;
      let queryParams;

      if (parameters.dataOverrideParameters) {
        if (parameters.useQueryParameters) {
          overrideParams = null;
          queryParams = convertToMap(parameters.dataOverrideParameters);
        } else {
          overrideParams = parameters.dataOverrideParameters;
        }
      }

      /** @type{(this:import("@pnp/sp/lists").IList) => Promise<import("@pnp/sp/lists").IRenderListDataAsStreamResult>} **/
      const action = function () {
        return this.renderListDataAsStream(
          parameters.dataParameters,
          overrideParams,
          queryParams,
        );
      };

      return overrideAction(spList, action);
    },
    [list, parameters],
  );

  const mergedDeps = mergeDependencies([list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, list, parameters);

    return opt;
  }, [list, parameters, globalOptions, options]);

  useQueryEffect(requestFactory, setListData, internalOpts, mergedDeps);

  return listData;
}
