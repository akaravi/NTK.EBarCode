# EBarCode Plesk deployment profile

- Domain: `ebarcode.ir`
- GitHub repository: `akaravi/NTK.EBarCode`
- Release branch: `plesk/ebarcode`
- Trigger: exact tag `publish`
- Deployment mode: Automatic
- Server path: resolve only through the Plesk directory selector
- Runtime: Windows x64, framework-dependent .NET 10
- Application: ASP.NET Core API serving Angular from `wwwroot`
- API route: `/api`
- Server-owned files: `appsettings*.json`, case-insensitive `nlog*.config`, `web.config`, `.env*`

Webhook URL, UUID, SSH key material, passwords, tokens, connection strings,
and other credentials are intentionally not stored here.
