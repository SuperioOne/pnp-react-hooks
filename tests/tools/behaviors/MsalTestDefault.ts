import { DefaultHeaders } from "@pnp/sp/behaviors/defaults";
import { FetchWithAbort } from "../../../src/behaviors";
import { FileCaching } from "./FileCaching";
import { ISPDefaultProps } from "@pnp/nodejs/behaviors/spdefault";
import { MSAL } from "@pnp/nodejs/behaviors/msal";
import {
  Queryable,
  RejectOnError,
  ResolveOnData,
  DefaultParse,
} from "@pnp/queryable";
import { TestConfig } from "../../test.config";
import { TimelinePipe, combine } from "@pnp/core";
import { isUrl, UrlType } from "../../../src/uti../../utils/is";

export interface MsalTestDefaultProps extends ISPDefaultProps {
  testEnv: TestConfig;
}

export function MsalTestDefault(
  props: MsalTestDefaultProps,
): TimelinePipe<Queryable> {
  if (props.baseUrl && !isUrl(props.baseUrl, UrlType.Absolute)) {
    throw Error("props.baseUrl must be absolute Url.");
  }

  return (instance: Queryable) => {
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
        cacheMode: props.testEnv.cacheMode ?? "ifExists",
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
