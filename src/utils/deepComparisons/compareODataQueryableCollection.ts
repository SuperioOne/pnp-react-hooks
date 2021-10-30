import { ODataQueryableCollection } from "../../types";

export function compareODataQueryableCollection(left?: ODataQueryableCollection, right?: ODataQueryableCollection)
{
    return left === right ||
        (
            left?.top === right?.top
            && left?.orderBy === right?.orderBy
            && left?.orderyByAscending === right?.orderyByAscending
            && left?.skip === right?.skip
            && left?.filter === right?.filter
        );
}
