export class Guid
{
    readonly #guidVal: string;

    /**
     *
     */
    constructor();
    constructor(value?: string)
    {
        this.#guidVal = value;
        this.validate();
    }


    public validate(): boolean
    {
        return false;
    }
}