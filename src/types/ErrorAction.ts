export type ErrorAction = (err: Error) => void | ErrorMode;


export enum ErrorMode
{
    Default = 0,
    Suppress = 1
}