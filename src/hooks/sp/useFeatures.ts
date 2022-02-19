import "@pnp/sp/features/site";
import "@pnp/sp/features/web";
import { FeatureScopes } from "../../types/literalTypes";
import { IFeatureInfo, IFeatures } from "@pnp/sp/features/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FeaturesOptions extends PnpHookOptions<ODataQueryableCollection>
{
    /**
     * Feature scope. Available options are 'site' and 'web'.
     * Changing scope type resends request.
     * @default "web"
     */
    scope?: FeatureScopes;
}

/**
 * Returns site or web feature collection. Scope type can be defined in {@link FeaturesOptions.scope} property.
 * @param options PnP hook options
 * @param deps useFeatures will resend request when one of the dependencies changed.
 */
export function useFeatures(
    options?: FeaturesOptions,
    deps?: React.DependencyList): Nullable<IFeatureInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [features, setFeatures] = useState<Nullable<IFeatureInfo[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        let queryInst: IFeatures;

        switch (options?.scope)
        {
            case "site": {

                queryInst = sp.site.features;
                break;
            }
            case "web":
            default:
                {
                    queryInst = sp.web.features;
                    break;
                }
        }
        return createInvokable(queryInst);
    }, [options?.scope]);

    const _mergedDeps = mergeDependencies([options?.scope], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setFeatures, _options, _mergedDeps);

    return features;
}