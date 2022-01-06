export interface ExceptionOptions
{
    exception?: ExceptionFunc | ExceptionMode;
}

export type ExceptionFunc = (err: Error) => void;

export enum ExceptionMode
{
    Default = 0,
    Suppress = 1
}