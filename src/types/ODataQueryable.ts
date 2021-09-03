export interface ODataQueryable extends Record<string, unknown>
{
    expand?: Array<string>;
    select?: Array<string>;
}

export interface ODataQueryableCollection extends Record<string, unknown>
{
    top?: number;
    orderBy?: string;
    orderyByAscending?: boolean;
    skip?: number;
    filter?: string;
}
