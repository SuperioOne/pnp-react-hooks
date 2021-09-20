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
}

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
    }