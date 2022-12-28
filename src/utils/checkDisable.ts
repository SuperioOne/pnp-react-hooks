/* eslint-disable @typescript-eslint/no-explicit-any */

import { DisableOptionFuncType, DisableOptionType } from "../types/options/RenderOptions";

export function checkDisable(disabled?: DisableOptionType, defaultAction?: DisableOptionFuncType, ...args: any[]): boolean
{
    if (disabled !== undefined)
    {
        if (typeof disabled === "boolean")
        {
            return disabled;
        }
        else if (disabled === "auto")
        {
            return defaultAction?.(...args) ?? false;
        }
        else
        {
            return disabled(...args);
        }
    }
    else
    {
        return false;
    }
}

export function defaultCheckDisable(...args: any[]): boolean
{
    for (let index = 0; index < args.length; index++)
    {
        const element = args[index];
        const type = typeof element;

        const canDisable = element === undefined
            || (type === "string" && element.length < 1)
            || (type === "number" && element < 1)
            || element === null;

        if (canDisable)
            return true;
    }

    return false;
}