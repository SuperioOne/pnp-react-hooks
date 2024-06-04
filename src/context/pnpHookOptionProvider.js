import { SPBrowser } from "@pnp/sp/behaviors/spbrowser";
import { shallowEqual } from "../utils/shallowEqual";
import { spfi } from "@pnp/sp";
import { createContext, useRef, useMemo } from "react";

/**
 * @type {import("../types").PnpHookGlobalOptions}
 */
const DEFAULT_OPTIONS = {
  sp: spfi().using(SPBrowser()),
};

export const InternalContext = createContext(DEFAULT_OPTIONS);

/**
 * @param {{ value: import("../types").PnpHookGlobalOptions, children?: any;}} props
 * @returns { import("react").ReactElement | null}
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
