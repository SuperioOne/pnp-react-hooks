export class Guid
{
    private readonly guidVal: string;

    /**
     *
     */
    constructor();
    constructor(value?: string)
    {
        if (value)
        {
            Guid.validate(value);
            this.guidVal = value;
        }
    }

    public get value(): string
    {
        return this.guidVal;
    }

    public static validate(value: string): boolean
    {
        console.log(value);
        return false;
    }
}