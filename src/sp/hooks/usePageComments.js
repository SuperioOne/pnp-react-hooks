import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments";
import "@pnp/sp/comments/clientside-page";
import { DEFAULT_STATE } from "../useQueryEffect.js";
import { AbortSignalSource } from "../../behaviors/abortSignalSource.js";
import { InjectAbortSignal } from "../../behaviors/injectAbortSignal.js";
import { InternalContext } from "../../context/internalContext.js";
import { assert } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { compareTuples } from "../../utils/compare.js";
import { deepCompareOptions } from "../deepCompare.js";
import { errorHandler } from "../errorHandler.js";
import { insertODataQuery } from "../insertODataQuery.js";
import { isUrl, UrlType } from "../../utils/is.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveSP } from "../resolveSP.js";
import { useState, useContext, useRef, useEffect } from "react";

/** @import {DependencyList, Dispatch, SetStateAction, MutableRefObject} from "react" **/
/** @import {PageCommentsOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ICommentInfo} from "@pnp/sp/comments" **/

/**
 * Returns comment collection from page.
 *
 * @param {string} pageRelativePath - Page server relative path. Value is automatically tracked for changes.
 * @param {PageCommentsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ICommentInfo[] | null | undefined }
 */
export function usePageComments(pageRelativePath, options, deps) {
  const globalOptions = useContext(InternalContext);
  const innerState = useRef(DEFAULT_STATE);
  /** @type{[ ICommentInfo[] | null | undefined, Dispatch<SetStateAction<ICommentInfo[] | null |undefined>> ]} **/
  const [comments, setComments] = useState();
  /** @type{MutableRefObject<AbortSignalSource>} **/
  const abortSource = useRef(new AbortSignalSource());

  useEffect(() => abortSource.current.abort(), []);

  useEffect(() => {
    const opts = mergeOptions(globalOptions, options);
    const disabled = checkDisable(opts?.disabled, pageRelativePath);

    if (disabled) {
      abortSource.current.abort();
    } else {
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

        const request = async (/**@type{SPFI} **/ sp) => {
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
