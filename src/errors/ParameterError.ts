export class ParameterError extends Error
{
    public readonly values: unknown[];

    constructor(message: string | undefined, ...values: unknown[])
    {
        super(message);
        this.values = values;
        this.name = "ParameterError"
    }
}