import * as util from "node:util";
import msalConfig from "../../msalSettings";
import testConfig from "../../test.config";
import { DefaultHeaders } from "@pnp/sp/behaviors/defaults";
import { FetchWithAbort } from "../../src/behaviors";
import { FileCaching } from "./fileCaching";
import { MSAL } from "@pnp/nodejs/behaviors/msal";
import {
  RejectOnError,
  ResolveOnData,
  DefaultParse,
  Queryable,
} from "@pnp/queryable";
import { SPFI, spfi } from "@pnp/sp";
import { combine } from "@pnp/core/util";
import { isUrl, UrlType } from "../../src/utils/is";

/**
 * @typedef {Required<import("@pnp/nodejs/behaviors/spdefault").ISPDefaultProps> & {testEnv: import("../../test.config").TestConfig}} MsalTestDefaultProps
 */

/**
 * @param {MsalTestDefaultProps} props
 * @returns {import("@pnp/core").TimelinePipe<Queryable>}
 */
export function MsalTestDefault(props) {
  if (props.baseUrl && !isUrl(props.baseUrl, UrlType.Absolute)) {
    throw Error("props.baseUrl must be absolute Url.");
  }

  return (instance) => {
    instance.on.pre(async (url, init, result) => {
      init.cache = "no-cache";
      init.credentials = "same-origin";

      return [url, init, result];
    });

    instance.using(
      MSAL(props.msal.config, props.msal.scopes),
      DefaultHeaders(),
      RejectOnError(),
      ResolveOnData(),
      FileCaching({
        cacheDir: props.testEnv.cacheDir,
        mode: props.testEnv.cacheMode ?? "ifExists",
      }),
      FetchWithAbort({
        waitTime: props.testEnv.retryInterval,
        retry: props.testEnv.retries,
      }),
      DefaultParse(),
    );

    instance.on.pre.prepend(async (url, init, result) => {
      if (!isUrl(url, UrlType.Absolute)) {
        url = combine(props.baseUrl, url);
      }

      return [url, init, result];
    });

    return instance;
  };
}

/**
 * @returns {SPFI}
 */
export function InitPnpTest() {
  const sp = spfi().using(
    MsalTestDefault({
      baseUrl: msalConfig.sp.url,
      msal: {
        scopes: msalConfig.sp.msal.scopes,
        config: msalConfig.sp.msal.init,
      },
      testEnv: testConfig,
    }),
  );

  return sp;
}

const BG_COLOR = "\x1b[48;2;144;249;239m";
const FG_COLOR = "\x1b[38;2;144;249;239m";
const RED = "\x1b[31m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

/**
 * Prints Pnp response to stdout with unique color and formatting
 * @param {string} name - Test name
 * @param {...any} data - The arguments are all passed to `util.format()`.
 */
export function logResponse(name, ...data) {
  console.log(
    `${BOLD}${BG_COLOR}${RED} ${name} ${RESET}\n\n${FG_COLOR}${util.format(...data)}${RESET}`,
  );
}

/** @type{import("@testing-library/react").waitForOptions} **/
export const DEFAULT_WAITFOR_OPTS = { timeout: 10000 };

export class ErrorState {
  /** @type{any} **/
  #state = null;

  get error() {
    return this.#state;
  }

  setError = (/** @type{any} **/ err) => {
    this.#state = err;
  };
}
