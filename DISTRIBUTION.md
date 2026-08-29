# TidyFactor Multi-Platform Distribution Strategy & Architecture

> **Official Omni-Channel Distribution Standard for TidyFactor AI Agent Skills, Toolchains & Architectural Monoliths**

---

## 🏛️ Executive Summary

TidyFactor employs an **independent, multi-channel distribution model** designed to ensure that developers and autonomous AI agents can discover, install, update, and audit skills without relying solely on GitHub.

```mermaid
graph TD
    LAB[Skills-LAB SSOT Workspace] --> |Build & Package| Packager[distribution_sync.py]
    Packager --> |1. Direct Download Assets| WebStorage[tidyfactor.com /downloads/skills/]
    Packager --> |2. Self-Hosted API Registry| WebAPI[tidyfactor.com /api/v1/skills]
    Packager --> |3. Standalone Installers| WebInstallers[tidyfactor.com /api/v1/install.sh & install.ps1]
    Packager --> |4. Unified CLI Engine| NPMCLI[@alwkala/tidyfactor on NPM]
    Packager --> |5. Umbrella Manifest & Sync| Umbrella[b:\Dev-Studio\TidyFactor]
    
    WebInstallers --> |curl / irm| AnyTerminal[Any OS Terminal / CI/CD]
    NPMCLI --> |npx @alwkala/tidyfactor add| IDEAgents[Antigravity / Claude / Cursor / Codex]
    WebStorage --> |Direct .skill / .zip| WebVisitors[Website Users & Enterprise]
```

---

## 🚀 1. Universal Command-Line Tool (TidyFactor CLI)

The unified CLI package provides zero-dependency skill discovery, installation, and environment auditing:

### Instant Execution (NPX)
```bash
# List all 12 registered skills
npx @alwkala/tidyfactor list

# Install a skill into your current workspace (.agents/skills/)
npx @alwkala/tidyfactor add tidyfactor-cinematic

# Install specifically for Cursor (.cursor/skills/)
npx @alwkala/tidyfactor add tidyfactor-styler --cursor

# Install globally for Antigravity / Gemini
npx @alwkala/tidyfactor add tidyfactor-skill-architect --global

# Inspect skill commands and triggers
npx @alwkala/tidyfactor info tidyfactor-marketing

# Audit active agent skills in your environment
npx @alwkala/tidyfactor doctor
```

---

## ⚡ 2. Standalone Oneliner Installers (Direct Server Execution)

For automated CI/CD pipelines, container environments, and developers without Node.js:

### Linux / macOS (cURL & Bash)
```bash
# Install Master Suite (all 12 skills)
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash

# Install a specific skill
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- tidyfactor-cinematic
```

### Windows (PowerShell)
```powershell
# Install Master Suite (all 12 skills)
irm https://tidyfactor.com/api/v1/install.ps1 | iex

# Install a specific skill
irm https://tidyfactor.com/api/v1/install.ps1 | iex -Skill tidyfactor-cinematic
```

---

## 🌐 3. Self-Hosted API Registry & Direct Download Center

The TidyFactor Hub (`tidyfactor.com`) hosts an independent, high-speed CDN and JSON API:

### Machine-Readable API Endpoints
| Endpoint | Method | Output | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/skills` | `GET` | `application/json` | Full skills catalog with versions, checksums, and download URLs. |
| `/api/v1/skills/{id}` | `GET` | `application/json` | Metadata and triggers for a specific skill. |
| `/api/v1/install.sh` | `GET` | `text/x-shellscript` | Universal Linux/macOS bash installer. |
| `/api/v1/install.ps1` | `GET` | `text/plain` | Universal Windows PowerShell installer. |

### Direct Archive Downloads
| Package | Format | Direct Link |
| :--- | :--- | :--- |
| **All-in-One Master Suite** | `.zip` | [tidyfactor-skills-suite.zip](https://tidyfactor.com/downloads/tidyfactor-skills-suite.zip) |
| **Individual Skills** | `.skill` | `https://tidyfactor.com/downloads/skills/<skill-id>.skill` |

---

## 🤖 4. AI Agent & IDE Environment Matrix

Every TidyFactor skill adheres to the strict 5-target synchronization standard:

1. **Workspace SSOT**: `c:\wamp64\www\TidyFactor\Skills\Skills-LAB\<skill-name>\`
2. **Local Agent Wrapper**: `.agents/skills/<skill-name>/`
3. **Global Gemini/Antigravity Config**: `~/.gemini/config/skills/<skill-name>/`
4. **Cursor Directory**: `.cursor/skills/<skill-name>/`
5. **Claude / Unix Agent Environment**: `~/.claude/skills/<skill-name>/`

---

## 🔒 5. Commercial & Private Pro Pack Distribution Protocol

For proprietary packs residing in `Skills-pro-pack`:
- Distributed as authenticated `.skill` bundles via private license keys.
- Continuous updates managed via `install.js` and licensed webhooks.
- Zero public code leakage—complete separation between Open Source community skills and commercial packs.

---

## 🛠️ 6. Automated Distribution Sync Tooling

Whenever modifying or releasing skills in `Skills-LAB`, run the distribution sync engine:

```bash
python tools/distribution_sync.py
```

This single command:
1. Validates and packages all 12 skills.
2. Rebuilds `tidyfactor-skills-suite.zip`.
3. Synchronizes download assets to `TidyFactor-website`.
4. Updates `v3/data/registry.json`.
5. Updates standalone shell installers.
6. Synchronizes `b:\Dev-Studio\TidyFactor\MANIFEST.json`.

---

© 2026 TidyFactor & Alwkala. Licensed under Apache-2.0.
