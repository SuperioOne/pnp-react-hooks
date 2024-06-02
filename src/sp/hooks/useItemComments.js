import "@pnp/sp/comments";
import "@pnp/sp/items";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { assertID } from "../../utils/assert";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns comment collection of specific list item.
 *
 * @param {number} itemId - Item Id. Changing the value resends request.
 * @param {string} list - List GUID Id or title. Changing the value resends request.
 * @param {import("./options").ItemCommentsOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useItemComments refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/comments").ICommentInfo[] | null | undefined}
 */
export function useItemComments(itemId, list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/comments").ICommentInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/comments").ICommentInfo[] | null |undefined>>]} **/
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
