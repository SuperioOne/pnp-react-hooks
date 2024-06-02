import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments";
import "@pnp/sp/comments/clientside-page";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { assert } from "../../utils/assert";
import { checkDisable } from "../checkDisable";
import { isUrl, UrlType } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { DEFAULT_STATE } from "../useQueryEffect";
import { useState, useCallback, useContext, useRef, useEffect } from "react";
import { compareTuples } from "../../utils/compare";
import { deepCompareOptions } from "../deepCompare";
import { resolveSP } from "../resolveSP";
import { InjectAbortSignal } from "../../behaviors/internals";
import { insertODataQuery } from "../insertODataQuery";
import { errorHandler } from "../errorHandler";

/**
 * Returns comment collection from page.
 *
 * @param {string} pageRelativePath - Page server relative path. Changing the value resends request.
 * @param {import("./options").PageCommentsOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - usePageComments refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/comments").ICommentInfo[] | null | undefined }
 */
export function usePageComments(pageRelativePath, options, deps) {
  const globalOptions = useContext(InternalContext);
  const innerState = useRef(DEFAULT_STATE);
  /** @type{[import("@pnp/sp/comments").ICommentInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/comments").ICommentInfo[] | null |undefined>>]} **/
  const [comments, setComments] = useState();
  /** @type{import("react").MutableRefObject<AbortController | undefined>} **/
  const abortController = useRef(undefined);

  const cleanup = useCallback(() => {
    abortController.current?.abort();
    abortController.current = undefined;
  }, []);

  // make sure callbacks cancelled when DOM unloads
  useEffect(() => cleanup, [cleanup]);

  useEffect(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, pageRelativePath);

    if (opt.disabled !== true) {
      const internalDeps = mergeDependencies([pageRelativePath], deps);
      const shouldUpdate =
        !compareTuples(innerState.current.externalDeps, internalDeps) ||
        !deepCompareOptions(innerState.current.options, opt);

      if (shouldUpdate) {
        cleanup();
        abortController.current = new AbortController();

        if (opt?.keepPreviousState !== true) {
          setComments(undefined);
        }

        const request = async (/**@type{SPFI} **/ sp) => {
          assert(
            isUrl(pageRelativePath, UrlType.Relative),
            "pageRelativePath value is not valid.",
          );

          const page = await sp.web.loadClientsidePage(pageRelativePath);
          insertODataQuery(page, opt.query);
          return page.getComments();
        };

        const sp = resolveSP(opt, [InjectAbortSignal(abortController.current)]);
        request(sp)
          .then(setComments)
          .catch((err) => {
            if (err.name !== "AbortError") {
              setComments(null);
              errorHandler(err, opt);
            }
          });
      }

      innerState.current = {
        externalDeps: internalDeps,
        options: opt,
      };
    }
  });

  return comments;
}
