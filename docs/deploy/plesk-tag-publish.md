# EBarCode deployment from the `publish` tag

| Item | Value |
|---|---|
| GitHub repository | `akaravi/NTK.EBarCode` |
| Release trigger | exact tag `publish` |
| Plesk branch | `plesk/ebarcode` |
| Plesk domain | `ebarcode.ir` |
| Runtime | Windows x64, framework-dependent .NET 10 |
| Deployment path | read back from the Plesk directory selector; never guessed |

The release workflow builds the Angular SPA, copies it into the ASP.NET Core
publish output under `wwwroot`, and publishes one same-origin application. The
API remains available under `/api`; Angular routes are handled by the fallback
to `index.html`.

## Server-owned files

The release payload excludes and never overwrites:

- `appsettings*.json`
- case-insensitive `nlog*.config`
- `web.config`
- `.env*`

Plesk owns these files and their production values.

## One-time Plesk setup

1. Open `ebarcode.ir > Git` in Plesk.
2. Add the GitHub repository using the Plesk deploy key.
3. If outbound port 22 is blocked, use:
   `ssh://git@ssh.github.com:443/akaravi/NTK.EBarCode.git`.
4. Select branch `plesk/ebarcode`.
5. Enable Automatic deployment.
6. Select the real deployment directory using Plesk's directory selector.
7. Read back the branch, automatic mode, deployment path, and latest commit.
8. Use the Plesk-generated webhook URL to create a GitHub `push` webhook.
   Keep the URL, UUID, secret, and credentials redacted.

## Release

```bash
git add .
git commit -m "Describe the change"
git push origin main
git tag -f publish HEAD
git push origin +refs/tags/publish
```

Only the exact tag `publish` triggers the release workflow.

## Verification

```bash
gh run list --repo akaravi/NTK.EBarCode --workflow publish-plesk.yml --limit 5
gh api repos/akaravi/NTK.EBarCode/branches/plesk/ebarcode --jq '.commit.sha'
gh api repos/akaravi/NTK.EBarCode/hooks --jq '.[] | {id,active,events}'
```

Then verify the Plesk deployment log and:

- `https://ebarcode.ir/`
- `https://ebarcode.ir/api/barcode/health`
- an Angular route refresh, proving the fallback works

Do not report completion until the GitHub run, branch SHA, webhook delivery,
Plesk deployment, and public smoke checks agree.
