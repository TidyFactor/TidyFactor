<div align="center">

# ⚡ TidyFactor Architecture Ecosystem
### AI-Native Web Architecture, Design Systems & Agent Skills
**Modular, deterministic, and context-efficient software foundations for Human-Agent Collaboration.**

[![Official Website](https://img.shields.io/badge/Website-tidyfactor.com-000000.svg?style=for-the-badge&logo=google-chrome&logoColor=white)](https://tidyfactor.com)
[![Documentation](https://img.shields.io/badge/Docs-Documentation-blue.svg?style=for-the-badge&logo=gitbook&logoColor=white)](https://tidyfactor.com/documentation)
[![NPM Organization](https://img.shields.io/badge/NPM-@alwkala-CB3837.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/org/tidyfactor)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge)](LICENSE)
[![Release v1.6.0](https://img.shields.io/badge/Release-v1.6.0-emerald.svg?style=for-the-badge)](https://github.com/TidyFactor/TidyFactor/releases/latest)

[ English ](README.md) • [ العربية ](README.ar.md) • [ فارسی ](README.fa.md) • [ Español ](README.es.md) • [ Português ](README.pt.md) • [ 简体中文 ](README.zh.md) • [ Deutsch ](README.de.md) • [ Français ](README.fr.md)

<br/>

```bash
# Instant 3-Step Interactive Wizard across 10+ AI Agent IDEs
npx @tidyfactor/cli init
```

<br/>

<p align="center">
  <img src="assets/cli-interactive-wizard.png" alt="TidyFactor Interactive CLI Setup Wizard" width="48%" style="border-radius: 8px; vertical-align: top; margin: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
  <img src="assets/agent-slash-commands.png" alt="AI Agent Slash Commands Autocomplete (/tidy)" width="48%" style="border-radius: 8px; vertical-align: top; margin: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</p>

</div>

---

## 🌟 Why TidyFactor Exists

The web stack has changed. The next generation of software must be designed for seamless, deterministic collaboration between **Human Engineers, AI Models, and Autonomous Coding Agents** (*Google Antigravity, Claude Code, Cursor, Codex, Windsurf, Cline*).

**TidyFactor** delivers lightweight skill dispatchers (~350 tokens), domain-specific operational memory, strict pre-emit critiques, and production-tested starter monoliths with zero prompt degradation.

---

## ⚡ Quick Multi-Platform Installation (Zero-Lockin)

### 1. Unified Node.js CLI (NPX) — Dual-Redundant (NPM + Direct CDN)
```bash
# Launch interactive 3-step setup wizard
npx @tidyfactor/cli init

# Install a curated workflow pack
npx @tidyfactor/cli add pack:design
npx @tidyfactor/cli add pack:saas

# Install a specific skill with target IDE flag
npx @tidyfactor/cli add tidyfactor-styler --cursor
npx @tidyfactor/cli add tidyfactor-cinematic --claude
npx @tidyfactor/cli add tidyfactor-skill-architect --global

# Workspace health audit & agent discovery
npx @tidyfactor/cli doctor
```

### 2. Standalone Shell Oneliners (Zero Node.js Required)
```bash
# Linux & macOS (cURL & POSIX Bash with /dev/tty interactive prompt)
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- pack:design
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- all

# Windows (PowerShell 5.1 & 7+ Pure ASCII)
irm https://tidyfactor.com/api/v1/install.ps1 | iex
$Skill = 'pack:design'; irm https://tidyfactor.com/api/v1/install.ps1 | iex
$Skill = 'all'; irm https://tidyfactor.com/api/v1/install.ps1 | iex
```

> 📖 **Read Full Architecture & REST API Reference:** [DISTRIBUTION.md](DISTRIBUTION.md)

---

## 📦 Curated Workflow Packs

| Pack Identifier | Pack Name | Focus & Scope | Quick Install Command |
| :--- | :--- | :--- | :--- |
| `pack:design` | **Design & Frontend Triad** | Cinematic Landing + Design Studio + Styler & RTL Engine | `npx @tidyfactor/cli add pack:design` |
| `pack:saas` | **SaaS Starter Kit** | Next.js 16 + Supabase RLS + Design + Marketing + Doc Platform | `npx @tidyfactor/cli add pack:saas` |
| `pack:engineering` | **Full-Stack Engineering** | PHP 8.x Monolith + HTMX + Vanilla JS SPA + Static HTML + Doc | `npx @tidyfactor/cli add pack:engineering` |
| `pack:governance` | **Governance & Operations** | Skill Architect + Doc Platform + GitHub Operations Engine | `npx @tidyfactor/cli add pack:governance` |
| `pack:growth` | **Growth & Marketing** | Direct-Response Marketing + SEO + Cinematic + Styler | `npx @tidyfactor/cli add pack:growth` |

---

## 🏛️ Official Community Skills Matrix (12 Skills)

| Category | Skill ID | Primary Triggers | Description | Direct .skill |
| :--- | :--- | :--- | :--- | :---: |
| **Governance** | `tidyfactor-skill-architect` | `/init`, `/audit`, `/test`, `/grow` | Master governance & structural methodology engine enforcing clean architecture. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-skill-architect.skill) |
| **Operations** | `tidyfactor-github` | `/audit`, `/oss`, `/ruleset`, `/readme`, `/action` | GitHub Platform Operations, Rulesets, SHA-pinned Actions CI & CX Engine. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-github.skill) |
| **Design** | `tidyfactor-cinematic` | `/film`, `/brand`, `/hero`, `/theme`, `/perf` | Luxury scroll-driven landing pages (Apple x Cartier aesthetic) with Canvas frames. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-cinematic.skill) |
| **Design** | `tidyfactor-design` | `/study`, `/brief`, `/tokens`, `/palette`, `/layout` | Code-native interactive prototyping & Figma alternative for design systems. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-design.skill) |
| **Design** | `tidyfactor-styler` | `/component`, `/section`, `/redesign`, `/rtl`, `/motion` | Production framework styler and surgical RTL UI polish across Next.js, PHP, Vanilla. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-styler.skill) |
| **Engineering** | `tidyfactor-next` | `/brief`, `/init`, `/tenant`, `/rls`, `/auth`, `/api` | Production multi-tenant SaaS engine (Next.js 16, React 19, Supabase RLS). | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-next.skill) |
| **Engineering** | `tidyfactor-php` | `/brief`, `/init`, `/admin`, `/plugins`, `/themes`, `/rbac` | Server-rendered modern PHP 8.x monolith (Flight + Medoo + Plates) with hooks. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-php.skill) |
| **Engineering** | `tidyfactor-htmx` | `/brief`, `/init`, `/fragments`, `/swap`, `/triggers` | Server-driven hypermedia interactivity engine paired with PHP, Node, or Python. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-htmx.skill) |
| **Engineering** | `tidyfactor-js` | `/brief`, `/init`, `/store`, `/compo`, `/route`, `/pages` | Framework-free reactive Vanilla SPA with client routing and Proxy state. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-js.skill) |
| **Engineering** | `tidyfactor-html` | `/brief`, `/init`, `/compo`, `/pages`, `/assets`, `/seo` | 100% static HTML/CSS/JS platform starter with Web Components and zero server. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-html.skill) |
| **Documentation** | `tidyfactor-doc` | `/init`, `/collect`, `/generate`, `/site`, `/mkdocs`, `/docsify` | Codebase documentation builder & dual-engine publishing platform (MkDocs & Docsify). | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-doc.skill) |
| **Growth** | `tidyfactor-marketing` | `/strategy`, `/content`, `/social`, `/email`, `/advertising` | AI Direct-response marketing, pillar-cluster SEO & multi-channel growth engine. | [⬇️ Download](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-marketing.skill) |

