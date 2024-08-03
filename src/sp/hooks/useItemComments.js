import "@pnp/sp/comments";
import "@pnp/sp/items";
import { InternalContext } from "../../context/internalContext.js";
import { assertID } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ItemCommentsOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ICommentInfo} from "@pnp/sp/comments" **/

/**
 * Returns comment collection of specific list item.
 *
 * @param {number} itemId - Item Id. Value is automatically tracked for changes.
 * @param {string} list - List GUID Id or title. Value is automatically tracked for changes.
 * @param {ItemCommentsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ICommentInfo[] | null | undefined}
 */
export function useItemComments(itemId, list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ICommentInfo[] | null | undefined, Dispatch<SetStateAction<ICommentInfo[] | null |undefined>> ]} **/
  const [comments, setComments] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      assertID(itemId, "itemId value is not valid.");
      return resolveList(sp.web, list).items.getById(itemId).comments;
    },
    [itemId, list],
  );

  const mergedDeps = mergeDependencies([itemId, list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, itemId, list);

    return opt;
  }, [itemId, list, options, globalOptions]);

  useQueryEffect(requestFactory, setComments, internalOpts, mergedDeps);

  return comments;
}
