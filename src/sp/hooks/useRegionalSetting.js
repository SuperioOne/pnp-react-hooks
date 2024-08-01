import "@pnp/sp/regional-settings";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {RegionalSettingOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IRegionalSettingsInfo} from "@pnp/sp/regional-settings" **/

/** @param {SPFI} sp **/
function regionalSettingsRequest(sp) {
  return sp.web.regionalSettings;
}

/**
 * Returns site regional settings.
 *
 * @param {RegionalSettingOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IRegionalSettingsInfo | null | undefined}
 */
export function useRegionalSetting(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IRegionalSettingsInfo | null | undefined, Dispatch<SetStateAction<IRegionalSettingsInfo | null |undefined>> ]} **/
  const [regionalSetting, setRegionalSetting] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(
    regionalSettingsRequest,
    setRegionalSetting,
    internalOpts,
    deps,
  );

  return regionalSetting;
}
