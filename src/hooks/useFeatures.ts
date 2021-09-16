import "@pnp/sp/features/site";
import "@pnp/sp/features/web";
import { useQueryEffect } from "./internal/useQuery";
import { FeatureScopes, Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { IFeatureInfo, IFeatures } from "@pnp/sp/features/types";
import { IWeb } from "@pnp/sp/webs/types";
import { createInvokable } from "../utils";
import { sp } from "@pnp/sp";
import { useState, useCallback } from "react";

export interface FeaturesOptions extends PnpHookOptions<ODataQueryableCollection>
{
    scope?: FeatureScopes;
}

export function useFeatures(
    options?: FeaturesOptions,
    deps?: React.DependencyList): Nullable<Array<IFeatureInfo>>
{
    const [features, setFeatures] = useState<Nullable<Array<IFeatureInfo>>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        let queryInstance: IFeatures;

        switch (options?.scope)
        {
            case "site": {

                queryInstance = sp.site.features;
                break;
            }
            case "web":
            default:
                {
                    queryInstance = web.features;
                    break;
                }
        }
        return createInvokable(queryInstance);

    }, [options?.scope]);

    const mergedDeps = deps
        ? [options?.scope].concat(deps)
        : [options?.scope];

    useQueryEffect(invokableFactory, setFeatures, options, mergedDeps);

    return features;
}