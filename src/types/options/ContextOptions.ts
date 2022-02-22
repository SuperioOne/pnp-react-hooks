import { SPFI } from "@pnp/sp";

export interface ContextOptions
{
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
    sp?: SPFI;
}