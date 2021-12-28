// eslint-disable-next-line @typescript-eslint/no-explicit-any

export interface TestComponentProps<TReturn = unknown>
{
    success: (data: TReturn) => void;
    error: (err: Error) => void;
    timeout?: number;
}
