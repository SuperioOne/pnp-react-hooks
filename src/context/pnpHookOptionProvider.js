import { createElement, useMemo, useRef } from "react";
import { shallowEqual } from "../utils/shallowEqual.js";
import { InternalContext } from "./internalContext.js";

/**
 * @param {{ value: import("../types.js").PnpHookGlobalOptions, children?: any;}} props
 * @returns {React.JSX.Element}
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

  return createElement(InternalContext.Provider, {
    value,
    children: props.children,
  });
}
