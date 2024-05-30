import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments";
import "@pnp/sp/comments/clientside-page";
import { DisableOptionValueType } from "../../types";
import { IClientsidePage } from "@pnp/sp/clientside-pages/types";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { assert } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { isUrl, UrlType } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface PageCommentsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (pageRelativePath: string): boolean };
}

/**
 * Returns comment collection from page.
 * @param pageRelativePath Page server relative path. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps usePageComments refreshes response data when one of the dependencies changes.
 */
export function usePageComments(
  pageRelativePath: string,
  options?: PageCommentsOptions,
  deps?: React.DependencyList,
): ICommentInfo[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [comments, setComments] = useState<ICommentInfo[] | undefined | null>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      assert(
        isUrl(pageRelativePath, UrlType.Relative),
        "pageRelativePath value is not valid.",
      );

      const page = await sp.web.loadClientsidePage(pageRelativePath);

      const action = function (this: IClientsidePage) {
        return this.getComments();
      };

      return createInvokable(page, action);
    },
    [pageRelativePath],
  );

  const _mergedDeps = mergeDependencies([pageRelativePath], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(
      opt?.disabled,
      defaultCheckDisable,
      pageRelativePath,
    );

    return opt;
  }, [pageRelativePath, options, globalOptions]);

  useQueryEffect(invokableFactory, setComments, _options, _mergedDeps);

  return comments;
}
