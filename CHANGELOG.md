# CHANGELOG — TidyFactor Skills Suite & CLI

## TidyFactor Skills Suite & CLI v2.1.1 (2026-09-05)

Maintenance and ecosystem synchronization release addressing audit findings across CLI command line argument parsing, Windows archive extraction, NTFS junction safety, and cross-suite skill metadata.

### 🛠️ Bug Fixes & Resilience Improvements
- **Argument & Flag Parsing Order**: Resolved positional argument vs. flags parsing order across `add`, `remove`, `info`, `update`, `use`, `find` so flags (e.g., `--cursor`, `-y`, `--ar`) positioned before skill names or queries are properly parsed without capturing option flags as target identifiers.
- **Auto-Confirm Logic**: Fixed `isAll` inversion logic bug in `cmdAdd` where `-y` inverted batch installations.
- **Native Windows Archive Extraction**: Upgraded Windows archive extraction fallback to native .NET `[System.IO.Compression.ZipFile]::ExtractToDirectory` so `.skill` archives extract without PowerShell file extension rejection errors.
- **Dangling Junction & Symlink Protection**: Protected symlink and NTFS Junction creation against dangling/broken existing links using `fs.lstatSync` prior to creation (preventing `EEXIST` crashes).
- **Target Flag Expansion & Auto-Detection**: Added explicit `--antigravity`, `--gemini`, `--codex` target flags, and auto-detecting active agents when no flags are supplied.
- **Self-Copy Guard**: Added guard in `deploySkillToTargets` when source directory equals canonical destination directory.
- **Ephemeral Temp Cleanup**: Wrapped ephemeral execution in `cmdUse` with a `finally` block to guarantee temp directory cleanup and prevent `%TEMP%` leakage.
- **Multi-Target Removal**: Expanded `tf remove` to check and clean all 18+ agent directories as well as lockfile-recorded targets.
- **NPM Package Files**: Added all 8 localized README files (`README.ar.md`, `de`, `es`, `fa`, `fr`, `pt`, `zh`) to `package.json["files"]`.
- **Ecosystem Synchronization**: Synchronized `tidyfactor-styler` v1.4.1 (with Master Component Pattern Registry and motif overlap prevention rules) across `MANIFEST.json`, `COMMUNITY_SKILLS`, and the master `tidyfactor-skills-suite.zip`.

---

## TidyFactor Skills Suite & CLI v2.1.0 (2026-09-05)

Minor feature release incorporating Open Agent standard insights (`skills.sh` / Vercel Labs) to deliver supreme developer experience (DX), ephemeral execution, smart skill discovery, and multi-agent canonical filesystem junctions while maintaining zero external dependencies.

### 🏛️ The 7 Core Additions of v2.1.0

1. **⚡ Ephemeral Execution Without Installing (`tf use <skill> [prompt]`)**:
   - Run any skill ephemerally without polluting project directories or modifying agent configurations.
   - Outputs clean, pure Markdown prompt directly to `stdout` for effortless pipe composition (`tf use design "Build hero section" | claude`, `tf use design | clip.exe`, `pbcopy`).
   - Interactive agent spawning with `--agent <name>` (supports Claude Code, Gemini/Antigravity, Cursor, etc.).

2. **🔍 Instant Smart Discovery Engine (`tf find [query]`)**:
   - Fast keyword and semantic query search across all 13 community skills, 5 curated workflow packs, and Pro suites.
   - Rich interactive prompt mode when run without arguments (`tf find`).
   - Supports dual-language filtering with `--ar` and `--en`.

3. **🔗 Multi-Target Canonical Junctions Architecture**:
   - Eliminates redundant file copying across multiple agent directories.
   - Installs the canonical skill into `.agents/skills/<skill>`, then transparently mounts secondary agent directories (`.cursor/skills`, `.windsurf/skills`, `.claude/skills`, etc.) using **NTFS Junctions** on Windows (no administrator privileges required) and **Directory Symlinks** on POSIX.
   - Provides `--copy` flag for explicit deep file copying when symlinks or junctions are not desired or across network/isolated drives.

4. **📂 3-Level Bounded Catalog Discovery**:
   - Bounded discovery algorithm (maximum depth: 3) prevents accidental infinite recursion on massive workspaces.
   - Directory shadowing priorities (`skills/` ➜ `.agents/` ➜ `.gemini/`).
   - `metadata.internal` / `private` gating skips internal sub-modules and draft artifacts cleanly.

5. **🌐 Global Agent Scope (`-g, --global`)**:
   - Full support for global agent installation targeting user home directories (e.g., `~/.gemini/config/skills/`, `~/.cursor/skills/`, `~/.claude/skills/`).
   - Strict separation between project-level active agent detection and explicit user global targets.

