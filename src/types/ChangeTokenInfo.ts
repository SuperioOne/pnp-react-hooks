import { IListInfo } from "@pnp/sp/lists/types";

export class ChangeTokenInfo implements IChangeTokenInfo
{
    /**
     *
     */
    constructor(listInfo?: IListInfo)
    {
        if (typeof listInfo === "object")
        {
            this.CurrentChangeToken = listInfo.CurrentChangeToken.StringValue;
            this.Id = listInfo.Id;
            this.LastChanges = {
                LastItemDeletedDate: listInfo.LastItemDeletedDate,
                LastItemModifiedDate: listInfo.LastItemModifiedDate,
                LastItemUserModifiedDate: listInfo.LastItemUserModifiedDate,
            };
        }
    }

    Id: string;
    CurrentChangeToken: string;
    LastChanges: Timings;

}

export interface IChangeTokenInfo
{
    Id: string
    CurrentChangeToken: string;
    LastChanges: Timings;
}

interface Timings
{
    LastItemDeletedDate: string;
    LastItemModifiedDate: string;
    LastItemUserModifiedDate: string;
}