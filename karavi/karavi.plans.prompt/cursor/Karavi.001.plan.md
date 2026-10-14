 
{
  "metadata": {
    "title": "Karavi.001 — bootstrap",
    "updatedAt": "2026-08-26",
    "locale": "fa-IR",
    "projectId": "NTK.EBarCode",
    "planVersion": "1.0.0",
    "promptSpecVersion": "3.1.0"
  },
  "part1": {
    "request": "راه‌اندازی karavi در این مخزن",
    "tasks": [
      "تکمیل onboarding.md",
      "تنظیم configهای build/deploy",
      "verify.karavi-structure.ps1"
    ],
    "scope": "karavi/ and root .gitignore",
    "constraints": ["no import from other projects", "no remote transfer", "no secrets"]
  },
  "result1": {
    "status": "complete",
    "verification": "verify.karavi-structure.ps1; JSON parse; encoding and secret scan",
    "hosts": [],
    "notes": ["No legacy files existed in this repository.", "No product source or runtime host was present.", "Canonical product domain is https://ebarcode.ir; third-party design references were preserved."]
  }
}
 
