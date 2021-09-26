import "@pnp/sp/features/site";
import "@pnp/sp/features/web";
import { useQueryEffect } from "./internal/useQueryEffect";
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

    const invokableFactory = useCallback(async (web: IWeb) =>
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
                    queryInst = web.features;
                    break;
                }
        }
        return createInvokable(queryInst);

    }, [options?.scope]);

    const _mergedDeps = deps
        ? [options?.scope].concat(deps)
        : [options?.scope];

    useQueryEffect(invokableFactory, setFeatures, options, _mergedDeps);

    return features;
}