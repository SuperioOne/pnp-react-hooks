export class ParameterError extends Error
{
    public readonly parameterValue: unknown;
    public readonly parameterName: string;

    constructor(message: string | undefined, parameterName: string, value?: unknown)
    {
        super(message);
        this.parameterValue = value;
        this.parameterName = parameterName;
        this.name = "ParameterError"
    }
}