6. **🤖 18+ Agent Platform Interoperability Matrix**:
   - Synchronized support across Google Antigravity/Gemini, Claude Code, Cursor, Windsurf, Trae, Codex, GitHub Copilot, Roo Code, Cline, OpenClaw, AMP, VS Code, Zed, Qwen, Amazon Q, JetBrains Junie, Continue, and Void.

7. **🔒 Zero-Dependency Invariant Maintained**:
   - 100% pure Node.js standard library (`fs`, `path`, `child_process`, `os`, `readline`, `https`).
   - Instant startup time under 15ms with zero npm security audit alerts.

---

## TidyFactor Skills Suite & CLI v2.0.0 (2026-09-05)

Major architectural release transforming the TidyFactor CLI (`@tidyfactor/cli` and `tf`) into an interactive zero-dependency terminal suite, integrating `tidyfactor-brain` into the official community matrix (13 skills), introducing governance lockfiles (`.tidyfactor/skills.lock`), full native bilingual support (EN/AR), and extended lifecycle commands (`sync`, `outdated`, `update`, `remove`, `info`).

### 🏛️ The 5 Strategic Pillars of v2.0.0

1. **🎨 Terminal Aesthetics (Luxury ASCII Branding)**:
   - Curved box borders (`╭`, `╮`, `╯`, `╰`), emerald/cyan/amber truecolor palette.
   - Smooth non-blocking micro-spinners (`⠋ ⠙ ⠹...`) for asynchronous operations.
   - Real-time download progress bar (`[████████░░░░░░░░] 52% (8.2 MB / 15.7 MB)`) for archive streams.
   - Structured diagnostic cards with status badges (`✔`, `ℹ`, `✖`, `⚡`).

2. **🕹️ Zero-Dependency Interactive TUI**:
   - Arrow-key navigable menus (`↑`/`↓`, `k`/`j`) with live fuzzy text search (`type to filter`).
   - Checkbox multi-select (`[✔]`) with `Space` toggle, `a` (select all), and `i` (invert selection).
   - Graceful non-interactive fallback (`--yes`, `-y`, CI/CD pipelines, non-TTY environments).
   - 3-step progress stepper: Environment Discovery ➜ Agent Mount ➜ Skill Package Track.

3. **🛡️ Governance & Lockfile Architecture**:
   - Official integration of `tidyfactor-brain` (v3.0.0) as the 13th official community skill.
   - Automated governance lockfile `.tidyfactor/skills.lock` tracking versions, sources, and targets.
   - Secure atomic folder extraction with Zip Slip path traversal guards.
   - Lifecycle audit commands: `tf outdated` and `tf update [skill]`.

4. **🎯 Expanded Real-World Use Cases**:
   - `tf sync`: Auto-detects active agents and synchronizes installed skills across all agent workspaces.
   - `tf info <skill>`: Displays metadata, slash commands, operational memory, and multi-platform oneliners.
   - `tf remove <skill>`: Clean uninstallation from all agent folders and lockfile removal.
   - `tf pro`: Enterprise DevOps (13 skills) and PocketOffice (11 skills) catalog gateway.

5. **🚀 Ergonomics & Native Bilingual Support**:
   - Dual binary aliases: `tidyfactor` and `tf`.
   - Full native Arabic (`--ar`) and English (`--en`) interface with runtime auto-detection.
   - Scripting flags: `--json` (machine-readable), `--dry-run` (simulation), `-g` (global mount).
   - Quad-channel resilient resolver (Local fast-sync ➜ NPM package runner ➜ CDN `.skill` ➜ GitHub release).

### 📦 Included Skills & Version Matrix (13 Community Skills)

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-brain`** | `v3.0.0` | Brain & Memory OS | [`tidyfactor-brain.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-brain.skill) |
| **`tidyfactor-cinematic`** | `v3.6.0` | Cinematic Landing | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.10.0` | Design Studio (CDL) | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.5.0` | Doc Platform | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.3.1` | GitHub Platform Engine | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.2.0` | Static HTML Platform | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.2.0` | HTMX Interactivity | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.2.0` | Vanilla JS SPA | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.5.0` | Marketing & SEO | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.4.0` | Next.js SaaS Engine | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.2.0` | PHP Modular Monolith | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.6.0` | Skill Architect (Gov) | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.4.0` | Styler & RTL Engine | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v2.0.0/tidyfactor-styler.skill) |

---

## TidyFactor Skills Suite v1.7.0

Official master bundle release containing all 13 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-brain`** | `v2.4.0` | TidyFactor Brain | [`tidyfactor-brain.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-brain.skill) |
| **`tidyfactor-cinematic`** | `v3.6.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.7.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.3.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.3.1` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.2.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.2.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.2.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.4.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.4.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.2.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.3.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.4.0` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.7.0)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.6.0

