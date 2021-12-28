
export class TimeoutError extends Error
{
    constructor(message: string)
    {
        super();
        this.message = message;
        this.name = "TimeoutError";
    }
}
