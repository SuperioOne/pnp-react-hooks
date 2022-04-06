export enum ListOptions
{
    /**
     * Fetch list items in single request. Request might fail due to threshold limit, if data is not indexed and filtered properly.
     * see https://docs.microsoft.com/en-us/microsoft-365/community/large-lists-large-libraries-in-sharepoint
     */
    Default = 0,

    /** Fetches list items in multiple calls and merges the results on the client side. */
    All = 1,

    /** Fetch list items with paging support. */
    Paged = 2,
}