Official master bundle release containing all 13 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-brain`** | `v2.4.0` | TidyFactor Brain | [`tidyfactor-brain.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-brain.skill) |
| **`tidyfactor-cinematic`** | `v3.6.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.7.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.3.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.3.1` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.2.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.2.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.2.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.3.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.4.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.2.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.3.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.4.0` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.6.0)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.8.1

Official master bundle release containing all 12 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.6.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.5.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.3.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.3.1` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.2.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.2.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.2.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.3.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.4.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.2.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.1` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.2.1` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.1/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.8.1)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.8.0

Official master bundle release containing all 12 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.6.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.5.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.3.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.3.0` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.2.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.2.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.2.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.3.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.4.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.2.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.2.0` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.8.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.8.0)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.7.0

Official master bundle release containing all 12 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.6.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.5.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.3.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.3.0` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.2.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.2.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.2.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.3.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.4.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.2.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.2.0` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.7.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.7.0)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.6.0

Official master bundle release containing all 12 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.6.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.5.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.3.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.3.0` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.2.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.2.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.2.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.3.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.4.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.2.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.2.0` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.6.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.6.0)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.6.0

Official major feature release introducing Dual-Redundant Fallback Architecture (NPX Primary ➔ Direct Website CDN Fallback ➔ Local Fast-Path), comprehensive 10+ AI Agent target mounting, 5 official workflow packs, and multi-platform standalone installers.

### 🌟 Release Highlights (v1.6.0)
- **Dual-Redundant Installation Architecture**:
  - **Strategy 1 (Local Fast-Path)**: Zero-millisecond local workspace sync if developing within the TidyFactor monorepo.
  - **Strategy 2 (Primary Network)**: Executes official NPM runner (`npx -y @alwkala/<skill> add-skill`) leveraging NPM's global CDN and cache.
  - **Strategy 3 (Secondary Fallback)**: Automated seamless fallback to self-hosted binary CDN (`https://tidyfactor.com/downloads/skills/<skill>.skill`) with native OS unzipping & root flattening.
- **Unified Multi-Agent Sync**: Unpacked skills are automatically mirrored to all user-selected IDE agent environments (`.agents/skills/`, `.cursor/skills/`, `.claude/skills/`, `.windsurf/skills/`, `.cline/skills/`, and `~/.gemini/config/skills/`).
- **Standalone Shell Installers for Linux/macOS & Windows**:
  - `curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash` (POSIX Bash with `/dev/tty` support & multi-tool extraction fallback).
  - `irm https://tidyfactor.com/api/v1/install.ps1 | iex` (Pure ASCII PowerShell 5.1/7+ execution).
- **Curated Workflow Packs**: Full support for `pack:design`, `pack:saas`, `pack:engineering`, `pack:governance`, and `pack:growth`.
- **Live Self-Hosted REST Endpoints**: `/api/v1/packs` and `/api/v1/skills/search`.

---

## TidyFactor Skills Suite v1.5.1

Official omni-channel release introducing native multi-platform standalone installers (Linux, macOS, Windows), 10+ AI Agent IDE discovery & mounting matrix, 5 curated workflow packs, and self-hosted API endpoints.

### 🌟 Release Highlights (v1.5.1)
- **Standalone Linux & macOS Shell Engine (`install.sh`)**: Direct piped installation via `curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash` with `/dev/tty` interactive input support and multi-tool extraction fallback (`unzip`, `python3 zipfile`, `tar`).
- **Standalone Windows PowerShell Engine (`install.ps1`)**: Direct execution via `irm https://tidyfactor.com/api/v1/install.ps1 | iex` with pure ASCII syntax, auto-flattening, and zero Node.js dependency.
- **10+ AI Agent IDE Mounting Matrix**: Automated discovery and multi-mount support across Google Antigravity, Cursor IDE, Claude Code, Windsurf Cascade, Cline, OpenAI Codex, GitHub Copilot, AMP AI, OpenClaw, and VS Code.
- **Official Workflow Packs**: Support for `pack:design`, `pack:saas`, `pack:engineering`, `pack:governance`, and `pack:growth` across CLI, Shell installers, and API.
- **Self-Hosted API Endpoints**: Live endpoints `/api/v1/packs` and `/api/v1/skills/search` served directly from `tidyfactor.com`.
- **Enhanced 3-Step Interactive TUI Wizard**: Redesigned modern box-art UI with environment detection, target agent selection, 9 package options, and post-install command cheat-sheets.

