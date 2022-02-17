/* eslint-disable @typescript-eslint/no-explicit-any */

import { TimelinePipe } from "@pnp/core";

export interface BehaviourOptions
{
    /**
     * Additional behaviors for hooks PnP request.
     * @remarks You can define built-in or custom behaviors for single hook.
     * for more details see PnPjs original docs {@link https://pnp.github.io/pnpjs/core/behaviors/}
     */
    behaviors?: TimelinePipe<any>[];
}