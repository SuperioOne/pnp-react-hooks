import { RollupOptions } from "rollup";

export interface StageOption
{
    rollupConfig: RollupOptions;
    stageName: string;
}

export interface BuildOption
{
    [key: string]: StageOption[];
}