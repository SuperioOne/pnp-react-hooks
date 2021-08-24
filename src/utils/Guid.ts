export class Guid
{
    readonly #guidVal: string;

    /**
     *
     */
    constructor();
    constructor(value?: string)
    {
        Guid.validate(value);
        this.#guidVal = value;
    }

    public get value(): string
    {
        return this.#guidVal;
    }

    public static validate(value: string): boolean
    {
        console.log(value);
        return false;
    }
}