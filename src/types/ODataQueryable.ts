export interface ODataQueryable
{
    expand?: Array<string>;
    select?: Array<string>;
}

export interface ODataQueryableCollection extends ODataQueryable
{
    top?: number;
    orderBy?: string;
    orderyByAscending?: boolean;
    skip?: number;
    filter?: string;
}

export interface PagedODataQueryable extends ODataQueryable
{
    top?: number;
    filter?: string;
}