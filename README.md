# Cognito Github OpenID

GitHub OAuth openid shim for AWS Cognito

## Getting Started

### Generate certificate

```
./scripts/certificate.sh
```

### Deploy the API

```
sls deploy
```

### Create Cognito user pool

- Create user pool
- Go to `Federation > Identity providers`
- Choose `OpenID Connect`
- Fill the form
  - Provider name: `cognito-github-openid` (or any other)
  - Client id: copy from github oauth application
  - Client secert: copy from github oauth application
  - Authorize scope: `openid read:user [...any other github scopes]`
  - Issuer: `<API Gateway URL>`
  - Click `Show oidc endpoints`
  - Authorization endpoint: `<API GW URL>/:stage/authorize`
  - Token endpoint: `<API GW URL>/:stage/token`
  - Userinfo endpoint: `<API GW URL>/:stage/userinfo`
  - Jwks uri: `<API GW URL>/:stage/jwks`

## Contributors

- [Andrei Lesnitsky](https://github.com/lesnitsky)

## LICENSE

MIT
