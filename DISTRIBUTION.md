# TidyFactor Multi-Platform Distribution Strategy & Architecture

> **Official Omni-Channel Distribution Standard for TidyFactor AI Agent Skills, Toolchains & Architectural Monoliths**

---

## 🏛️ Executive Summary

TidyFactor employs an **independent, omni-channel distribution model** designed to ensure that developers and autonomous AI agents can discover, install, update, and audit skills across any operating system or developer environment without relying solely on GitHub.

```mermaid
graph TD
    LAB[Skills-LAB SSOT Workspace] --> |Build & Package| Packager[distribution_sync.py]
    Packager --> |1. Direct Download Assets| WebStorage[tidyfactor.com /downloads/skills/]
    Packager --> |2. Self-Hosted API Registry| WebAPI[tidyfactor.com /api/v1/skills]
    Packager --> |3. Standalone Installers| WebInstallers[tidyfactor.com /api/v1/install.sh & install.ps1]
    Packager --> |4. Unified CLI Engine| NPMCLI[@tidyfactor/cli on NPM]
    Packager --> |5. Master Homebrew Formula| BREW[Formula/tidyfactor.rb]
    Packager --> |6. Umbrella Manifest & Sync| Umbrella[c:\wamp64\www\TidyFactor\CLI\TidyFactor CLI]
    
    WebInstallers --> |curl / irm| AnyTerminal[Any OS Terminal / CI/CD]
    NPMCLI --> |npx @tidyfactor/cli add| IDEAgents[Antigravity / Claude / Cursor / Codex / Trae]
    BREW --> |brew install tidyfactor.rb| MacUsers[macOS & Linux Terminal]
    WebStorage --> |Direct .skill / .zip| WebVisitors[Website Users & Enterprise]
```

---

## ⚡ 1. Universal Command-Line Tool (TidyFactor CLI)

The unified CLI package provides zero-dependency skill discovery, installation, and environment auditing:

### Instant Execution (NPX)
```bash
# List all 12 registered skills
npx @tidyfactor/cli list

# Launch interactive 3-step setup wizard
npx @tidyfactor/cli init

# Install a skill into your current workspace (.agents/skills/)
npx @tidyfactor/cli add tidyfactor-cinematic

# Install specifically for Cursor (.cursor/skills/)
npx @tidyfactor/cli add tidyfactor-styler --cursor

# Install globally for Antigravity / Gemini
npx @tidyfactor/cli add tidyfactor-skill-architect --global

# Inspect skill commands and triggers
npx @tidyfactor/cli info tidyfactor-marketing

# Audit active agent skills in your environment
npx @tidyfactor/cli doctor
```

---

## 🍺 2. macOS & Linux Homebrew (Master Repository Formula)

For native package management on macOS (Apple Silicon / Intel) and Linuxbrew directly from the Single Source of Truth:

```bash
# Direct one-line install from the official master repository:
brew install https://raw.githubusercontent.com/TidyFactor/TidyFactor/main/Formula/tidyfactor.rb

# Or tap the master repository directly:
brew tap TidyFactor/tidyfactor https://github.com/TidyFactor/TidyFactor.git
brew install tidyfactor
```

---

## 💻 3. Standalone Oneliner Installers (Direct Server Execution)

For automated CI/CD pipelines, container environments, and developers without Node.js:

### Linux & macOS (cURL & Bash)
```bash
# Launch interactive 3-step installer
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash

# Install a specific pack
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- pack:design
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- pack:saas

# Install a specific skill
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- tidyfactor-cinematic

# Install entire Master Suite (all 12 skills)
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- all
```

### Windows (PowerShell)
```powershell
# Launch interactive 3-step installer
irm https://tidyfactor.com/api/v1/install.ps1 | iex

# Install a specific pack
$Skill = 'pack:design'; irm https://tidyfactor.com/api/v1/install.ps1 | iex

# Install a specific skill
$Skill = 'tidyfactor-cinematic'; irm https://tidyfactor.com/api/v1/install.ps1 | iex

# Install entire Master Suite (all 12 skills)
$Skill = 'all'; irm https://tidyfactor.com/api/v1/install.ps1 | iex
```

---

## 🌐 4. Self-Hosted API Registry & Direct Download Center

The TidyFactor Hub (`tidyfactor.com`) hosts an independent, high-speed CDN and JSON API:

### Machine-Readable API Endpoints
| Endpoint | Method | Output | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/skills` | `GET` | `application/json` | Full skills catalog with versions, checksums, and download URLs. |
| `/api/v1/skills/{id}` | `GET` | `application/json` | Metadata and triggers for a specific skill. |
| `/api/v1/packs` | `GET` | `application/json` | Curated skill bundles for batch installation. |
| `/api/v1/install.sh` | `GET` | `text/x-shellscript` | Universal Linux/macOS bash installer. |
| `/api/v1/install.ps1` | `GET` | `text/plain` | Universal Windows PowerShell installer. |

### Direct Archive Downloads
| Package | Format | Direct Link |
| :--- | :--- | :--- |
| **All-in-One Master Suite** | `.zip` | [tidyfactor-skills-suite.zip](https://tidyfactor.com/downloads/skills/tidyfactor-skills-suite.zip) |
| **Individual Skills** | `.skill` | `https://tidyfactor.com/downloads/skills/<skill-id>.skill` |

---

## 🤖 5. AI Agent & IDE Environment Matrix (18+ IDEs)

Every TidyFactor skill adheres to the strict synchronization standard across 18+ agent environments:

1. **Workspace SSOT**: `c:\wamp64\www\TidyFactor\Skills\Skills-LAB\<skill-name>\`
2. **Local Agent Wrapper**: `.agents/skills/<skill-name>/`
3. **Global Gemini/Antigravity Config**: `~/.gemini/config/skills/<skill-name>/`
4. **Cursor Directory**: `.cursor/skills/<skill-name>/`
5. **Claude / Unix Agent Environment**: `~/.claude/skills/<skill-name>/`
6. **Trae AI IDE**: `.trae/skills/<skill-name>/`
7. **Windsurf Cascade**: `.windsurf/skills/<skill-name>/`

---

## 💼 6. Commercial & Private Pro Pack Distribution Protocol

For proprietary packs residing in `Skills-pro-pack`:
- Distributed as authenticated `.skill` bundles via private license keys.
- Continuous updates managed via `install.js` and licensed webhooks.
- Zero public code leakage—complete separation between Open Source community skills and commercial packs.

---

## 🔄 7. Automated Distribution Sync Tooling

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
6. Synchronizes `c:\wamp64\www\TidyFactor\CLI\TidyFactor CLI\MANIFEST.json`.

---

© 2026 TidyFactor & Alwkala. Licensed under Apache-2.0.
