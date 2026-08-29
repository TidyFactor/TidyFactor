# TidyFactor Skills Ecosystem — Master Development & Publishing Roadmap (2026–2027)

> **Single Source of Truth Strategic Roadmap** for developing, maintaining, validating, packaging, and publishing the full suite of AI-native Agent Skills within the **TidyFactor Ecosystem**.

---

## 🏛️ Executive Summary & Core Principles

The **TidyFactor Skills Ecosystem** provides modular, AI-native development capabilities for autonomous coding agents (Google Antigravity, Claude Code, Cursor, Windsurf, Roo Code, Cline) and human developers.

Every skill is designed around **three core invariants**:
1. **Single Source of Truth (SSOT)**: Source code, documentation, templates, and agent rules reside exclusively in `c:\wamp64\www\TidyFactor\Skills\Skills-LAB\<skill-name>\`.
2. **100% Naming & Packaging Parity**:
   - Skill folder: `<skill-name>` (e.g., `tidyfactor-design`, `tidyfactor-cinematic`)
   - Archive bundle: `<skill-name>.skill` in `Skills-LAB` root
   - NPM Package: `@alwkala/<skill-name>`
   - CLI Executable: `npx @alwkala/<skill-name>` or `npx <skill-name>`
   - Skill Injection: `npx @alwkala/<skill-name> add-skill` or `npx <skill-name> add-skill`
3. **Zero Build Dependencies for Scaffolding**: CLI binaries use pure standard libraries for instant non-interactive CI/CD and AI agent execution.

---

## 🗺️ Master Skill Matrix & Release Status (11 Official Skills)

| Skill Track | Purpose & Scope | Slash Commands | Foundational Stack | NPM Package | Target Release | Status |
| :--- | :--- | :---: | :--- | :--- | :---: | :---: |
| **`tidyfactor-skill-architect`** | Governance layer & skill methodology engine | 3 | Dispatcher, Spec, Growth Rules, Tooling | [`@tidyfactor/skill-architect`](https://www.npmjs.com/package/@tidyfactor/skill-architect) | **v1.0.0** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-cinematic`** | Luxury scroll-driven landing pages & dynamic motion showcases | 17 | Three.js, GSAP, WebGL, Tailwind | [`@tidyfactor/cinematic`](https://www.npmjs.com/package/@tidyfactor/cinematic) | **v3.3.3** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-design`** | Code-native interactive prototyping engine & design systems | 24 | Native CSS, Tailwind, daisyUI, Hybrid | [`@tidyfactor/design`](https://www.npmjs.com/package/@tidyfactor/design) | **v1.3.8** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-styler`** | Codebase UI designer & RTL typography engine | 15 | Vanilla CSS, Logical Properties, Tailwind | [`@tidyfactor/styler`](https://www.npmjs.com/package/@tidyfactor/styler) | **v1.0.0** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-doc`** | Code documentation builder & Docsify architecture engine | 4 | Markdown, Docsify, PHPDoc, JSDoc | [`@tidyfactor/doc`](https://www.npmjs.com/package/@tidyfactor/doc) | **v1.1.0** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-next`** | Production-grade Next.js 16 & SaaS architecture & dev-perf engine | 14 | Next.js 16, React 19, Supabase RLS, Dev-Perf | [`@tidyfactor/next`](https://www.npmjs.com/package/@tidyfactor/next) | **v1.1.0** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-marketing`** | AI direct-response marketing & 360° growth engine | 28 | Direct Response, SEO, B2B LinkedIn, CRO | [`@tidyfactor/marketing`](https://www.npmjs.com/package/@tidyfactor/marketing) | **v1.0.0** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-html`** | Content-first static web platforms & semantic SEO foundations | 12 | Semantic HTML5, Vanilla CSS, JSON metadata | [`@tidyfactor/html`](https://www.npmjs.com/package/@tidyfactor/html) | **v1.0.0** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-js`** | Framework-free single-page applications & micro-apps | 14 | Vanilla JS ES Modules, Router, Store | [`@tidyfactor/js`](https://www.npmjs.com/package/@tidyfactor/js) | **v1.0.0** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-php`** | Full-stack server-rendered web applications & component layouts | 12 | PHP 8.x, Flight, Medoo, Plates, SQLite | [`@tidyfactor/php`](https://www.npmjs.com/package/@tidyfactor/php) | **v1.0.0** (Aug 2026) | 🟢 Production Ready |
| **`tidyfactor-htmx`** | Server-driven hypermedia interactivity & dynamic UI updates | 10 | htmx, Server Endpoints, Micro-HTML | [`@tidyfactor/htmx`](https://www.npmjs.com/package/@tidyfactor/htmx) | **v1.0.0** (Aug 2026) | 🟢 Production Ready |

---

## 🏗️ Standardized Skill Anatomy

Every skill repository inside `Skills-LAB` adheres strictly to this folder anatomy:

```
c:\wamp64\www\TidyFactor\Skills\Skills-LAB\<skill-name>\
├── AGENTS.md                          ← Workspace rules & token routing
├── VISION.md                          ← Pointer to ../TidyFactor-VISION.md
├── SKILL.md                           ← Core skill router / dispatcher (~350 tokens)
├── .tidyfactor                        ← JSON metadata marker
├── brand.json                         ← Brand token defaults
├── package.json                       ← NPM package configuration (@alwkala/<skill-name>)
├── README.md & README.ar.md           ← English & Arabic documentation
├── CHANGELOG.md & LICENSE             ← Release history & Apache-2.0 license
├── references/                        ← Commands, workflows, and memory files
├── bin/                               ← CLI binaries (add-skill.js & create-kit.js)
├── tools/                             ← Validation (validate_skill.py) & Builder (build-skill.js)
└── dist/                              ← Release archive (.skill)
```

---

## 🚀 Publishing Pipeline & Release Workflow

### 1. Automated Validation & Packaging Protocol
Before publishing any release:
```bash
# Run full validation
npm run validate

# Package archive and auto-sync to Skills-LAB root (<skill-name>.skill)
npm run build
```

### 2. GitHub Tag & NPM Release
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## 🔄 Cross-Skill Synergy & Interoperability

The TidyFactor ecosystem is modular and non-intrusive:
- **`tidyfactor-design`** builds interactive code-native prototypes. Once approved, the prototype can be transformed into a production static site via **`tidyfactor-html`**, a framework-free SPA via **`tidyfactor-js`**, or a server-rendered application via **`tidyfactor-php`** and **`tidyfactor-htmx`**.
- All tracks share the unified **`brand.json`** schema and token structure, allowing brand design systems to move seamlessly across technology stacks without redesign.

---

*Maintained by [Alwkala](https://alwkala.com) for the TidyFactor Ecosystem.*