> 📦 **Master Suite Bundle (.zip)**: [⬇️ Download Direct from TidyFactor Hub](https://tidyfactor.com/downloads/tidyfactor-skills-suite.zip) | [GitHub Mirror](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-skills-suite.zip)

---

## 🤖 AI Agent IDE Target Matrix

Every TidyFactor skill is structured for instant compatibility across 10+ AI Agent IDEs:

| AI Agent / IDE | Mount Directory | Activation Mode |
| :--- | :--- | :--- |
| **Google Antigravity / Gemini** | `.agents/skills/<skill>/` | Native automatic workspace discovery |
| **Cursor IDE** | `.cursor/skills/<skill>/` | Project-level rule & command resolution |
| **Claude Code** | `.claude/skills/<skill>/` | Command & memory context injection |
| **Windsurf Cascade** | `.windsurf/skills/<skill>/` | Workspace rules & task execution |
| **Cline / VS Code** | `.cline/skills/<skill>/` | Custom skill toolchain integration |
| **OpenAI Codex** | `.agents/skills/<skill>/` | Workspace instructions & reference memory |
| **Global User Hub** | `~/.gemini/config/skills/<skill>/` | Available across all projects globally |

---

## 🏛️ Core Architectural Principles

1. **Context-Efficient Architecture**: Lightweight dispatchers (~350 tokens) with progressive disclosure — loading deep domain memory strictly on demand.
2. **Deterministic Execution**: Zero autonomous mass-edit scripts. Toolchains wrap native diagnostics (`tsc`, `node`, `git`, OS APIs).
3. **Locked Tenant Isolation**: Security boundaries live at the database layer (PostgreSQL RLS), ensuring application logic bugs cannot leak tenant data.
4. **Evidence-Based Performance**: Measure before optimizing. Cold/warm benchmark separation with a strict 20% statistical noise threshold.
5. **Human-Agent Code Symmetry**: Code structured for instant comprehension by both senior human engineers and autonomous AI agents.

---

## 👨‍💻 Organization & Official Channels

- 🌐 **Official Website:** [https://tidyfactor.com/](https://tidyfactor.com/)
- 📚 **Official Documentation:** [https://tidyfactor.com/documentation](https://tidyfactor.com/documentation)
- 🤝 **Official Partner:** [Alwkala Digital Agency](https://alwkala.com/)
- 🐙 **GitHub Organization:** [github.com/TidyFactor](https://github.com/TidyFactor)
- 📧 **Business Inquiries:** [hello@tidyfactor.com](mailto:hello@tidyfactor.com)
- 📱 **WhatsApp:** [+20 101 665 6899](https://wa.me/201016656899)
- 📍 **Location:** Cairo, Egypt

---

## 📜 License

Distributed under the **Apache License 2.0**. Copyright (c) 2026 [TidyFactor](https://tidyfactor.com) & [Alwkala Digital Agency](https://alwkala.com).
