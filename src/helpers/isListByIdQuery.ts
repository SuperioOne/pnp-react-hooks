import { ListByIdQuery, ListByTitleQuery } from "../types/ListQuery";

export function isListByIdQuery(query: ListByIdQuery | ListByTitleQuery): query is ListByIdQuery
{
    return (query as ListByIdQuery).listId !== undefined;
}

