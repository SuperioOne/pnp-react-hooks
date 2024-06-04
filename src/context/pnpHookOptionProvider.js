import { SPBrowser } from "@pnp/sp/behaviors/spbrowser.js";
import { shallowEqual } from "../utils/shallowEqual.js";
import { spfi } from "@pnp/sp";
import { createContext, useRef, useMemo } from "react";

/**
 * @type {import("../types.js").PnpHookGlobalOptions}
 */
const DEFAULT_OPTIONS = {
  sp: spfi().using(SPBrowser()),
};

export const InternalContext = createContext(DEFAULT_OPTIONS);

/**
 * @param {{ value: import("../types.js").PnpHookGlobalOptions, children?: any;}} props
 * @returns { import("react").ReactNode | null}
 */
export function PnpHookOptionProvider(props) {
  const previousValue = useRef(props.value);
  const value = useMemo(() => {
    if (shallowEqual(props.value, previousValue.current)) {
      return previousValue.current;
    } else {
      previousValue.current = props.value;
      return props.value;
    }
  }, [props.value]);

  return InternalContext.Provider({ value, children: props.children });
}
