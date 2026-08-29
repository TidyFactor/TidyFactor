# Contributing to TidyFactor

Thank you for your interest in contributing to the **TidyFactor Architecture Ecosystem & AI Agent Skills Suite**!

---

## ⚡ Quick Setup (< 10 Minutes)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TidyFactor/TidyFactor.git
   cd TidyFactor
   ```
2. **Verify Node.js environment** (Node.js >= 18):
   ```bash
   node bin/cli.js doctor
   ```
3. **Inspect the Master Manifest**:
   ```bash
   cat MANIFEST.json
   ```

---

## 🏛️ Contribution Tracks

Contributions are welcome across 4 core areas:

1. **Core CLI & Distribution**: Enhancing `bin/cli.js`, installer scripts, and multi-agent target resolvers.
2. **Skill Architecture**: Proposing new skills or refining existing skills under the [13 TidyFactor Structural Rules](https://tidyfactor.com/documentation).
3. **Documentation & Localizations**: Improving guides in `README.*.md`, translation accuracy, and examples.
4. **Bug Fixes & Security**: Resolving issues with strict reproducible test cases.

---

## 📋 The 13 TidyFactor Structural Rules

All skill contributions must strictly satisfy:

1. **Dispatcher Discipline**: `SKILL.md` is a lightweight router (~350 tokens).
2. **One Workflow = One Outcome**: Every workflow ends with a deterministic deliverable.
3. **Operational Memory**: Pure patterns and rules—zero marketing commentary.
4. **No Empty Structures**: Clean, flattened architecture.
5. **Philosophy Isolation**: Brand philosophy separated into `memory/philosophy.md`.
6. **Trigger-Justified Growth**: Explicit lifecycle triggers required for new commands.
7. **Quality Bar & Native Tooling**: Deterministic wrappers over native compiler tools.
8. **Behavioral Parity**: Identical behavior across Antigravity, Claude Code, Cursor, and Codex.
9. **Platform Compatibility**: Strict YAML frontmatter compliance.
10. **Tool Permission Declaration**: Scope declared in `SKILL.md`.
11. **Memory Freshness**: Timestamps verified within 180 days.
12. **Skill vs MCP Boundary**: Static knowledge in skills; dynamic mutations in MCP.
13. **Two-Tier Multi-Language Documentation**: Canonical `README.md` + verified regional localizations.

---

## 🔄 Pull Request Guidelines

1. Create a dedicated feature branch (`feat/your-feature` or `fix/issue-description`).
2. Adhere to [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`).
3. Run local validation:
   ```bash
   node bin/cli.js list
   ```
4. Submit your PR and fill in the [Pull Request Template](PULL_REQUEST_TEMPLATE.md).

---

© 2026 TidyFactor & Alwkala. Licensed under Apache-2.0.