---

## TidyFactor Skills Suite v1.5.0

Official master bundle release containing all 12 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.6.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.5.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.3.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.3.0` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.2.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.2.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.2.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.2.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.4.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.2.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.2.0` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.5.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.5.0)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.4.1

Official master bundle release containing all 12 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.5.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.4.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.2.1` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.1.0` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.1.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.1.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.1.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.1.1` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.3.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.1.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.1.1` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.1/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.4.1)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.4.0

Official master bundle release containing all 12 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.5.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.4.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.2.1` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.0.0` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.1.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.1.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.1.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.1.1` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.3.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.1.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.1.1` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.4.0)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.4.0

Official master bundle release containing all 12 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.5.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.4.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.2.1` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-doc.skill) |
| **`tidyfactor-github`** | `v1.0.0` | TidyFactor GitHub | [`tidyfactor-github.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-github.skill) |
| **`tidyfactor-html`** | `v1.1.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.1.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.1.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.1.1` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.3.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.1.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.1.1` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.4.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.4.0)
- **Official Launch of `tidyfactor-github` (v1.0.0)**: Complete GitHub Platform Operations, Rulesets, SHA-pinned Actions CI/CD, Org Team Governance, CODEOWNERS, and Anti-Slop README Experience Engine.
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 12 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 12 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.3.0

Official master bundle release containing all 11 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.5.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.4.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.2.1` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-doc.skill) |
| **`tidyfactor-html`** | `v1.1.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.1.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.1.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.1.1` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.3.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.1.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v2.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.1.1` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.3.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.3.0)
- **Vercel React Best Practices Integration (`tidyfactor-next` v1.3.0)**: Integrated 8-tier prioritized runtime performance catalog (Waterfalls, Bundle optimization, `React.cache()`, Next.js 16 `after()`, minimal RSC props serialization, and re-render guards).
- **Prioritized Rule Catalog Architecture (`tidyfactor-skill-architect` v2.1.0)**: Enshrined standardized rule template (`rule-template.md`), Growth Trigger 5, and impact-ranked catalog architecture.
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 11 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 11 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.2.0

Official master bundle release containing all 11 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.5.0` | TidyFactor Cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.4.0` | TidyFactor Design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.2.1` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-doc.skill) |
| **`tidyfactor-html`** | `v1.1.0` | TidyFactor HTML | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.1.0` | TidyFactor HTMX | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.1.0` | TidyFactor JS | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.1.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.2.0` | TidyFactor Next.js | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.1.0` | TidyFactor PHP | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v1.1.1` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.1.1` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.2.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release (v1.2.0)
- **Universal Contextual Decision Layer (CDL v1.0)**: Standardized pre-flight `/brief` command and thin arbitration protocol across all 11 skills.
- **7-Axis Quality Gates (`P/H/E/S/R/V/D`)**: Strict pre-emit critique stamps and deterministic anti-slop verification across all skill tracks.
- **Dual-Channel Distribution (GitHub + NPM)**: All 11 skills packaged with standardized CLI installers (`npx @alwkala/<skill> add-skill`) and standalone `.skill` bundles.
- **100% Zero-Gap Ecosystem Audit**: Full compliance across SemVer synchronization, workflow validation checklists, and machine-path sanitization.
- **Updated Skill Matrix**: `tidyfactor-cinematic` (v3.5.0), `tidyfactor-design` (v1.4.0), `tidyfactor-next` (v1.2.0), `tidyfactor-doc` (v1.2.1), `tidyfactor-styler` (v1.1.1), `tidyfactor-skill-architect` (v1.1.1), `tidyfactor-marketing` (v1.1.0), `tidyfactor-html` (v1.1.0), `tidyfactor-htmx` (v1.1.0), `tidyfactor-js` (v1.1.0), `tidyfactor-php` (v1.1.0).

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.1.1

