import { SPFI } from "@pnp/sp";

export interface ContextOptions
{
    /**
     * Alternative web url.
     * @remarks
     * This option can be used for querying for sub sites.
     */
    web?: string;

    /**
     * Pnp SP context. 
     * 
     * @example 
     * Example usage for SPFX webparts
     * ```
     * import { spfi, SPFx } from "@pnp/sp";
     * 
     * spfi("your tenant url").using(SPFx(this.context))
     * ```
     * @remarks
     * for more details see {@link https://pnp.github.io/pnpjs/sp/behaviors/}
     */
    sp: SPFI;
}