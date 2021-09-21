export interface ListScope
{
    list?: string;
}

export interface ItemScope extends ListScope
{
    list: string;
    item?: number;
}

export type ScopeInfo = ItemScope | ListScope;