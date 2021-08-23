export interface ODataQueryable
{
    expand?: Array<string>;
    select?: Array<string>;
}

export interface ODataQueryableCollection
{
    top?: number;
    orderBy?: string;
    orderyByAscending?: boolean;
    skip?: number;
}
