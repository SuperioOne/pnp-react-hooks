import "@pnp/sp/regional-settings";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @param {import('@pnp/sp').SPFI} sp **/
function regionalSettingsRequest(sp) {
  return sp.web.regionalSettings;
}

/**
 * Returns site regional settings.
 *
 * @param {import("./options.js").RegionalSettingOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useRegionalSetting refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/regional-settings").IRegionalSettingsInfo | null | undefined}
 */
export function useRegionalSetting(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/regional-settings").IRegionalSettingsInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/regional-settings").IRegionalSettingsInfo | null |undefined>>
   *  ]}
   **/
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
