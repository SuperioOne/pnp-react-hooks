import "@pnp/sp/regional-settings";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useContext, useMemo } from "react";

/** @param {SPFI} sp **/
function regionalSettingsRequest(sp) {
  return sp.web.regionalSettings;
}

/**
 * Returns site regional settings.
 *
 * @param {import("./options").RegionalSettingOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useRegionalSetting refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/regional-settings").IRegionalSettingsInfo | null | undefined}
 */
export function useRegionalSetting(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/regional-settings").IRegionalSettingsInfo | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/regional-settings").IRegionalSettingsInfo | null |undefined>>]} **/
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
