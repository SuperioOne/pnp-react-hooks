import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments";
import "@pnp/sp/comments/clientside-page";
import { DEFAULT_STATE } from "../useQueryEffect";
import {
  AbortSignalSource,
  InjectAbortSignal,
} from "../../behaviors/internals";
import { InternalContext } from "../../context";
import { assert } from "../../utils/assert";
import { checkDisable } from "../checkDisable";
import { compareTuples } from "../../utils/compare";
import { deepCompareOptions } from "../deepCompare";
import { errorHandler } from "../errorHandler";
import { insertODataQuery } from "../insertODataQuery";
import { isUrl, UrlType } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveSP } from "../resolveSP";
import { useState, useContext, useRef, useEffect } from "react";

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
  /** @type{[
   *    import("@pnp/sp/comments").ICommentInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/comments").ICommentInfo[] | null |undefined>>
   *  ]}
   **/
  const [comments, setComments] = useState();
  /** @type{import("react").MutableRefObject<AbortSignalSource>} **/
  const abortSource = useRef(new AbortSignalSource());

  useEffect(() => abortSource.current.abort(), []);

  useEffect(() => {
    const opts = mergeOptions(globalOptions, options);
    opts.disabled = checkDisable(opts?.disabled, pageRelativePath);

    if (opts.disabled !== true) {
      const extDeps = mergeDependencies([pageRelativePath], deps);
      const shouldUpdate =
        !compareTuples(innerState.current.externalDeps, extDeps) ||
        !deepCompareOptions(innerState.current.options, opts);

      if (shouldUpdate) {
        abortSource.current.abort();
        abortSource.current.reset();

        if (opts?.keepPreviousState !== true) {
          setComments(undefined);
        }

        const request = async (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
          assert(
            isUrl(pageRelativePath, UrlType.Relative),
            "pageRelativePath value is not valid.",
          );

          const page = await sp.web.loadClientsidePage(pageRelativePath);
          insertODataQuery(page, opts.query);
          return page.getComments();
        };

        const sp = resolveSP(opts, [InjectAbortSignal(abortSource.current)]);
        let signalRef = abortSource.current.signal;

        request(sp)
          .then((comments) => {
            if (signalRef.aborted !== true) {
              setComments(comments);
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              setComments(null);
              errorHandler(err, opts);
            }
          });
      }

      innerState.current = {
        externalDeps: extDeps,
        options: opts,
      };
    }
  }, [globalOptions, options, pageRelativePath, deps]);

  return comments;
}
