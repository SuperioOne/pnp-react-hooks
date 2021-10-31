import "@pnp/sp/features/site";
import "@pnp/sp/features/web";
import { FeatureScopes } from "../types/literalTypes";
import { IFeatureInfo, IFeatures } from "@pnp/sp/features/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { sp } from "@pnp/sp";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export interface FeaturesOptions extends PnpHookOptions<ODataQueryableCollection>
{
    scope?: FeatureScopes;
}

export function useFeatures(
    options?: FeaturesOptions,
    deps?: React.DependencyList): Nullable<IFeatureInfo[]>
{
    const [features, setFeatures] = useState<Nullable<IFeatureInfo[]>>();

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

    const _mergedDeps = mergeDependencies([options?.scope], deps);

    useQueryEffect(invokableFactory, setFeatures, options, _mergedDeps);

    return features;
}