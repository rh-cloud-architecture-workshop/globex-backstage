# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app, run:

```sh
yarn install
yarn dev
```

## WIP - Currently local development
All variables in `app-config.*.yaml` are set via environment variables:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_PASSWORD=<redacted>
POSTGRES_PORT=5432
POSTGRES_USER=postgres
GITHUB_OAUTH_SECRET=<redacted>
GITHUB_OAUTH_ID=<redacted>

GITHUB_TOKEN=<redacted>
```

**Postgresql** is needed for persistence

**GitHub OAuth** is (currently) for Authentication, will switch to [OpenShift Authentication](https://janus-idp.io/blog/using-openshift-authentication-to-secure-access-to-backstage)
Backstage Identities and Groups will be hardcoded for the Lab purpose (user1..user50)

Identity resolver (mapping authenticated user to Backstage user in Catalog) is done via custom identity resolver

**GitHub Token** is (currently) used for GH integration (push code to repo)