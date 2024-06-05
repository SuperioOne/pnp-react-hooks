import * as React from "react";
import { shallowEqual } from "../utils/shallowEqual.js";
import { InternalContext } from "./internalContext.js";

/**
 * @param {{ value: import("../types.js").PnpHookGlobalOptions, children?: any;}} props
 * @returns {React.JSX.Element}
 */
export function PnpHookOptionProvider(props) {
  const previousValue = React.useRef(props.value);
  const value = React.useMemo(() => {
    if (shallowEqual(props.value, previousValue.current)) {
      return previousValue.current;
    } else {
      previousValue.current = props.value;
      return props.value;
    }
  }, [props.value]);

  return (
    <InternalContext.Provider value={value}>
      {...props.children}
    </InternalContext.Provider>
  )
}
