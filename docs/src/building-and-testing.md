# Building & Testing

## Building

```bash
pnpm install
pnpm run build

# or use npm

npm install
npm run build
```

## Testing

Test system requires a SharePoint site and [app registration on Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate) 
with SharePoint permissions.

After the app registration, create a file named `msalSettings.js`. You can use `msalSettings.example.js` as a template or copy the following code snippet.

```javascript
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----`;

const msalInit = {
    auth: {
        authority: "https://login.microsoftonline.com/${TENANT_ID}",
        clientId: "${CLIENT_ID}",
        clientCertificate: {
            thumbprint: "${THUMBPRINT}",
            privateKey: privateKey,
        },
    }
};

export default
    {
        sp: {
            url: "${SITE_URL}",
            msal: {
                init: msalInit,
                scopes: ["${SITE_URL}/.default"]
            },
        },
        graph: {
            msal: {
                init: msalInit,
                scopes: ["https://graph.microsoft.com/.default"]
            },
        }
    };
```

Replace the following parts in settings file with your own info from app registration:

- `privateKey`, replace it with your own certificate private key.
- `${TENANT_ID}`, Your SharePoint tenant UUID.
- `${CLIENT_ID}`, App client UUID.
- `${SITE_URL}`, SharePoint test site URL.
- `${THUMBPRINT}`, Certificate thumbprint.

Most tests use existing info on the site or create simple test cases on-the-fly. Only exceptions are `useListItems` tests,
which require a list called `Test List` with sizeable (+5000) pre-populated items.

Run `npm run test` to start `vitest` when testing environment is ready.

> After the first test run, all HTTP responses are cached to `node_modules/.prh_cache` directory, and tests are replayed
from the cached responses whenever there is a match.
