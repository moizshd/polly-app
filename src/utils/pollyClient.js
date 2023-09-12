// libs/pollyClient.js
const { PollyClient } = require("@aws-sdk/client-polly");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
console.log(process.env.REACT_APP_IDENTITY_POOL_ID
, process.env.REACT_APP_REGION)
const pollyClient = new PollyClient({
    region: process.env.REACT_APP_REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({
            region: process.env.REACT_APP_REGION }),
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
    }),
});

module.exports = { pollyClient };
