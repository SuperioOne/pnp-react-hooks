export interface ExceptionOptions
{
    exception?: ExceptionOption
}

export type ExceptionOption = (err: Error) => void | ExceptionMode;

export enum ExceptionMode
{
    Default = 0,
    Suppress = 1
}