Official master bundle release containing all 11 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.4.0` | tidyfactor-cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.3.9` | tidyfactor-design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.2.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-doc.skill) |
| **`tidyfactor-html`** | `v1.0.0` | tidyfactor-html | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.0.0` | tidyfactor-htmx | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.0.0` | tidyfactor-js | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.1.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.1.0` | tidyfactor-next | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.0.0` | tidyfactor-php | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v1.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.1.1` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.1/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release
- **`tidyfactor-styler` (v1.1.0)**: Introduced Contextual Decision Layer (CDL v1.0), `/brief` command, and 7-axis pre-emit self-critique (`P/H/E/S/R/V/D`).
- **`tidyfactor-doc` (v1.2.0)**: Added dual-engine publishing platform (MkDocs Material with native Arabic RTL & Docsify SPA).
- **`tidyfactor-skill-architect` (v1.1.0)**: Codified the CDL Pattern specification and token budgeting rules into master governance.
- **`tidyfactor-cinematic` (v3.4.0)** & **`tidyfactor-design` (v1.3.9)**: Enhanced animation curves and responsive layout archetypes.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.1.0

Official master bundle release containing all 11 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.4.0` | tidyfactor-cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.3.9` | tidyfactor-design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.2.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-doc.skill) |
| **`tidyfactor-html`** | `v1.0.0` | tidyfactor-html | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.0.0` | tidyfactor-htmx | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.0.0` | tidyfactor-js | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.1.0` | TidyFactor Marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.1.0` | tidyfactor-next | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.0.0` | tidyfactor-php | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v1.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.1.0` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release
- **`tidyfactor-styler` (v1.1.0)**: Introduced Contextual Decision Layer (CDL v1.0), `/brief` command, and 7-axis pre-emit self-critique (`P/H/E/S/R/V/D`).
- **`tidyfactor-doc` (v1.2.0)**: Added dual-engine publishing platform (MkDocs Material with native Arabic RTL & Docsify SPA).
- **`tidyfactor-skill-architect` (v1.1.0)**: Codified the CDL Pattern specification and token budgeting rules into master governance.
- **`tidyfactor-cinematic` (v3.4.0)** & **`tidyfactor-design` (v1.3.9)**: Enhanced animation curves and responsive layout archetypes.

---

# CHANGELOG — TidyFactor Skills Suite

## TidyFactor Skills Suite v1.1.0

Official master bundle release containing all 11 production AI Coding Agent Skills for Google Antigravity, Claude Code, Cursor, Codex, and Windsurf.

### 📦 Included Skills & Version Matrix

| Skill | Version | Specialization | Direct Download |
| :--- | :---: | :--- | :---: |
| **`tidyfactor-cinematic`** | `v3.4.0` | tidyfactor-cinematic | [`tidyfactor-cinematic.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-cinematic.skill) |
| **`tidyfactor-design`** | `v1.3.9` | tidyfactor-design | [`tidyfactor-design.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-design.skill) |
| **`tidyfactor-doc`** | `v1.2.0` | TidyFactor Doc | [`tidyfactor-doc.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-doc.skill) |
| **`tidyfactor-html`** | `v1.0.0` | tidyfactor-html | [`tidyfactor-html.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-html.skill) |
| **`tidyfactor-htmx`** | `v1.0.0` | tidyfactor-htmx | [`tidyfactor-htmx.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-htmx.skill) |
| **`tidyfactor-js`** | `v1.0.0` | tidyfactor-js | [`tidyfactor-js.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-js.skill) |
| **`tidyfactor-marketing`** | `v1.0.0` | tidyfactor-marketing | [`tidyfactor-marketing.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-marketing.skill) |
| **`tidyfactor-next`** | `v1.1.0` | tidyfactor-next | [`tidyfactor-next.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-next.skill) |
| **`tidyfactor-php`** | `v1.0.0` | tidyfactor-php | [`tidyfactor-php.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-php.skill) |
| **`tidyfactor-skill-architect`** | `v1.1.0` | TidyFactor Skill Architect | [`tidyfactor-skill-architect.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-skill-architect.skill) |
| **`tidyfactor-styler`** | `v1.1.0` | TidyFactor Styler | [`tidyfactor-styler.skill`](https://github.com/TidyFactor/TidyFactor/releases/download/v1.1.0/tidyfactor-styler.skill) |

### 🚀 Quick Start / Universal Install

```bash
# Unzip and load into your agent workspace
unzip tidyfactor-skills-suite.zip -d .agents/skills/
```

### 🌟 Highlights in this Suite Release
- **`tidyfactor-styler` (v1.1.0)**: Introduced Contextual Decision Layer (CDL v1.0), `/brief` command, and 7-axis pre-emit self-critique (`P/H/E/S/R/V/D`).
- **`tidyfactor-doc` (v1.2.0)**: Added dual-engine publishing platform (MkDocs Material with native Arabic RTL & Docsify SPA).
- **`tidyfactor-skill-architect` (v1.1.0)**: Codified the CDL Pattern specification and token budgeting rules into master governance.
- **`tidyfactor-cinematic` (v3.4.0)** & **`tidyfactor-design` (v1.3.9)**: Enhanced animation curves and responsive layout archetypes.

---

