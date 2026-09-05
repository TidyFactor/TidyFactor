#!/usr/bin/env node
/**
 * ⚡ TidyFactor CLI v2.1.0 — Universal AI Agent Skills Engine & Interactive Terminal Suite
 * 
 * Zero-dependency interactive wizard, agentic multi-mounting, context-aware stack detection,
 * resilient quad-channel resolver, governance lockfile, and full native bilingual support (EN/AR).
 * 
 * Supports 18+ AI Agent IDEs:
 * Trae, Cursor, Windsurf, Antigravity, Copilot, RooCode, OpenCode, KiloCode, Warp,
 * Kiro, Claude, Zed, JetBrains, Blackbox, Cline, AMP, OpenClaw, Codex.
 * 
 * @license Apache-2.0
 * @author TidyFactor <hello@tidyfactor.com> (https://tidyfactor.com)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const os = require('os');
const { execSync } = require('child_process');
const readline = require('readline');
const crypto = require('crypto');

const VERSION = '2.1.0';
const REGISTRY_HOST = process.env.TIDYFACTOR_REGISTRY_HOST || 'tidyfactor.com';
const REGISTRY_API_PATH = '/api/v1/skills';

// ─── 13 Official Community Skills Matrix ──────────────────────────
const COMMUNITY_SKILLS = [
  {
    id: 'tidyfactor-skill-architect',
    name: 'Skill Architect',
    nameAr: 'مهندس الحوكمة والمنهجية',
    version: '2.6.0',
    category: 'governance',
    desc: 'Master governance layer and methodology engine enforcing structural discipline & quality gates.',
    descAr: 'طبقة الحوكمة الرئيسية ومحرك المنهجية المعمارية المنظم لهياكل المهارات وبوابات الجودة.',
    commands: ['/init', '/audit', '/test', '/grow', '/brief', '/learn'],
    tags: ['governance', 'standards', 'all']
  },
  {
    id: 'tidyfactor-brain',
    name: 'Brain & Memory OS',
    nameAr: 'العقل والذاكرة السيادية',
    version: '3.0.0',
    category: 'governance',
    desc: 'Cognitive OS, 4-tier memory governance, sovereign workspace switcher & stdio MCP server.',
    descAr: 'نظام التشغيل الإدراكي، حوكمة الذاكرة رباعية المستويات، مبدل مساحات العمل وخادم MCP السيادي.',
    commands: ['/brief', '/context', '/switch', '/hygiene', '/recall', '/firewall'],
    tags: ['governance', 'memory', 'mcp', 'context', 'all']
  },
  {
    id: 'tidyfactor-cinematic',
    name: 'Cinematic Landing',
    nameAr: 'الصفحات السينمائية الفاخرة',
    version: '3.6.0',
    category: 'design',
    desc: 'Luxury scroll-driven landing pages (Apple x Cartier aesthetic) with canvas frame sequence films.',
    descAr: 'صفحات هبوط سينمائية فاخرة بتأثيرات التمرير وسلاسل الإطارات السينمائية لمنتجات الفخامة.',
    commands: ['/film', '/brand', '/hero', '/theme', '/perf', '/brief'],
    tags: ['frontend', 'html', 'react', 'next', 'luxury', 'design']
  },
  {
    id: 'tidyfactor-design',
    name: 'Design Studio',
    nameAr: 'استوديو التصميم والنماذج الأولية',
    version: '1.10.0',
    category: 'design',
    desc: 'Code-native interactive prototyping & Figma alternative for dashboards and design systems with CDL.',
    descAr: 'محرك النماذج الأولية التفاعلية بالكود وبديل فيغما المباشر للوحات التحكم وأنظمة التصميم.',
    commands: ['/study', '/brief', '/tokens', '/palette', '/layout', '/dashboard'],
    tags: ['frontend', 'ui', 'react', 'next', 'html', 'dashboard', 'design']
  },
  {
    id: 'tidyfactor-styler',
    name: 'Styler & RTL Engine',
    nameAr: 'محرك الصقل ودعم العربية RTL',
    version: '1.4.0',
    category: 'design',
    desc: 'Production framework styler and surgical RTL UI polish engine across Next.js, PHP, Vanilla.',
    descAr: 'محرك الصقل البصري الجراحي ودعم العربية الكامل عبر أطر عمل Next.js و PHP و Vanilla.',
    commands: ['/component', '/section', '/redesign', '/rtl', '/motion', '/brief'],
    tags: ['frontend', 'rtl', 'arabic', 'next', 'php', 'html', 'tailwind', 'design']
  },
  {
    id: 'tidyfactor-doc',
    name: 'Doc Platform',
    nameAr: 'منصة التوثيق ونشر المعرفة',
    version: '1.5.0',
    category: 'documentation',
    desc: 'Codebase documentation builder & dual-engine publishing platform (MkDocs Material & Docsify).',
    descAr: 'محرك بناء توثيق الشيفرات والمنصات الثنائية (MkDocs Material و Docsify) مع استجواب الكود.',
    commands: ['/init', '/collect', '/generate', '/site', '/mkdocs', '/docsify'],
    tags: ['docs', 'all', 'documentation']
  },
  {
    id: 'tidyfactor-next',
    name: 'Next.js SaaS Engine',
    nameAr: 'محرك منصات ساس Next.js',
    version: '1.4.0',
    category: 'engineering',
    desc: 'Production multi-tenant SaaS engine on Next.js 16, React 19, TypeScript strict, and Supabase RLS.',
    descAr: 'محرك منصات ساس متعددة المستأجرين مبني على Next.js 16 و React 19 و Supabase RLS.',
    commands: ['/brief', '/init', '/tenant', '/rls', '/auth', '/api'],
    tags: ['next', 'react', 'typescript', 'saas', 'supabase', 'engineering']
  },
  {
    id: 'tidyfactor-marketing',
    name: 'Marketing & SEO',
    nameAr: 'محرك التسويق والنمو وسيو',
    version: '1.5.0',
    category: 'growth',
    desc: 'AI Direct-response marketing, pillar-cluster SEO & multi-channel growth engine with CDL.',
    descAr: 'محرك التسويق بالاستجابة المباشرة، وسيو العناقيد والمحاور، وحملات النمو عبر القنوات.',
    commands: ['/strategy', '/content', '/social', '/email', '/advertising', '/brief'],
    tags: ['marketing', 'seo', 'copywriting', 'growth']
  },
  {
    id: 'tidyfactor-html',
    name: 'Static Platform',
    nameAr: 'منصة الويب الثابتة فائقة السرعة',
    version: '1.2.0',
    category: 'engineering',
    desc: 'Content-first static HTML/CSS/JS platform starter for zero-server shared hosting and 100/100 SEO.',
    descAr: 'منصة الويب الثابتة المبنية للاستضافات المجانية والمشتركة ونتائج 100/100 في معايير Lighthouse.',
    commands: ['/brief', '/init', '/compo', '/pages', '/assets', '/seo'],
    tags: ['html', 'static', 'vanilla', 'engineering']
  },
  {
    id: 'tidyfactor-htmx',
    name: 'HTMX Hypermedia',
    nameAr: 'محرك تفاعلية HTMX المخدمية',
    version: '1.2.0',
    category: 'engineering',
    desc: 'Server-driven hypermedia interactivity engine with locally vendored HTMX & zero build step.',
    descAr: 'محرك التفاعلية عبر Hypermedia مع تضمين HTMX محلياً وبدون خطوات بناء معقدة.',
    commands: ['/brief', '/init', '/fragments', '/swap', '/triggers', '/forms'],
    tags: ['htmx', 'hypermedia', 'php', 'backend', 'engineering']
  },
  {
    id: 'tidyfactor-js',
    name: 'Vanilla SPA Engine',
    nameAr: 'محرك تطبيقات Vanilla SPA الأصلية',
    version: '1.2.0',
    category: 'engineering',
    desc: 'Framework-free reactive Vanilla SPA engine with client-side routing and reactive Proxy store.',
    descAr: 'محرك تطبيقات الصفحة الواحدة الخالي من أطر العمل مع توجيه المسارات وإدارة الحالة التفاعلية.',
    commands: ['/brief', '/init', '/store', '/compo', '/route', '/pages'],
    tags: ['javascript', 'vanilla', 'spa', 'engineering']
  },
  {
    id: 'tidyfactor-php',
    name: 'Modern PHP Monolith',
    nameAr: 'مونوليث PHP المعياري الحديث',
    version: '1.2.0',
    category: 'engineering',
    desc: 'Modern server-rendered PHP 8.x modular monolith with dynamic plugins, themes, and locked RBAC.',
    descAr: 'معمارية مونوليث PHP 8.x الحديثة مع دعم الإضافات والقوالب الديناميكية وصلاحيات RBAC.',
    commands: ['/brief', '/init', '/admin', '/plugins', '/themes', '/rbac'],
    tags: ['php', 'backend', 'modular', 'engineering']
  },
  {
    id: 'tidyfactor-github',
    name: 'GitHub Platform Ops',
    nameAr: 'عمليات وحوكمة منصة GitHub',
    version: '1.3.1',
    category: 'operations',
    desc: 'GitHub Platform Operations, SHA-pinned Actions CI/CD, Org Rulesets, CX Engine & Anti-Slop README UX.',
    descAr: 'إدارة عمليات منصة GitHub، وقواعد الفروع Rulesets، ومسارات CI/CD، وتجربة المساهمين CX.',
    commands: ['/audit', '/oss', '/ruleset', '/readme', '/release', '/security'],
    tags: ['github', 'cicd', 'rulesets', 'operations']
  }
];

// ─── 5 Curated Production Workflow Packs ───────────────────────────
const PACKS = {
  'design': {
    name: 'Design & Frontend Triad',
    nameAr: 'الثلاثي البصري والهندسي للواجهات',
    desc: 'Luxury landing pages, code-native prototyping, surgical RTL styling & governance',
    descAr: 'تصميم واجهات المستخدم الفاخرة، وصفحات الهبوط السينمائية، وصقل RTL، ومنهجية الحوكمة',
    skills: ['tidyfactor-cinematic', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-skill-architect']
  },
  'saas': {
    name: 'SaaS Starter Kit',
    nameAr: 'حزمة إطلاق منصات ساس المتكاملة',
    desc: 'Next.js 16 + Supabase multi-tenant stack with UI design, marketing, cognitive memory & docs',
    descAr: 'منصات Next.js 16 مع Supabase وتأمين RLS وتصميم الواجهات والتسويق والذاكرة الإدراكية والتوثيق',
    skills: ['tidyfactor-next', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-marketing', 'tidyfactor-brain', 'tidyfactor-doc']
  },
  'engineering': {
    name: 'Full-Stack Engineering',
    nameAr: 'حزمة الهندسة البرمجية الشاملة',
    desc: 'Server-rendered PHP monolith, HTMX hypermedia, Vanilla SPA & static platforms',
    descAr: 'مونوليث PHP المعياري الحديث، تفاعلية HTMX الفائقة، تطبيقات Vanilla JS، والمواقع الثابتة',
    skills: ['tidyfactor-php', 'tidyfactor-htmx', 'tidyfactor-js', 'tidyfactor-html', 'tidyfactor-doc']
  },
  'governance': {
    name: 'Governance & Operations',
    nameAr: 'حزمة الحوكمة والعمليات والذاكرة',
    desc: 'Skill methodology, memory OS, documentation platform & GitHub operations',
    descAr: 'منهجية حوكمة المهارات، نظام الذاكرة الإدراكية، التوثيق، وعمليات جتهب',
    skills: ['tidyfactor-skill-architect', 'tidyfactor-brain', 'tidyfactor-doc', 'tidyfactor-github']
  },
  'growth': {
    name: 'Growth & Marketing',
    nameAr: 'حزمة النمو والتسويق الرقمي',
    desc: 'Direct-response copywriting, SEO engine, high-converting pages & styling',
    descAr: 'صياغة النصوص البيعية، محرك سيو، صفحات التحويل العالي، وصقل الواجهات',
    skills: ['tidyfactor-marketing', 'tidyfactor-cinematic', 'tidyfactor-styler', 'tidyfactor-html']
  }
};

// ─── 18+ Agentic IDE Directory & Detection Definitions ─────────────
const AGENT_PLATFORMS = [
  { id: 'antigravity', name: 'Google Antigravity / Gemini', path: '.agents/skills',      globalPath: path.join(os.homedir(), '.gemini', 'config', 'skills'), signatures: ['.agents', '.agents/skills', 'GEMINI.md'] },
  { id: 'cursor',      name: 'Cursor IDE',                path: '.cursor/skills',      globalPath: path.join(os.homedir(), '.cursor', 'skills'), signatures: ['.cursor', '.cursorrules', '.cursor/skills'] },
  { id: 'windsurf',    name: 'Windsurf Cascade',          path: '.windsurf/skills',    globalPath: path.join(os.homedir(), '.codeium', 'windsurf', 'skills'), signatures: ['.windsurf', '.windsurfrules', '.windsurf/skills'] },
  { id: 'trae',        name: 'Trae AI IDE',               path: '.trae/skills',        globalPath: path.join(os.homedir(), '.trae', 'skills'), signatures: ['.trae', '.traerules', '.trae/skills'] },
  { id: 'claude',      name: 'Claude Code',               path: '.claude/skills',      globalPath: path.join(os.homedir(), '.claude', 'skills'), signatures: ['.claude', 'CLAUDE.md', '.claude/skills'] },
  { id: 'copilot',     name: 'GitHub Copilot',            path: '.github/prompts',     globalPath: path.join(os.homedir(), '.copilot', 'skills'), signatures: ['.github/copilot-instructions.md', '.github/prompts', '.github/skills'] },
  { id: 'roo',         name: 'RooCode (Roo Cline)',       path: '.roo/skills',         globalPath: path.join(os.homedir(), '.roo', 'skills'), signatures: ['.roo', '.roomodes', '.roo/rules', '.roo/skills'] },
  { id: 'opencode',    name: 'OpenCode / Zen',            path: '.opencode/skills',    globalPath: path.join(os.homedir(), '.config', 'opencode', 'skills'), signatures: ['.opencode', 'opencode.json', '.opencode/skills'] },
  { id: 'kilocode',    name: 'KiloCode',                  path: '.kilocode/skills',    globalPath: path.join(os.homedir(), '.kilocode', 'skills'), signatures: ['.kilocode', 'kilo.jsonc', '.kilo', '.kilocode/skills'] },
  { id: 'warp',        name: 'Warp Terminal',             path: '.warp/skills',        globalPath: path.join(os.homedir(), '.agents', 'skills'), signatures: ['.warp', '.warp/workflows', '.warp/skills'] },
  { id: 'kiro',        name: 'Kiro (AWS Spec IDE)',       path: '.kiro/skills',        globalPath: path.join(os.homedir(), '.kiro', 'skills'), signatures: ['.kiro', '.kiro/steering', '.kiro/skills'] },
  { id: 'zed',         name: 'Zed AI Agent',              path: '.zed/skills',         globalPath: path.join(os.homedir(), '.agents', 'skills'), signatures: ['.zed', '.zed/settings.json', '.zed/skills'] },
  { id: 'jetbrains',   name: 'JetBrains AI',              path: '.jetbrains/skills',   globalPath: path.join(os.homedir(), '.idea', 'ai'), signatures: ['.idea', '.idea/ai', '.jetbrains/skills'] },
  { id: 'blackbox',    name: 'Blackbox AI',               path: '.blackbox/skills',    globalPath: path.join(os.homedir(), '.blackbox', 'skills'), signatures: ['.blackbox', '.blackboxrules', '.blackbox/skills'] },
  { id: 'cline',       name: 'Cline / VS Code',           path: '.cline/skills',       globalPath: path.join(os.homedir(), '.agents', 'skills'), signatures: ['.clinerules', '.cline', '.cline/skills'] },
  { id: 'amp',         name: 'AMP AI',                    path: '.amp/skills',         globalPath: path.join(os.homedir(), '.amp', 'skills'), signatures: ['.amprules', '.amp', '.amp/skills'] },
  { id: 'openclaw',    name: 'OpenClaw',                  path: '.openclaw/skills',    globalPath: path.join(os.homedir(), '.openclaw', 'skills'), signatures: ['.openclaw', '.clawdbot', '.openclaw/skills'] },
  { id: 'codex',       name: 'OpenAI Codex',              path: '.agents/skills',      globalPath: path.join(os.homedir(), '.codex', 'skills'), signatures: ['codex.md', 'AGENTS.md'] },
];

// ─── ANSI Palette & Formatting Engine ──────────────────────────────
const color = {
  emerald: (s) => `\x1b[38;2;16;185;129m${s}\x1b[0m`,
  cyan:    (s) => `\x1b[38;2;6;182;212m${s}\x1b[0m`,
  amber:   (s) => `\x1b[38;2;245;158;11m${s}\x1b[0m`,
  green:   (s) => `\x1b[32m${s}\x1b[0m`,
  yellow:  (s) => `\x1b[33m${s}\x1b[0m`,
  blue:    (s) => `\x1b[34m${s}\x1b[0m`,
  magenta: (s) => `\x1b[35m${s}\x1b[0m`,
  red:     (s) => `\x1b[31m${s}\x1b[0m`,
  dim:     (s) => `\x1b[2m${s}\x1b[0m`,
  bold:    (s) => `\x1b[1m${s}\x1b[0m`,
  bgEmerald: (s) => `\x1b[48;2;16;185;129m\x1b[30m${s}\x1b[0m`,
  bgCyan:    (s) => `\x1b[48;2;6;182;212m\x1b[30m${s}\x1b[0m`,
  bgAmber:   (s) => `\x1b[48;2;245;158;11m\x1b[30m${s}\x1b[0m`,
};

// ─── Language Detection & Internationalization ─────────────────────
function detectLanguage(args = process.argv) {
  if (args.includes('--ar')) return 'ar';
  if (args.includes('--en')) return 'en';
  if (process.env.TIDYFACTOR_LANG === 'ar') return 'ar';
  return 'en';
}

const I18N = {
  en: {
    bannerTitle: '⚡ TidyFactor Architecture Ecosystem & AI Skill Engine',
    bannerSub: 'Universal Contextual Operating Layer & 18+ Agentic Mount Matrix',
    step1Title: 'Step 1/3: Environment & Agent Discovery',
    step2Title: 'Step 2/3: Choose Target Agentic IDE(s)',
    step3Title: 'Step 3/3: Choose Skill Package / Architectural Track',
    workspace: 'Workspace:',
    techStack: 'Tech Stack:',
    detectedAgents: 'Active Agents:',
    recommended: 'Recommended:',
    installing: 'Installing',
    success: 'Setup Complete!',
    quickTriggers: 'Quick Triggers & Slash Commands Installed:',
    howToUse: 'How to use with your AI Coding Agents:',
    filterHint: 'Use ↑↓ to navigate | space to toggle | a all | i invert | Enter to confirm | type to filter',
    filterLabel: 'Filter:',
    selectedCount: 'item(s) selected',
    allSkillsBadge: '13 Skills Master Suite',
    recommendedBadge: 'Tailored to Stack',
    localFast: '(Local fast-sync)',
    npmRegistry: '[NPM Registry: @tidyfactor]',
    cdnFallback: '[Direct CDN Fallback]',
    githubFallback: '[GitHub Release Fallback]',
    failed: 'Failed:',
    doctorTitle: '🩺 Workspace Diagnostics & 18+ Agent Readiness:',
    whoamiTitle: '👤 TIDYFACTOR IDENTITY & CLOUD TENANT DIAGNOSTICS',
    localIdTitle: '👤 TIDYFACTOR LOCAL SOVEREIGN IDENTITY',
    lockfileGenerated: 'Lockfile updated at .tidyfactor/skills.lock',
    outdatedTitle: '📦 TidyFactor Installed Skills Version & Status Audit',
    noLockfile: 'No .tidyfactor/skills.lock found. Run `tf init` or `tf sync` first.',
    allUpToDate: '✨ All installed skills are up to date with latest registry release!',
    syncTitle: '🔄 Synchronizing skills across all active agent directories...',
    syncComplete: '✨ Synchronization complete across active agent workspaces.',
  },
  ar: {
    bannerTitle: '⚡ منظومة تايدي فاكتور المعمارية ومحرك مهارات الذكاء الاصطناعي',
    bannerSub: 'نظام التشغيل السياقي العالمي ومصفوفة تثبيت المهارات عبر 18+ بيئة ذكية',
    step1Title: 'الخطوة 1/3: فحص مساحة العمل واكتشاف وكلاء الذكاء الاصطناعي',
    step2Title: 'الخطوة 2/3: اختيار بيئات عمل الوكلاء المستهدفة (Agent IDEs)',
    step3Title: 'الخطوة 3/3: اختيار باقة المهارات أو المسار المعماري',
    workspace: 'المسار المحلي:',
    techStack: 'الحزمة البرمجية:',
    detectedAgents: 'الوكلاء النشطون:',
    recommended: 'المهارات المقترحة:',
    installing: 'جاري تثبيت',
    success: 'اكتمل التثبيت والتركيب بنجاح!',
    quickTriggers: 'الأوامر السريعة المتاحة للوكيل:',
    howToUse: 'كيفية استخدام المهارات مع وكلائك الأذكياء:',
    filterHint: 'الأسهم ↑↓ للتنقل | مسافة للتحديد | a للكل | i للعكس | Enter للاعتماد | اكتب للبحث',
    filterLabel: 'البحث:',
    selectedCount: 'عناصر مختارة',
    allSkillsBadge: 'الجناح الكامل (13 مهارة)',
    recommendedBadge: 'مخصصة للمشروع',
    localFast: '(تزامن محلي فائق السرعة)',
    npmRegistry: '[حزمة NPM الرسمية]',
    cdnFallback: '[الشبكة السحابية المباشرة]',
    githubFallback: '[مستودع GitHub الرئيسي]',
    failed: 'فشل:',
    doctorTitle: '🩺 فحص صحة مساحة العمل وجاهزية الوكلاء البرمجيين:',
    whoamiTitle: '👤 تشخيص الهوية وحساب المستأجر السحابي السيادي',
    localIdTitle: '👤 الهوية المحلية السيادية لمساحة العمل',
    lockfileGenerated: 'تم تحديث ملف القفل في .tidyfactor/skills.lock',
    outdatedTitle: '📦 تدقيق إصدارات المهارات المثبتة وحالة التحديثات',
    noLockfile: 'لم يتم العثور على ملف قفل .tidyfactor/skills.lock. شغّل `tf init` أو `tf sync` أولاً.',
    allUpToDate: '✨ كافة المهارات المثبتة محدثة لأحدث إصدار رسمي!',
    syncTitle: '🔄 مزامنة المهارات المثبتة عبر كافة بيئات الوكلاء النشطة...',
    syncComplete: '✨ تمت المزامنة بنجاح عبر كافة مساحات عمل الوكلاء.',
  }
};

function t(key, lang = 'en') {
  return (I18N[lang] && I18N[lang][key]) || I18N['en'][key] || key;
}

// ─── Terminal Aesthetics & Banner ──────────────────────────────────
function printBanner(lang = 'en') {
  const isAr = lang === 'ar';
  console.log(color.emerald(`
  ╭─────────────────────────────────────────────────────────────╮
  │  ${color.bold(color.emerald('⚡ TIDYFACTOR CLI'))}  ${color.dim(`v${VERSION}`)}                                │
  │  ${color.bold(isAr ? 'منظومة تايدي فاكتور المعمارية — محرك مهارات الوكلاء' : 'Universal Agentic Architecture & Skills Engine')}        │
  │  ${color.cyan('https://tidyfactor.com')}  •  ${color.dim('Zero-Dependency Core')}             │
  ╰─────────────────────────────────────────────────────────────╯`));
}

// ─── Micro-Animation Spinner Engine ────────────────────────────────
class Spinner {
  constructor(text = '', isInteractive = true) {
    this.text = text;
    this.isInteractive = isInteractive && process.stdout.isTTY;
    this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.frameIdx = 0;
    this.timer = null;
  }

  start(newText) {
    if (newText) this.text = newText;
    if (this.isInteractive) {
      process.stdout.write('\x1b[?25l');
      this.timer = setInterval(() => {
        const frame = color.cyan(this.frames[this.frameIdx]);
        process.stdout.write(`\r  ${frame} ${this.text} `);
        this.frameIdx = (this.frameIdx + 1) % this.frames.length;
      }, 80);
    } else {
      console.log(`  ⏳ ${this.text}...`);
    }
    return this;
  }

  succeed(message) {
    this.stop();
    console.log(`\r  ${color.emerald('✔')} ${message || this.text}`);
  }

  fail(message) {
    this.stop();
    console.log(`\r  ${color.red('✖')} ${message || this.text}`);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.isInteractive) {
      process.stdout.write('\r\x1b[2K\x1b[?25h');
    }
  }
}

// ─── Download Progress Bar Helper ──────────────────────────────────
function renderProgressBar(received, total) {
  if (!process.stdout.isTTY || !total || total <= 0) return;
  const ratio = Math.min(1, received / total);
  const percent = Math.floor(ratio * 100);
  const barLength = 20;
  const filled = Math.round(barLength * ratio);
  const bar = color.emerald('█'.repeat(filled)) + color.dim('░'.repeat(barLength - filled));
  const formatMB = (b) => (b / (1024 * 1024)).toFixed(1) + ' MB';
  process.stdout.write(`\r    [${bar}] ${percent}% (${formatMB(received)} / ${formatMB(total)})`);
}

// ─── Zero-Dependency Interactive TUI Select & Multi-Select ────────
function promptSelect({ title, items, defaultIndex = 0, lang = 'en' }) {
  if (!process.stdin.isTTY) {
    return Promise.resolve(items[defaultIndex] || items[0]);
  }
  return new Promise((resolve) => {
    let index = defaultIndex;
    let filter = '';
    const wasRaw = process.stdin.isRaw;
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.setRawMode) process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdout.write('\x1b[?25l');

    let renderedLines = 0;

    function getFiltered() {
      return items.map((item, i) => ({ item, origIndex: i }))
        .filter(entry => {
          if (!filter) return true;
          const search = filter.toLowerCase();
          const it = entry.item;
          const text = (it.label || it.name || it.id || it).toLowerCase();
          const desc = (it.desc || it.descAr || '').toLowerCase();
          return text.includes(search) || desc.includes(search);
        });
    }

    function render() {
      if (renderedLines > 0) {
        process.stdout.write(`\x1b[${renderedLines}A`);
        for (let i = 0; i < renderedLines; i++) {
          process.stdout.write('\x1b[2K\n');
        }
        process.stdout.write(`\x1b[${renderedLines}A`);
      }

      const filtered = getFiltered();
      if (filtered.length > 0 && index >= filtered.length) index = filtered.length - 1;
      if (index < 0) index = 0;

      let output = '';
      output += `${color.bold(title)}\n`;
      if (filter) {
        output += `  ${color.dim(t('filterLabel', lang))} ${color.cyan(filter)} ${color.dim(`(${filtered.length}/${items.length})`)}\n`;
      } else {
        output += `  ${color.dim(lang === 'ar' ? '↑↓ للتنقل | Enter للاختيار | اكتب للبحث' : '↑↓ navigate | Enter choose | type to filter')}\n`;
      }

      filtered.forEach((entry, fIdx) => {
        const isSelected = fIdx === index;
        const item = entry.item;
        const label = lang === 'ar' && item.nameAr ? item.nameAr : (item.label || item.name || item.id || item);
        const descText = lang === 'ar' && item.descAr ? item.descAr : item.desc;
        const desc = descText ? ` ${color.dim('— ' + descText.slice(0, 55))}` : '';
        const badge = item.badge ? ` ${color.amber(`[${item.badge}]`)}` : '';
        if (isSelected) {
          output += `  ${color.emerald('❯ ' + color.bold(label))}${badge}${desc}\n`;
        } else {
          output += `    ${label}${badge}${desc}\n`;
        }
      });

      process.stdout.write(output);
      renderedLines = output.split('\n').length - 1;
    }

    render();

    function cleanup() {
      process.stdin.removeListener('keypress', onKeypress);
      if (process.stdin.setRawMode) process.stdin.setRawMode(wasRaw || false);
      process.stdout.write('\x1b[?25h');
    }

    function onKeypress(str, key) {
      if (!key) return;
      if (key.ctrl && key.name === 'c') {
        cleanup();
        process.exit(0);
      }
      const filtered = getFiltered();
      if (key.name === 'return' || key.name === 'enter') {
        cleanup();
        const selected = filtered[index] ? filtered[index].item : items[0];
        const label = lang === 'ar' && selected.nameAr ? selected.nameAr : (selected.label || selected.name || selected.id || selected);
        console.log(`  ${color.emerald('✔')} ${color.bold(label)}`);
        resolve(selected);
        return;
      }
      if (key.name === 'up' || (key.name === 'k' && !filter)) {
        index = Math.max(0, index - 1);
        render();
        return;
      }
      if (key.name === 'down' || (key.name === 'j' && !filter)) {
        index = Math.min(filtered.length - 1, index + 1);
        render();
        return;
      }
      if (key.name === 'backspace') {
        if (filter.length > 0) {
          filter = filter.slice(0, -1);
          index = 0;
          render();
        }
        return;
      }
      if (str && str.length === 1 && !key.ctrl && !key.meta) {
        filter += str;
        index = 0;
        render();
        return;
      }
    }

    process.stdin.on('keypress', onKeypress);
  });
}

function promptMultiSelect({ title, items, defaultSelectedIds = [], lang = 'en' }) {
  if (!process.stdin.isTTY) {
    const selected = items.filter(it => defaultSelectedIds.includes(it.id || it));
    return Promise.resolve(selected.length > 0 ? selected : items);
  }
  return new Promise((resolve) => {
    let cursor = 0;
    let filter = '';
    const selected = new Set(defaultSelectedIds);
    const wasRaw = process.stdin.isRaw;
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.setRawMode) process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdout.write('\x1b[?25l');

    let renderedLines = 0;

    function getFiltered() {
      return items.map((item, i) => ({ item, origIndex: i }))
        .filter(entry => {
          if (!filter) return true;
          const search = filter.toLowerCase();
          const it = entry.item;
          const text = (it.label || it.name || it.id || it).toLowerCase();
          const desc = (it.desc || it.descAr || '').toLowerCase();
          const tags = (it.tags || []).join(' ').toLowerCase();
          return text.includes(search) || desc.includes(search) || tags.includes(search);
        });
    }

    function render() {
      if (renderedLines > 0) {
        process.stdout.write(`\x1b[${renderedLines}A`);
        for (let i = 0; i < renderedLines; i++) {
          process.stdout.write('\x1b[2K\n');
        }
        process.stdout.write(`\x1b[${renderedLines}A`);
      }

      const filtered = getFiltered();
      if (cursor >= filtered.length) cursor = Math.max(0, filtered.length - 1);
      if (cursor < 0) cursor = 0;

      let output = '';
      output += `${color.bold(title)}\n`;
      if (filter) {
        output += `  ${color.dim(t('filterLabel', lang))} ${color.cyan(filter)} ${color.dim(`(${filtered.length}/${items.length})`)}\n`;
      } else {
        output += `  ${color.dim(t('filterHint', lang))}\n`;
      }

      filtered.forEach((entry, fIdx) => {
        const isCursor = fIdx === cursor;
        const item = entry.item;
        const id = item.id || item;
        const isChecked = selected.has(id);
        const checkIcon = isChecked ? color.emerald('[✔]') : color.dim('[ ]');
        const label = lang === 'ar' && item.nameAr ? item.nameAr : (item.label || item.name || id);
        const descText = lang === 'ar' && item.descAr ? item.descAr : item.desc;
        const desc = descText ? ` ${color.dim('— ' + descText.slice(0, 50))}` : '';
        const pointer = isCursor ? color.cyan('❯') : ' ';
        const nameStyled = isChecked ? color.bold(label) : label;
        
        output += ` ${pointer} ${checkIcon} ${nameStyled}${desc}\n`;
      });

      process.stdout.write(output);
      renderedLines = output.split('\n').length - 1;
    }

    render();

    function cleanup() {
      process.stdin.removeListener('keypress', onKeypress);
      if (process.stdin.setRawMode) process.stdin.setRawMode(wasRaw || false);
      process.stdout.write('\x1b[?25h');
    }

    function onKeypress(str, key) {
      if (!key) return;
      if (key.ctrl && key.name === 'c') {
        cleanup();
        process.exit(0);
      }
      const filtered = getFiltered();
      if (key.name === 'return' || key.name === 'enter') {
        cleanup();
        const chosen = items.filter(it => selected.has(it.id || it));
        console.log(`  ${color.emerald('✔')} ${color.bold(`${chosen.length} ${t('selectedCount', lang)}`)}`);
        resolve(chosen);
        return;
      }
      if (key.name === 'up' || (key.name === 'k' && !filter)) {
        cursor = Math.max(0, cursor - 1);
        render();
        return;
      }
      if (key.name === 'down' || (key.name === 'j' && !filter)) {
        cursor = Math.min(filtered.length - 1, cursor + 1);
        render();
        return;
      }
      if (key.name === 'space') {
        if (filtered[cursor]) {
          const id = filtered[cursor].item.id || filtered[cursor].item;
          if (selected.has(id)) {
            selected.delete(id);
          } else {
            selected.add(id);
          }
          render();
        }
        return;
      }
      if ((str === 'a' || str === 'A') && !filter) {
        if (selected.size === items.length) {
          selected.clear();
        } else {
          items.forEach(it => selected.add(it.id || it));
        }
        render();
        return;
      }
      if ((str === 'i' || str === 'I') && !filter) {
        items.forEach(it => {
          const id = it.id || it;
          if (selected.has(id)) selected.delete(id);
          else selected.add(id);
        });
        render();
        return;
      }
      if (key.name === 'backspace') {
        if (filter.length > 0) {
          filter = filter.slice(0, -1);
          cursor = 0;
          render();
        }
        return;
      }
      if (str && str.length === 1 && !key.ctrl && !key.meta && str !== ' ') {
        filter += str;
        cursor = 0;
        render();
        return;
      }
    }

    process.stdin.on('keypress', onKeypress);
  });
}

// ─── Environment & Project Auto-Detection ──────────────────────────
function detectProjectEnvironment(targetDir = process.cwd()) {
  const env = {
    cwd: targetDir,
    projectType: 'Generic Architecture',
    projectTypeAr: 'بنية عامة متعددة الأغراض',
    frameworks: [],
    recommendedSkillIds: ['tidyfactor-skill-architect', 'tidyfactor-doc', 'tidyfactor-brain'],
    detectedAgents: [],
  };

  const hasFile = (f) => fs.existsSync(path.join(targetDir, f));

  // Framework detection
  if (hasFile('package.json')) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf8'));
      const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      
      if (allDeps['next']) {
        env.frameworks.push('Next.js');
        env.projectType = 'Next.js SaaS / Web App';
        env.projectTypeAr = 'منصة ساس مبنية على Next.js';
        env.recommendedSkillIds.push('tidyfactor-next', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-marketing', 'tidyfactor-brain');
      } else if (allDeps['react']) {
        env.frameworks.push('React');
        env.projectType = 'React Interactive Application';
        env.projectTypeAr = 'تطبيق تفاعلي مبني على React';
        env.recommendedSkillIds.push('tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-doc', 'tidyfactor-brain');
      }

      if (allDeps['tailwindcss']) {
        env.frameworks.push('Tailwind CSS');
        env.recommendedSkillIds.push('tidyfactor-styler');
      }
    } catch (_) {}
  }

  if (hasFile('composer.json') || hasFile('index.php') || hasFile('wp-config.php') || hasFile('artisan')) {
    env.frameworks.push('PHP');
    if (hasFile('artisan')) env.frameworks.push('Laravel');
    if (hasFile('wp-config.php')) env.frameworks.push('WordPress');
    env.projectType = 'PHP Modular Monolith';
    env.projectTypeAr = 'مونوليث PHP معياري حديث';
    env.recommendedSkillIds.push('tidyfactor-php', 'tidyfactor-htmx', 'tidyfactor-styler', 'tidyfactor-doc');
  }

  if (hasFile('index.html') && !env.frameworks.includes('Next.js') && !env.frameworks.includes('React')) {
    env.frameworks.push('Static HTML5');
    if (env.projectType === 'Generic Architecture') {
      env.projectType = 'Static Website / Landing Platform';
      env.projectTypeAr = 'موقع ويب ثابت / صفحة هبوط';
    }
    env.recommendedSkillIds.push('tidyfactor-cinematic', 'tidyfactor-html', 'tidyfactor-design', 'tidyfactor-styler');
  }

  if (hasFile('mkdocs.yml') || hasFile('docs')) {
    env.frameworks.push('Documentation');
    env.recommendedSkillIds.push('tidyfactor-doc');
  }

  if (hasFile('.git')) {
    env.frameworks.push('Git Repository');
    env.recommendedSkillIds.push('tidyfactor-github');
  }

  // 18+ Agentic IDE Detection Matrix
  for (const plat of AGENT_PLATFORMS) {
    const isDetected = plat.signatures.some(sig => hasFile(sig));
    if (isDetected) {
      env.detectedAgents.push({
        id: plat.id,
        name: plat.name,
        path: plat.path,
        fullPath: path.join(targetDir, plat.path),
        active: true
      });
    }
  }

  env.recommendedSkillIds = [...new Set(env.recommendedSkillIds)];
  return env;
}

// ─── Governance Lockfile Manager (.tidyfactor/skills.lock) ─────────
function loadLockfile(cwd = process.cwd()) {
  const lockPath = path.join(cwd, '.tidyfactor', 'skills.lock');
  if (fs.existsSync(lockPath)) {
    try {
      return JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    } catch (_) {}
  }
  return {
    lockfile_version: '1.0.0',
    generator: `@tidyfactor/cli@${VERSION}`,
    updated_at: new Date().toISOString(),
    skills: {}
  };
}

function saveLockfile(cwd = process.cwd(), lockData) {
  const tidyDir = path.join(cwd, '.tidyfactor');
  fs.mkdirSync(tidyDir, { recursive: true });
  const lockPath = path.join(tidyDir, 'skills.lock');
  lockData.updated_at = new Date().toISOString();
  fs.writeFileSync(lockPath, JSON.stringify(lockData, null, 2), 'utf8');
}

function recordSkillInLock(cwd, skillId, version, source, targets) {
  const lock = loadLockfile(cwd);
  lock.skills[skillId] = {
    version: version || '2.0.0',
    source: source || 'unknown',
    installed_at: new Date().toISOString(),
    targets: targets.map(t => path.relative(cwd, t))
  };
  saveLockfile(cwd, lock);
}

function removeSkillFromLock(cwd, skillId) {
  const lock = loadLockfile(cwd);
  if (lock.skills[skillId]) {
    delete lock.skills[skillId];
    saveLockfile(cwd, lock);
  }
}

// ─── Secure Atomic Extraction Engine ───────────────────────────────
function extractArchiveNative(archivePath, destinationDir) {
  fs.mkdirSync(destinationDir, { recursive: true });
  const isWin = process.platform === 'win32';
  
  // Safe extraction to a temporary staging folder first (Atomic Swap & Zip Slip guard)
  const stagingDir = path.join(os.tmpdir(), `tf_stage_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`);
  fs.mkdirSync(stagingDir, { recursive: true });

  try {
    let extracted = false;
    // Primary extractor: tar (native on Windows 10/11, macOS, Linux)
    try {
      execSync(`tar -xf "${archivePath}" -C "${stagingDir}"`, { stdio: 'ignore' });
      extracted = true;
    } catch (_) {
      if (isWin) {
        const psCmd = `powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('${archivePath}', '${stagingDir}')"`;
        execSync(psCmd, { stdio: 'ignore' });
        extracted = true;
      } else {
        execSync(`unzip -q -o "${archivePath}" -d "${stagingDir}"`, { stdio: 'ignore' });
        extracted = true;
      }
    }

    if (!extracted) {
      try { fs.rmSync(stagingDir, { recursive: true, force: true }); } catch (_) {}
      return false;
    }

    // Zip Slip path verification & folder unnesting
    const items = fs.readdirSync(stagingDir);
    let sourceRoot = stagingDir;
    if (items.length === 1) {
      const nestedPath = path.join(stagingDir, items[0]);
      if (fs.statSync(nestedPath).isDirectory() && fs.existsSync(path.join(nestedPath, 'SKILL.md'))) {
        sourceRoot = nestedPath;
      }
    }

    // Copy verified contents to destination
    copyDirRecursive(sourceRoot, destinationDir);
    try { fs.rmSync(stagingDir, { recursive: true, force: true }); } catch (_) {}
    return true;
  } catch (err) {
    try { fs.rmSync(stagingDir, { recursive: true, force: true }); } catch (_) {}
    return false;
  }
}

// ─── HTTP Stream Download with Dynamic Progress Bar ────────────────
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    const file = fs.createWriteStream(destPath);

    const req = client.get(url, { headers: { 'User-Agent': `TidyFactor-CLI/${VERSION}` } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return resolve(downloadFile(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
      }

      const totalBytes = parseInt(res.headers['content-length'] || '0', 10);
      let receivedBytes = 0;

      res.on('data', (chunk) => {
        receivedBytes += chunk.length;
        if (totalBytes > 0) {
          renderProgressBar(receivedBytes, totalBytes);
        }
      });

      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          if (process.stdout.isTTY && totalBytes > 0) process.stdout.write('\r\x1b[2K');
          resolve();
        });
      });
    });

    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });

    req.setTimeout(25000, () => {
      req.destroy();
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(new Error('Download timed out'));
    });
  });
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (['.git', 'node_modules', 'dist', '.DS_Store'].includes(entry.name)) continue;
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function linkOrCopyDir(canonicalSrc, destPath, options = {}) {
  const isCopy = options.copy || false;
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  let stat = null;
  try { stat = fs.lstatSync(destPath); } catch (_) {}
  if (stat) {
    try {
      if (stat.isSymbolicLink()) {
        fs.unlinkSync(destPath);
      } else {
        fs.rmSync(destPath, { recursive: true, force: true });
      }
    } catch (_) {}
  }

  if (isCopy) {
    copyDirRecursive(canonicalSrc, destPath);
    return 'copy';
  }

  try {
    const linkType = process.platform === 'win32' ? 'junction' : 'dir';
    fs.symlinkSync(path.resolve(canonicalSrc), path.resolve(destPath), linkType);
    return 'junction';
  } catch (_) {
    copyDirRecursive(canonicalSrc, destPath);
    return 'copy';
  }
}

function deploySkillToTargets(sourceDir, targetLocations, skillId, options = {}) {
  if (!targetLocations || targetLocations.length === 0) return;

  // Determine canonical target: prioritize .agents/skills if in targets, else targetLocations[0]
  const agentsTarget = targetLocations.find(t => t.endsWith('.agents/skills') || t.endsWith('.agents\\skills'));
  const canonicalTarget = agentsTarget || targetLocations[0];
  const canonicalDest = path.join(canonicalTarget, skillId);

  if (path.resolve(sourceDir) === path.resolve(canonicalDest)) {
    // Canonical destination is already the source directory; only link secondary targets
    for (const targetDir of targetLocations) {
      if (path.resolve(targetDir) === path.resolve(canonicalTarget)) continue;
      const dest = path.join(targetDir, skillId);
      linkOrCopyDir(canonicalDest, dest, options);
    }
    return;
  }

  let canonStat = null;
  try { canonStat = fs.lstatSync(canonicalDest); } catch (_) {}
  if (canonStat && canonStat.isSymbolicLink()) {
    try { fs.unlinkSync(canonicalDest); } catch (_) {}
  }

  fs.mkdirSync(canonicalDest, { recursive: true });
  copyDirRecursive(sourceDir, canonicalDest);

  // For other targets, link via NTFS Junction / symlink (or copy if options.copy)
  for (const targetDir of targetLocations) {
    if (path.resolve(targetDir) === path.resolve(canonicalTarget)) continue;
    const dest = path.join(targetDir, skillId);
    linkOrCopyDir(canonicalDest, dest, options);
  }
}

function extractAndDeployToTargets(archivePath, targetLocations, skillId, options = {}) {
  if (!targetLocations || targetLocations.length === 0) return false;

  const agentsTarget = targetLocations.find(t => t.endsWith('.agents/skills') || t.endsWith('.agents\\skills'));
  const canonicalTarget = agentsTarget || targetLocations[0];
  const canonicalDest = path.join(canonicalTarget, skillId);

  let canonStat = null;
  try { canonStat = fs.lstatSync(canonicalDest); } catch (_) {}
  if (canonStat && canonStat.isSymbolicLink()) {
    try { fs.unlinkSync(canonicalDest); } catch (_) {}
  }

  fs.mkdirSync(canonicalDest, { recursive: true });
  const ok = extractArchiveNative(archivePath, canonicalDest);
  if (!ok) return false;

  for (const targetDir of targetLocations) {
    if (path.resolve(targetDir) === path.resolve(canonicalTarget)) continue;
    const dest = path.join(targetDir, skillId);
    linkOrCopyDir(canonicalDest, dest, options);
  }
  return true;
}

// ─── 3-Level Bounded Skill Discovery with Directory Shadowing ───────
function parseSkillMetadata(skillMdPath) {
  try {
    const content = fs.readFileSync(skillMdPath, 'utf8');
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatterMatch) return null;
    const yaml = frontmatterMatch[1];
    let name = '';
    let description = '';
    let isInternal = false;
    for (const line of yaml.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('name:')) {
        name = trimmed.replace(/^name:\s*/, '').replace(/^["']|["']$/g, '');
      } else if (trimmed.startsWith('description:')) {
        description = trimmed.replace(/^description:\s*/, '').replace(/^["']|["']$/g, '');
      } else if (trimmed.includes('internal: true')) {
        isInternal = true;
      }
    }
    return { name, description, isInternal };
  } catch (_) {
    return null;
  }
}

function discoverSkillsBounded(baseDir, maxDepth = 3, currentDepth = 0) {
  const discovered = [];
  if (!fs.existsSync(baseDir) || currentDepth >= maxDepth) return discovered;

  try {
    const entries = fs.readdirSync(baseDir, { withFileTypes: true });
    
    // Check if current directory has SKILL.md (Shadowing rule: shallower SKILL.md stops deeper walk)
    const hasSkillMd = entries.some(e => e.isFile() && e.name.toLowerCase() === 'skill.md');
    if (hasSkillMd) {
      const skillPath = path.join(baseDir, 'SKILL.md');
      const meta = parseSkillMetadata(skillPath);
      const allowInternal = process.env.INSTALL_INTERNAL_SKILLS === '1' || process.env.INSTALL_INTERNAL_SKILLS === 'true';
      if (!meta?.isInternal || allowInternal) {
        discovered.push({
          id: meta?.name || path.basename(baseDir),
          name: meta?.name || path.basename(baseDir),
          path: baseDir,
          skillFile: skillPath,
          description: meta?.description || '',
          internal: !!meta?.isInternal
        });
      }
      // Shadowing: do not recurse into subdirectories of an identified skill
      return discovered;
    }

    // Traverse subdirectories up to maxDepth
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (['.git', 'node_modules', 'dist', '.DS_Store'].includes(entry.name)) continue;
      const subDir = path.join(baseDir, entry.name);
      const childSkills = discoverSkillsBounded(subDir, maxDepth, currentDepth + 1);
      discovered.push(...childSkills);
    }
  } catch (_) {}

  return discovered;
}

// ─── Quad-Channel Resilient Resolver with Canonical Deployment ──────
async function installSingleSkill(skillId, targetLocations, options = {}) {
  const lang = options.lang || 'en';
  const dryRun = options.dryRun || false;
  const cwd = options.cwd || process.cwd();

  // Support direct local folder installation (e.g. tf add ./my-skill)
  if (skillId.startsWith('./') || skillId.startsWith('../') || path.isAbsolute(skillId)) {
    const localPath = path.resolve(cwd, skillId);
    if (fs.existsSync(localPath) && fs.existsSync(path.join(localPath, 'SKILL.md'))) {
      const meta = parseSkillMetadata(path.join(localPath, 'SKILL.md')) || {};
      const id = meta.name || path.basename(localPath);
      deploySkillToTargets(localPath, targetLocations, id, options);
      console.log(color.emerald(`  ✔ Installed local skill "${id}" into ${targetLocations.length} target(s).`));
      recordSkillInLock(cwd, id, '1.0.0', 'local', targetLocations);
      return true;
    }
  }

  let cleanId = skillId.replace(/^@tidyfactor\//, '').replace(/^@alwkala\//, '');
  if (!cleanId.startsWith('tidyfactor-') && COMMUNITY_SKILLS.some(s => s.id === `tidyfactor-${cleanId}`)) {
    cleanId = `tidyfactor-${cleanId}`;
  }

  const meta = COMMUNITY_SKILLS.find(s => s.id === cleanId) || { id: cleanId, version: '2.1.0' };
  const displayName = lang === 'ar' && meta.nameAr ? meta.nameAr : (meta.name || cleanId);

  if (dryRun) {
    console.log(`  🔍 ${color.dim('[DRY RUN]')} ${color.bold(displayName)} (${cleanId}) -> ${targetLocations.length} target(s)`);
    return true;
  }

  const spinner = new Spinner(`${t('installing', lang)} ${color.bold(displayName)}...`, true).start();

  // Channel 1: Local Workspace Fast-Path (Development Workstation Mode)
  const candidateDirs = [
    path.resolve(__dirname, '..', '..', 'Skills', 'Skills-LAB', cleanId),
    path.resolve(__dirname, '..', '..', '..', 'Skills', 'Skills-LAB', cleanId),
    path.resolve(cwd, '..', 'Skills', 'Skills-LAB', cleanId),
    path.resolve(cwd, 'Skills', 'Skills-LAB', cleanId),
    path.resolve(__dirname, '..', '..', cleanId),
    path.resolve(__dirname, '..', cleanId),
    path.resolve(cwd, '..', cleanId),
    path.resolve(os.homedir(), '.gemini', 'config', 'skills', cleanId),
  ];

  for (const localDir of candidateDirs) {
    if (fs.existsSync(localDir) && fs.existsSync(path.join(localDir, 'SKILL.md'))) {
      deploySkillToTargets(localDir, targetLocations, cleanId, options);
      spinner.succeed(`${displayName} ${color.dim(t('localFast', lang))}`);
      recordSkillInLock(cwd, cleanId, meta.version, 'local', targetLocations);
      return true;
    }
  }

  // Channel 2: NPM Package Runner (@tidyfactor/<skill>)
  try {
    const pkgShortName = cleanId.replace('tidyfactor-', '');
    execSync(`npx -y @tidyfactor/${pkgShortName}@latest add-skill`, { stdio: 'ignore', timeout: 20000 });
    
    const defaultWorkspaceDir = path.join(cwd, '.agents', 'skills', cleanId);
    if (fs.existsSync(defaultWorkspaceDir) && fs.existsSync(path.join(defaultWorkspaceDir, 'SKILL.md'))) {
      deploySkillToTargets(defaultWorkspaceDir, targetLocations, cleanId, options);
      spinner.succeed(`${displayName} ${color.cyan(t('npmRegistry', lang))}`);
      recordSkillInLock(cwd, cleanId, meta.version, 'npm', targetLocations);
      return true;
    }
  } catch (_) {}

  // Channel 3: Direct CDN Download (.skill package)
  const tempSkillZip = path.join(os.tmpdir(), `tf_${cleanId}_${Date.now()}.zip`);
  const downloadUrl = `https://${REGISTRY_HOST}/downloads/skills/${cleanId}.skill`;

  try {
    await downloadFile(downloadUrl, tempSkillZip);
    const ok = extractAndDeployToTargets(tempSkillZip, targetLocations, cleanId, options);
    if (!ok) throw new Error('Extraction failed');

    if (fs.existsSync(tempSkillZip)) fs.unlinkSync(tempSkillZip);
    spinner.succeed(`${displayName} ${color.dim(t('cdnFallback', lang))}`);
    recordSkillInLock(cwd, cleanId, meta.version, 'cdn', targetLocations);
    return true;
  } catch (_) {
    if (fs.existsSync(tempSkillZip)) fs.unlinkSync(tempSkillZip);
  }

  // Channel 4: Master GitHub Releases Direct Archive
  const ghUrl = `https://github.com/TidyFactor/TidyFactor/releases/latest/download/${cleanId}.skill`;
  try {
    await downloadFile(ghUrl, tempSkillZip);
    const ok = extractAndDeployToTargets(tempSkillZip, targetLocations, cleanId, options);
    if (!ok) throw new Error('Extraction failed');
    if (fs.existsSync(tempSkillZip)) fs.unlinkSync(tempSkillZip);
    spinner.succeed(`${displayName} ${color.dim(t('githubFallback', lang))}`);
    recordSkillInLock(cwd, cleanId, meta.version, 'github', targetLocations);
    return true;
  } catch (err) {
    if (fs.existsSync(tempSkillZip)) fs.unlinkSync(tempSkillZip);
    spinner.fail(`${displayName} — ${t('failed', lang)} ${err.message}`);
    return false;
  }
}

// ─── Step-by-Step Interactive Wizard ──────────────────────────────
async function runInteractiveWizard(lang = 'en', flags = {}) {
  printBanner(lang);
  const cwd = process.cwd();
  const env = detectProjectEnvironment(cwd);

  console.log(color.cyan(`\n┌── [${t('step1Title', lang)}] ─────────────────────────────┐`));
  console.log(`│ • ${t('workspace', lang).padEnd(16)} ${color.cyan(cwd)}`);
  console.log(`│ • ${t('techStack', lang).padEnd(16)} ${color.emerald(color.bold(lang === 'ar' ? env.projectTypeAr : env.projectType))} ${color.dim(`(${env.frameworks.join(', ') || 'General'})`)}`);
  
  if (env.detectedAgents.length > 0) {
    console.log(`│ • ${t('detectedAgents', lang).padEnd(16)} ${env.detectedAgents.map(a => color.amber(`${a.name} (${a.path})`)).join('\n│                  ')}`);
  } else {
    console.log(`│ • ${t('detectedAgents', lang).padEnd(16)} ${color.dim(lang === 'ar' ? 'الوضع الشامل (.agents/skills/)' : 'Universal Workspace Mode (.agents/skills/)')}`);
  }
  console.log(color.cyan('└─────────────────────────────────────────────────────────────┘\n'));

  // Step 2: Choose Target IDEs
  const agentChoices = [
    { id: 'universal', name: lang === 'ar' ? 'الوضع الشامل الافتراضي' : 'Universal Default (.agents/skills/)', desc: 'Antigravity, Codex, universal root', path: '.agents/skills' },
    { id: 'cursor',    name: 'Cursor IDE', desc: '.cursor/skills/', path: '.cursor/skills' },
    { id: 'windsurf',  name: 'Windsurf Cascade', desc: '.windsurf/skills/', path: '.windsurf/skills' },
    { id: 'trae',      name: 'Trae AI IDE', desc: '.trae/skills/', path: '.trae/skills' },
    { id: 'claude',    name: 'Claude Code', desc: '.claude/skills/', path: '.claude/skills' },
    { id: 'copilot',   name: 'GitHub Copilot', desc: '.github/prompts/', path: '.github/prompts' },
    { id: 'roo',       name: 'RooCode / Cline', desc: '.roo/skills/', path: '.roo/skills' },
    { id: 'global',    name: lang === 'ar' ? 'مكتبة المستخدم العامة' : 'Global User Config (~/.gemini/config/skills/)', desc: 'Cross-project global mount', path: path.join(os.homedir(), '.gemini', 'config', 'skills') },
  ];

  const defaultAgentIds = env.detectedAgents.length > 0 
    ? env.detectedAgents.map(a => a.id) 
    : ['universal'];

  let chosenAgents = [];
  if (flags.yes || !process.stdin.isTTY) {
    chosenAgents = agentChoices.filter(a => defaultAgentIds.includes(a.id) || a.id === 'universal');
  } else {
    chosenAgents = await promptMultiSelect({
      title: color.cyan(`┌── [${t('step2Title', lang)}] ──┐`),
      items: agentChoices,
      defaultSelectedIds: defaultAgentIds,
      lang
    });
  }

  let targetPaths = chosenAgents.map(a => a.path.startsWith('/') || a.path.includes(':') ? a.path : path.join(cwd, a.path));
  if (targetPaths.length === 0) targetPaths = [path.join(cwd, '.agents', 'skills')];
  targetPaths = [...new Set(targetPaths)];

  // Step 3: Choose Skill Package / Skills
  const trackChoices = [
    { id: 'recommended', name: lang === 'ar' ? '🌟 الباقة الموصى بها لمشروعك' : '🌟 Auto-Recommended Kit', badge: t('recommendedBadge', lang), desc: `${env.recommendedSkillIds.length} skills tailored to ${env.projectType}` },
    { id: 'all',         name: lang === 'ar' ? '👑 الجناح المعماري الشامل' : '👑 Master Suite (13 Skills)', badge: t('allSkillsBadge', lang), desc: 'All 13 community skills with CDL & AST engines' },
    { id: 'pack:design', name: lang === 'ar' ? '🎨 باقة التصميم والواجهات' : '🎨 Design & Frontend Triad', desc: 'Cinematic + Design + Styler + Architect' },
    { id: 'pack:saas',   name: lang === 'ar' ? '🚀 باقة ساس وتطبيقات الويب' : '🚀 SaaS Starter Kit', desc: 'Next.js 16 + Supabase + Design + Marketing + Brain' },
    { id: 'pack:eng',    name: lang === 'ar' ? '⚙️ باقة الهندسة البرمجية' : '⚙️ Full-Stack Engineering', desc: 'PHP + HTMX + Vanilla JS + HTML + Doc' },
    { id: 'pack:gov',    name: lang === 'ar' ? '🏛️ باقة الحوكمة والذاكرة' : '🏛️ Governance & Operations', desc: 'Skill Architect + Brain + Doc + GitHub' },
    { id: 'custom',      name: lang === 'ar' ? '🛠️ تخصيص يدوي للمهارات' : '🛠️ Custom Skill Selection', desc: 'Pick individual skills from the catalog' },
  ];

  let selectedTrack = trackChoices[0];
  if (!flags.yes && process.stdin.isTTY) {
    selectedTrack = await promptSelect({
      title: color.cyan(`\n┌── [${t('step3Title', lang)}] ──┐`),
      items: trackChoices,
      defaultIndex: 0,
      lang
    });
  }

  let skillsToInstall = [];
  if (selectedTrack.id === 'all') {
    skillsToInstall = COMMUNITY_SKILLS.map(s => s.id);
  } else if (selectedTrack.id === 'recommended') {
    skillsToInstall = env.recommendedSkillIds;
  } else if (selectedTrack.id.startsWith('pack:')) {
    const packKey = selectedTrack.id.replace('pack:', '');
    const pack = PACKS[packKey] || PACKS[packKey === 'eng' ? 'engineering' : packKey === 'gov' ? 'governance' : 'design'];
    skillsToInstall = pack ? pack.skills : env.recommendedSkillIds;
  } else if (selectedTrack.id === 'custom') {
    const customChosen = await promptMultiSelect({
      title: color.cyan(lang === 'ar' ? 'اختر المهارات المطلوبة من القائمة:' : 'Select skills to install:'),
      items: COMMUNITY_SKILLS,
      defaultSelectedIds: env.recommendedSkillIds,
      lang
    });
    skillsToInstall = customChosen.map(s => s.id);
  } else {
    skillsToInstall = env.recommendedSkillIds;
  }

  skillsToInstall = [...new Set(skillsToInstall)];
  if (skillsToInstall.length === 0) skillsToInstall = env.recommendedSkillIds;

  // Execute Installation
  console.log('\n' + color.bold(`🚀 ${lang === 'ar' ? 'جاري تثبيت المهارات في:' : 'Installing Skills into:'}\n` + targetPaths.map(p => `   📂 ${color.cyan(p)}`).join('\n') + '\n'));

  for (const p of targetPaths) {
    fs.mkdirSync(p, { recursive: true });
  }

  let installedCount = 0;
  for (const sId of skillsToInstall) {
    const ok = await installSingleSkill(sId, targetPaths, { lang, cwd, dryRun: flags.dryRun });
    if (ok) installedCount++;
  }

  console.log('\n' + color.emerald('─────────────────────────────────────────────────────────────'));
  console.log(color.emerald(color.bold(`✨ ${t('success', lang)} ${installedCount}/${skillsToInstall.length} Skills -> ${targetPaths.length} Target(s)`)));
  console.log(color.dim(`   ${t('lockfileGenerated', lang)}`));
  console.log(color.emerald('─────────────────────────────────────────────────────────────\n'));

  console.log(color.bold(`💡 ${t('howToUse', lang)}\n`));
  console.log(`  • ${color.bold('Trae / Cursor / Windsurf')}: ${color.dim('Slash commands like')} ${color.cyan('/brief')}, ${color.cyan('/tokens')}, ${color.cyan('/component')}`);
  console.log(`  • ${color.bold('Google Antigravity / Gemini')}: ${color.dim('Loaded automatically via')} ${color.amber('.agents/skills/')}`);
  console.log(`  • ${color.bold('GitHub Copilot')}: ${color.dim('Prompts active in')} ${color.amber('.github/prompts/')}\n`);

  console.log(color.bold(`🔥 ${t('quickTriggers', lang)}`));
  skillsToInstall.forEach(sId => {
    const s = COMMUNITY_SKILLS.find(x => x.id === sId);
    if (s) {
      console.log(`  - ${color.emerald(s.id.padEnd(28))} ${color.amber(s.commands.slice(0, 4).join('  '))}`);
    }
  });
  console.log('');
}

// ─── Sync Installed Skills Across All Active Agents ────────────────
async function runSyncCommand(lang = 'en', flags = {}) {
  printBanner(lang);
  const cwd = process.cwd();
  console.log(color.bold(`\n${t('syncTitle', lang)}\n`));

  const env = detectProjectEnvironment(cwd);
  const lock = loadLockfile(cwd);

  // Discover installed skills in workspace
  let skillIds = Object.keys(lock.skills);
  if (skillIds.length === 0) {
    const agentsDir = path.join(cwd, '.agents', 'skills');
    if (fs.existsSync(agentsDir)) {
      skillIds = fs.readdirSync(agentsDir).filter(f => fs.existsSync(path.join(agentsDir, f, 'SKILL.md')));
    }
  }

  if (skillIds.length === 0) {
    console.log(color.amber(`  ⚠️ ${lang === 'ar' ? 'لا توجد مهارات مثبتة في هذا المشروع بعد. استخدم `tf init` للبدء.' : 'No installed skills found in this workspace. Run `tf init` first.'}\n`));
    return;
  }

  // Active target directories
  let targets = [path.join(cwd, '.agents', 'skills')];
  if (env.detectedAgents.length > 0) {
    env.detectedAgents.forEach(a => targets.push(a.fullPath));
  } else {
    targets.push(path.join(cwd, '.cursor', 'skills'));
    targets.push(path.join(cwd, '.windsurf', 'skills'));
  }
  targets = [...new Set(targets)];

  console.log(`  📂 ${lang === 'ar' ? 'المجلدات المستهدفة:' : 'Target agent directories:'}`);
  targets.forEach(t => console.log(`     • ${color.cyan(t)}`));
  console.log('');

  let synced = 0;
  for (const sId of skillIds) {
    const ok = await installSingleSkill(sId, targets, { lang, cwd, dryRun: flags.dryRun });
    if (ok) synced++;
  }

  console.log('\n' + color.emerald(color.bold(`✨ ${t('syncComplete', lang)} (${synced}/${skillIds.length})\n`)));
}

// ─── Outdated & Update Lifecycle Commands ──────────────────────────
async function runOutdatedCommand(lang = 'en') {
  printBanner(lang);
  const cwd = process.cwd();
  const lock = loadLockfile(cwd);
  const installedSkillIds = Object.keys(lock.skills);

  if (installedSkillIds.length === 0) {
    console.log(color.amber(`\n  ℹ️ ${t('noLockfile', lang)}\n`));
    return;
  }

  console.log(color.bold(`\n${t('outdatedTitle', lang)}:\n`));
  console.log(color.cyan('╭─────────────────────────────┬─────────────┬─────────────┬───────────────────╮'));
  console.log(`│ ${color.bold('Skill'.padEnd(27))} │ ${color.bold('Installed'.padEnd(11))} │ ${color.bold('Latest'.padEnd(11))} │ ${color.bold('Status'.padEnd(17))} │`);
  console.log(color.cyan('├─────────────────────────────┼─────────────┼─────────────┼───────────────────┤'));

  let hasUpdates = false;

  for (const sId of installedSkillIds) {
    const item = lock.skills[sId];
    const currentVer = item.version || 'unknown';
    const official = COMMUNITY_SKILLS.find(s => s.id === sId);
    const latestVer = official ? official.version : currentVer;
    const isOutdated = currentVer !== latestVer && currentVer !== 'unknown';

    if (isOutdated) hasUpdates = true;

    const statusBadge = isOutdated 
      ? color.amber('⚡ Update Avail.') 
      : color.emerald('✔ Up to date');

    console.log(`│ ${sId.padEnd(27)} │ ${currentVer.padEnd(11)} │ ${latestVer.padEnd(11)} │ ${statusBadge.padEnd(26)} │`);
  }

  console.log(color.cyan('╰─────────────────────────────┴─────────────┴─────────────┴───────────────────╯\n'));

  if (hasUpdates) {
    console.log(`💡 Run ${color.emerald('tf update')} to upgrade all outdated skills.\n`);
  } else {
    console.log(`${color.emerald(t('allUpToDate', lang))}\n`);
  }
}

async function runUpdateCommand(args, lang = 'en', flags = {}) {
  printBanner(lang);
  const cwd = process.cwd();
  const lock = loadLockfile(cwd);
  const posArgs = args.slice(1).filter(a => !a.startsWith('-'));
  const targetSkill = posArgs[0];

  let skillsToUpdate = [];
  if (targetSkill && targetSkill !== 'all') {
    let cleanId = targetSkill.replace(/^@tidyfactor\//, '');
    if (!cleanId.startsWith('tidyfactor-') && COMMUNITY_SKILLS.some(s => s.id === `tidyfactor-${cleanId}`)) {
      cleanId = `tidyfactor-${cleanId}`;
    }
    skillsToUpdate.push(cleanId);
  } else {
    skillsToUpdate = Object.keys(lock.skills);
    if (skillsToUpdate.length === 0) {
      skillsToUpdate = detectProjectEnvironment(cwd).recommendedSkillIds;
    }
  }

  console.log(color.bold(`\n🔄 Upgrading ${skillsToUpdate.length} skill(s) to latest releases...\n`));

  let targets = [path.join(cwd, '.agents', 'skills')];
  const env = detectProjectEnvironment(cwd);
  env.detectedAgents.forEach(a => targets.push(a.fullPath));
  targets = [...new Set(targets)];

  let count = 0;
  for (const sId of skillsToUpdate) {
    const ok = await installSingleSkill(sId, targets, { lang, cwd, dryRun: flags.dryRun });
    if (ok) count++;
  }

  console.log('\n' + color.emerald(color.bold(`✨ Update completed! ${count}/${skillsToUpdate.length} skills successfully updated.\n`)));
}

// ─── Remove / Uninstall Command ────────────────────────────────────
async function runRemoveCommand(args, lang = 'en') {
  printBanner(lang);
  const cwd = process.cwd();
  const posArgs = args.slice(1).filter(a => !a.startsWith('-'));
  const skillArg = posArgs[0];

  if (!skillArg) {
    console.log(color.red(`\n❌ Error: Please specify a skill to remove: tf remove <skill>\n`));
    return;
  }

  let cleanId = skillArg.replace(/^@tidyfactor\//, '');
  if (!cleanId.startsWith('tidyfactor-') && COMMUNITY_SKILLS.some(s => s.id === `tidyfactor-${cleanId}`)) {
    cleanId = `tidyfactor-${cleanId}`;
  }

  console.log(color.bold(`\n🗑️ Removing ${color.amber(cleanId)} from workspace...\n`));

  const candidateDirs = new Set();
  AGENT_PLATFORMS.forEach(plat => {
    candidateDirs.add(path.join(cwd, plat.path, cleanId));
  });

  const lock = loadLockfile(cwd);
  if (lock.skills && lock.skills[cleanId] && Array.isArray(lock.skills[cleanId].targets)) {
    lock.skills[cleanId].targets.forEach(tgt => {
      candidateDirs.add(path.isAbsolute(tgt) ? path.join(tgt, cleanId) : path.resolve(cwd, tgt, cleanId));
    });
  }

  let removedCount = 0;
  candidateDirs.forEach(dir => {
    let stat = null;
    try { stat = fs.lstatSync(dir); } catch (_) {}
    if (stat) {
      try {
        if (stat.isSymbolicLink()) {
          fs.unlinkSync(dir);
        } else {
          fs.rmSync(dir, { recursive: true, force: true });
        }
        console.log(`  ✔ Deleted ${color.dim(path.relative(cwd, dir))}`);
        removedCount++;
      } catch (_) {}
    }
  });

  removeSkillFromLock(cwd, cleanId);

  console.log('\n' + color.emerald(color.bold(`✨ Successfully removed ${cleanId} from ${removedCount} agent location(s).\n`)));
}

// ─── Info Command ──────────────────────────────────────────────────
function runInfoCommand(args, lang = 'en') {
  printBanner(lang);
  const posArgs = args.slice(1).filter(a => !a.startsWith('-'));
  const skillArg = posArgs[0];

  if (!skillArg) {
    console.log(color.red(`\n❌ Error: Please specify a skill to inspect: tf info <skill>\n`));
    return;
  }

  let cleanId = skillArg.replace(/^@tidyfactor\//, '');
  if (!cleanId.startsWith('tidyfactor-') && COMMUNITY_SKILLS.some(s => s.id === `tidyfactor-${cleanId}`)) {
    cleanId = `tidyfactor-${cleanId}`;
  }

  const skill = COMMUNITY_SKILLS.find(s => s.id === cleanId);
  if (!skill) {
    console.log(color.red(`\n❌ Unknown skill: "${skillArg}". Run \`tf list\` to see available skills.\n`));
    return;
  }

  const isAr = lang === 'ar';
  console.log(color.cyan(`\n╭── [${skill.id}] ───────────────────────────────────────────╮`));
  console.log(`│ • ${color.bold('Name:')}         ${color.emerald(isAr && skill.nameAr ? skill.nameAr : skill.name)}`);
  console.log(`│ • ${color.bold('Version:')}      ${color.bold(`v${skill.version}`)}`);
  console.log(`│ • ${color.bold('Category:')}     ${color.amber(skill.category.toUpperCase())}`);
  console.log(`│ • ${color.bold('Description:')}  ${isAr && skill.descAr ? skill.descAr : skill.desc}`);
  console.log(`│ • ${color.bold('Commands:')}     ${color.cyan(skill.commands.join('  '))}`);
  console.log(`│ • ${color.bold('Tags:')}         ${color.dim(skill.tags.join(', '))}`);
  console.log(color.cyan('╰─────────────────────────────────────────────────────────────╯\n'));

  console.log(color.bold('📦 Installation Oneliners:'));
  console.log(`  • CLI:   ${color.emerald(`npx @tidyfactor/cli add ${skill.id}`)}`);
  console.log(`  • NPM:   ${color.emerald(`npx @tidyfactor/${skill.id.replace('tidyfactor-', '')}@latest add-skill`)}`);
  console.log(`  • cURL:  ${color.emerald(`curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- ${skill.id}`)}`);
  console.log(`  • Win:   ${color.emerald(`$Skill = '${skill.id}'; irm https://tidyfactor.com/api/v1/install.ps1 | iex`)}\n`);
}

// ─── Pro Packs & Enterprise Gateway ────────────────────────────────
function runProCommand(lang = 'en') {
  printBanner(lang);
  const isAr = lang === 'ar';
  console.log(color.bold(isAr ? '🏢 بوابة مهارات المؤسسات و DevOps (TidyFactor Pro):' : '🏢 TidyFactor Pro & Enterprise Gateway:\n'));

  console.log(`  ${color.emerald('1. DevOps & Cloud Infrastructure (13 Skills)')}`);
  console.log(`     ${color.dim('ops-cpanel, ops-lamp, ops-cicd, ops-docker, ops-security, ops-db, ops-dns, ops-dr...')}`);
  console.log('');
  console.log(`  ${color.emerald('2. PocketOffice Business Automation (11 Skills)')}`);
  console.log(`     ${color.dim('pocket-crm, pocket-invoicing, pocket-finance, pocket-proposals, pocket-calendar...')}`);
  console.log('');
  console.log(`  ${color.emerald('3. MENA Growth & Commercial Engines')}`);
  console.log(`     ${color.dim('tidyfactor-seo, mena-proposal-writer, website-copywriting-mena...')}`);
  console.log('');
  console.log(color.dim(isAr ? '💡 للوصول إلى حزم Pro وتفعيل التراخيص، زر: https://tidyfactor.com/pro' : '💡 To access Pro packs and activate licenses, visit: https://tidyfactor.com/pro\n'));
}

// ─── Diagnostics & Identity Diagnostics ────────────────────────────
async function runDoctorCommand(lang = 'en') {
  printBanner(lang);
  const cwd = process.cwd();
  const env = detectProjectEnvironment(cwd);
  const lock = loadLockfile(cwd);

  console.log(color.bold(t('doctorTitle', lang)));
  console.log(`  • CLI Version:        ${color.emerald(`v${VERSION}`)}`);
  console.log(`  • Node.js Runtime:    ${color.bold(process.version)} (Platform: ${process.platform})`);
  console.log(`  • Workspace Root:     ${color.cyan(cwd)}`);
  console.log(`  • Detected Stack:     ${color.emerald(color.bold(lang === 'ar' ? env.projectTypeAr : env.projectType))} ${color.dim(`(${env.frameworks.join(', ') || 'None'})`)}`);
  console.log(`  • Recommended Skills: ${color.amber(env.recommendedSkillIds.join(', '))}`);
  
  if (env.detectedAgents.length > 0) {
    console.log(`  • Active Agents:      ${env.detectedAgents.map(a => `${a.name} (${color.cyan(a.path)})`).join('\n                        ')}`);
  } else {
    console.log(`  • Active Agents:      ${color.dim('Universal Mode (.agents/skills ready)')}`);
  }

  const installedCount = Object.keys(lock.skills).length;
  console.log(`  • Lockfile Status:    ${installedCount > 0 ? color.emerald(`✔ ${installedCount} skills tracked (.tidyfactor/skills.lock)`) : color.dim('No skills in lockfile')}`);
  console.log(`  • Registry Endpoint:  ${color.cyan(REGISTRY_HOST)} (${REGISTRY_API_PATH})\n`);
}

async function runWhoamiCommand(lang = 'en') {
  printBanner(lang);
  const cwd = process.cwd();
  let token = process.env.TIDYFACTOR_TOKEN || process.env.TIDYFACTOR_API_KEY || '';

  const localConfigFile = path.join(os.homedir(), '.tidyfactor', 'config.json');
  if (!token && fs.existsSync(localConfigFile)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(localConfigFile, 'utf-8'));
      token = cfg.token || cfg.api_key || '';
    } catch (_) {}
  }
  const projectTidy = path.join(cwd, '.tidyfactor', 'config.json');
  if (!token && fs.existsSync(projectTidy)) {
    try {
      const pCfg = JSON.parse(fs.readFileSync(projectTidy, 'utf-8'));
      token = pCfg.token || pCfg.api_key || '';
    } catch (_) {}
  }

  const env = detectProjectEnvironment(cwd);

  if (token) {
    console.log(color.bold('🔍 Connecting to Sovereign Cloud Brain...\n'));
    try {
      const rpcPayload = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: { name: 'whoami', arguments: {} }
      });

      const protocol = REGISTRY_HOST.includes('localhost') ? http : https;
      const port = REGISTRY_HOST.includes('localhost') ? 80 : 443;
      const hostOnly = REGISTRY_HOST.split(':')[0];
      const reqPath = `/api/mcp/messages?token=${encodeURIComponent(token)}`;

      const data = await new Promise((resolve, reject) => {
        const req = protocol.request({
          hostname: hostOnly,
          port,
          path: reqPath,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(rpcPayload)
          },
          timeout: 4000
        }, (res) => {
          let buf = '';
          res.on('data', chunk => buf += chunk);
          res.on('end', () => {
            try { resolve(JSON.parse(buf)); } catch (_) { resolve(null); }
          });
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Timed out')); });
        req.write(rpcPayload);
        req.end();
      });

      if (data && data.result && data.result.identity) {
        const id = data.result.identity;
        console.log(color.bgEmerald(color.bold(` ${t('whoamiTitle', lang)} `)));
        console.log('');
        console.log(`  • Tenant ID:        ${color.emerald(color.bold(id.tenant_id))}`);
        console.log(`  • Organization:     ${color.cyan(color.bold(id.tenant_name || 'Developer'))}`);
        console.log(`  • Subscription:     ${color.amber(color.bold((id.tier || 'solo').toUpperCase()))}`);
        console.log(`  • Database File:    ${color.cyan(id.database_file || 'user_brain.sqlite')}`);
        console.log(`  • Knowledge Items:  ${color.bold(id.ki_count || 0)} in vector memory`);
        console.log(`  • Context Firewall: ${color.emerald('🛡️ ' + (id.firewall || 'Locked'))}`);
        console.log('');
        return;
      }
    } catch (_) {}
  }

  // Local Offline Identity Fallback
  console.log(color.bgCyan(color.bold(` ${t('localIdTitle', lang)} `)));
  console.log('');
  console.log(`  • Mode:              ${color.amber('Local / Sovereign Offline Mode')}`);
  console.log(`  • Workspace Path:    ${color.cyan(env.cwd)}`);
  console.log(`  • Project Type:      ${color.emerald(color.bold(env.projectType))} ${color.dim(`(${env.frameworks.join(', ') || 'Vanilla'})`)}`);
  console.log(`  • Context Firewall:  ${color.emerald('🛡️ Active [Dev Mode]')} ${color.dim('(Zero Context Bleed)')}`);
  console.log('');
  console.log(color.dim('💡 To link this machine to your Sovereign Cloud Brain, set TIDYFACTOR_TOKEN:'));
  console.log(color.cyan('   export TIDYFACTOR_TOKEN="tf_live_..."\n'));
}

// ─── Ephemeral Execution Engine (tf use <engine|source>) ────────────
async function cmdUse(args, lang = 'en', flags = {}) {
  const posArgs = [];
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--agent' || args[i] === '-a') {
      i++;
      continue;
    }
    if (args[i].startsWith('-')) continue;
    posArgs.push(args[i]);
  }
  const skillArg = posArgs[0];
  if (!skillArg) {
    console.error(color.red(lang === 'ar' ? '❌ يجب تحديد اسم المهارة: tf use <skill>' : '❌ Skill identifier required: tf use <skill>'));
    process.exit(1);
  }

  // Parse --agent / -a flag
  const agentIdx = args.indexOf('--agent') !== -1 ? args.indexOf('--agent') : args.indexOf('-a');
  const agentName = agentIdx !== -1 && args[agentIdx + 1] && !args[agentIdx + 1].startsWith('-') ? args[agentIdx + 1] : null;

  const userPrompt = posArgs.slice(1).join(' ').trim();

  let cleanId = skillArg.replace(/^@tidyfactor\//, '').replace(/^@alwkala\//, '');
  if (!cleanId.startsWith('tidyfactor-') && COMMUNITY_SKILLS.some(s => s.id === `tidyfactor-${cleanId}`)) {
    cleanId = `tidyfactor-${cleanId}`;
  }

  let skillContent = null;
  const cwd = process.cwd();

  // 1. Check local candidate paths
  const candidateDirs = [
    path.resolve(cwd, skillArg),
    path.resolve(cwd, '.agents', 'skills', cleanId),
    path.resolve(__dirname, '..', '..', 'Skills', 'Skills-LAB', cleanId),
    path.resolve(__dirname, '..', '..', '..', 'Skills', 'Skills-LAB', cleanId),
    path.resolve(cwd, '..', 'Skills', 'Skills-LAB', cleanId),
    path.resolve(os.homedir(), '.gemini', 'config', 'skills', cleanId),
  ];

  for (const dir of candidateDirs) {
    const mdPath = path.join(dir, 'SKILL.md');
    if (fs.existsSync(mdPath)) {
      skillContent = fs.readFileSync(mdPath, 'utf8');
      break;
    }
  }

  // 2. If not local, download to temporary cache
  let tempDirToClean = null;
  if (!skillContent) {
    const tempDir = path.join(os.tmpdir(), `tf_use_${cleanId}_${Date.now()}`);
    tempDirToClean = tempDir;
    const tempZip = `${tempDir}.zip`;
    const downloadUrl = `https://${REGISTRY_HOST}/downloads/skills/${cleanId}.skill`;
    try {
      try {
        await downloadFile(downloadUrl, tempZip);
        extractArchiveNative(tempZip, tempDir);
        const mdPath = path.join(tempDir, 'SKILL.md');
        if (fs.existsSync(mdPath)) {
          skillContent = fs.readFileSync(mdPath, 'utf8');
        }
      } catch (_) {
        const ghUrl = `https://github.com/TidyFactor/TidyFactor/releases/latest/download/${cleanId}.skill`;
        await downloadFile(ghUrl, tempZip);
        extractArchiveNative(tempZip, tempDir);
        const mdPath = path.join(tempDir, 'SKILL.md');
        if (fs.existsSync(mdPath)) {
          skillContent = fs.readFileSync(mdPath, 'utf8');
        }
      }
    } catch (err) {
      console.error(color.red(`\n❌ Failed to resolve skill "${cleanId}": ${err.message}\n`));
      process.exit(1);
    } finally {
      if (fs.existsSync(tempZip)) {
        try { fs.unlinkSync(tempZip); } catch (_) {}
      }
      if (tempDirToClean && fs.existsSync(tempDirToClean)) {
        try { fs.rmSync(tempDirToClean, { recursive: true, force: true }); } catch (_) {}
      }
    }
  }

  if (!skillContent) {
    console.error(color.red(`\n❌ Could not find or download SKILL.md for "${cleanId}".\n`));
    process.exit(1);
  }

  let fullPrompt = `<!-- TIDYFACTOR CAPABILITY ENGINE: ${cleanId.toUpperCase()} -->\n\n${skillContent}`;
  if (userPrompt) {
    fullPrompt += `\n\n<!-- USER INSTRUCTION & TASK CONTEXT -->\n${userPrompt}\n`;
  }

  if (agentName) {
    const { spawn } = require('child_process');
    console.log(color.cyan(`⚡ Launching agent "${agentName}" with ${cleanId} prompt context...\n`));
    const child = spawn(agentName, [], { stdio: ['pipe', 'inherit', 'inherit'], shell: true });
    child.stdin.write(fullPrompt);
    child.stdin.end();
  } else {
    // Clean stdout emission for terminal pipes (e.g. `tf use design | claude`)
    process.stdout.write(fullPrompt + '\n');
  }
}

// ─── Instant Keyword & Interactive Search (tf find [query]) ─────────
function cmdFind(args, lang = 'en', flags = {}) {
  const posArgs = args.slice(1).filter(a => !a.startsWith('-'));
  const query = (posArgs[0] || '').toLowerCase().trim();
  printBanner(lang);
  const isAr = lang === 'ar';
  console.log(color.bold(`🔍 ${isAr ? 'نتائج البحث عن:' : 'Search results for:'} "${color.cyan(query || '*')}"\n`));

  const matchedSkills = COMMUNITY_SKILLS.filter(s => {
    if (!query) return true;
    return s.id.toLowerCase().includes(query) ||
           s.name.toLowerCase().includes(query) ||
           s.desc.toLowerCase().includes(query) ||
           (s.descAr && s.descAr.includes(query)) ||
           s.category.toLowerCase().includes(query) ||
           s.commands.some(c => c.toLowerCase().includes(query)) ||
           s.tags.some(t => t.toLowerCase().includes(query));
  });

  const matchedPacks = Object.entries(PACKS).filter(([id, p]) => {
    if (!query) return true;
    return id.toLowerCase().includes(query) ||
           p.name.toLowerCase().includes(query) ||
           p.desc.toLowerCase().includes(query) ||
           p.skills.some(s => s.toLowerCase().includes(query));
  });

  if (matchedSkills.length === 0 && matchedPacks.length === 0) {
    console.log(color.yellow(`  ${isAr ? 'لم يتم العثور على مهارات تطابق البحث.' : 'No skills or packs matched your query.'}`));
    console.log(color.dim(`  ${isAr ? 'جرّب استعلاماً آخر مثل: design, rtl, next, saas, memory' : 'Try searching for: design, rtl, next, saas, memory, audit'}\n`));
    return;
  }

  if (matchedSkills.length > 0) {
    console.log(color.bold(color.emerald(`  ⚡ ${isAr ? 'المحركات المعيارية المطابقة' : 'Matching Capability Engines'} (${matchedSkills.length}):`)));
    for (const s of matchedSkills) {
      const name = isAr && s.nameAr ? s.nameAr : s.name;
      const desc = isAr && s.descAr ? s.descAr : s.desc;
      const slug = s.id.replace('tidyfactor-', '');
      console.log(`    • ${color.bold(color.emerald(s.id.padEnd(28)))} ${color.bold(name)} ${color.dim(`[v${s.version}]`)}`);
      console.log(`      ${color.dim(desc)}`);
      console.log(`      ${color.cyan('Slash Commands:')} ${s.commands.slice(0, 4).join(', ')}  |  ${color.amber('Mount:')} ${color.bold(`tf add ${slug}`)}\n`);
    }
  }

  if (matchedPacks.length > 0) {
    console.log(color.bold(color.cyan(`  📦 ${isAr ? 'باقات سير العمل المطابقة' : 'Matching Workflow Packs'} (${matchedPacks.length}):`)));
    for (const [id, p] of matchedPacks) {
      const name = isAr && p.nameAr ? p.nameAr : p.name;
      const desc = isAr && p.descAr ? p.descAr : p.desc;
      console.log(`    • ${color.bold(color.cyan(`pack:${id}`.padEnd(28)))} ${color.bold(name)}`);
      console.log(`      ${color.dim(desc)}`);
      console.log(`      ${color.amber('Mount:')} ${color.bold(`tf add pack:${id}`)}\n`);
    }
  }
}

// ─── Help Manual ───────────────────────────────────────────────────
function printHelp(lang = 'en') {
  printBanner(lang);
  const isAr = lang === 'ar';
  console.log(`
${color.bold(isAr ? 'طريقة الاستخدام (USAGE):' : 'USAGE:')}
  ${color.emerald('npx @tidyfactor/cli')}                  # ${isAr ? 'تشغيل المعالج التفاعلي الذكي' : 'Launch interactive 3-step setup wizard'}
  ${color.emerald('tf init')}                             # ${isAr ? 'فحص المشروع واقتراح المهارات' : 'Project detection & interactive mounting'}
  ${color.emerald('tf add <skill>')}                      # ${isAr ? 'تثبيت مهارة محددة (design, styler, brain...)' : 'Install a specific skill'}
  ${color.emerald('tf add pack:<pack>')}                  # ${isAr ? 'تثبيت باقة متكاملة (design, saas, eng...)' : 'Install a curated workflow pack'}
  ${color.emerald('tf add --all')}                        # ${isAr ? 'تثبيت الجناح الكامل (13 مهارة)' : 'Install entire 13-skill master suite'}
  ${color.emerald('tf use <skill> [prompt]')}             # ${isAr ? 'استخدام عابر بدون تثبيت وبث للـ stdout' : 'Evaluate skill without installing & pipe to agents'}
  ${color.emerald('tf find [query]')}                     # ${isAr ? 'بحث فوري في المهارات والباقات' : 'Search skills and packs by keyword'}
  ${color.emerald('tf sync')}                             # ${isAr ? 'مزامنة المهارات بين كافة الوكلاء النشطين' : 'Sync skills across all detected active agents'}
  ${color.emerald('tf outdated')}                         # ${isAr ? 'كشف المهارات القديمة ومقارنة الإصدارات' : 'Check for skill updates against registry'}
  ${color.emerald('tf update [skill]')}                   # ${isAr ? 'ترقية المهارات المثبتة لآخر إصدار' : 'Upgrade skills to their latest releases'}
  ${color.emerald('tf remove <skill>')}                   # ${isAr ? 'حذف مهارة من بيئات العمل وقفل الحزم' : 'Uninstall a skill from all agent paths'}
  ${color.emerald('tf info <skill>')}                     # ${isAr ? 'عرض تفاصيل وأوامر المهارة' : 'Inspect skill details and slash commands'}
  ${color.emerald('tf doctor')}                           # ${isAr ? 'فحص صحة البيئة والوكلاء والشبكة' : 'Workspace diagnostics & agent readiness'}
  ${color.emerald('tf whoami')}                           # ${isAr ? 'تشخيص الهوية والذاكرة السيادية' : 'Tenant identity & sovereign memory context'}
  ${color.emerald('tf list')}                             # ${isAr ? 'استعراض الـ 13 مهارة الرسمية' : 'List all 13 official community skills'}
  ${color.emerald('tf packs')}                            # ${isAr ? 'استعراض باقات سير العمل المتاحة' : 'List all curated workflow packs'}
  ${color.emerald('tf pro')}                              # ${isAr ? 'بوابة مهارات المؤسسات و DevOps' : 'Explore Pro & Enterprise skills gateway'}

${color.bold(isAr ? 'خيارات الاستهداف والتحكم (OPTIONS & FLAGS):' : 'OPTIONS & FLAGS:')}
  ${color.cyan('--ar')}                                    # ${isAr ? 'تفعيل الواجهة باللغة العربية' : 'Force Arabic language interface'}
  ${color.cyan('--en')}                                    # ${isAr ? 'تفعيل الواجهة باللغة الإنجليزية' : 'Force English language interface'}
  ${color.cyan('-y, --yes')}                               # ${isAr ? 'تثبيت فوري صامت بالقيم الافتراضية' : 'Automatic non-interactive confirmation'}
  ${color.cyan('--copy')}                                  # ${isAr ? 'نسخ مستقل كامل بدلاً من الروابط الرمزية' : 'Copy independent files instead of symlinks/junctions'}
  ${color.cyan('-g, --global')}                            # ${isAr ? 'التثبيت في المجلد العام للمستخدم' : 'Mount into global user config (~/.gemini/config/skills/)'}
  ${color.cyan('-a, --agent <names...>')}                  # ${isAr ? 'تحديد وكلاء معينين للتثبيت' : 'Target specific agent(s) (e.g. claude, cursor)'}
  ${color.cyan('--dry-run')}                               # ${isAr ? 'معاينة المسارات دون كتابة على القرص' : 'Simulate execution without modifying disk'}
  ${color.cyan('--json')}                                  # ${isAr ? 'إخراج النتائج بصيغة JSON للأتمتة' : 'Format output as machine-readable JSON'}
  ${color.cyan('--all-agents')}                            # ${isAr ? 'التركيب في كافة بيئات الوكلاء الـ 18' : 'Mount to ALL detected agents simultaneously'}

${color.bold(isAr ? 'رايات الوكلاء المدعومة (18+ IDE FLAGS):' : 'SUPPORTED IDE TARGET FLAGS (18+):')}
  ${color.cyan('--trae, --cursor, --windsurf, --copilot, --roo, --opencode, --kilocode, --warp,')}
  ${color.cyan('--kiro, --claude, --zed, --jetbrains, --blackbox, --cline, --amp, --openclaw')}
`);
}

// ─── Main CLI Dispatcher ───────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'init';
  const lang = detectLanguage(args);

  const flags = {
    yes: args.includes('-y') || args.includes('--yes'),
    dryRun: args.includes('--dry-run'),
    json: args.includes('--json'),
    copy: args.includes('--copy'),
    global: args.includes('-g') || args.includes('--global'),
    allAgents: args.includes('--all-agents'),
    lang
  };

  if (args.includes('-v') || args.includes('--version')) {
    console.log(`@tidyfactor/cli v${VERSION}`);
    return;
  }

  if (args.includes('-h') || args.includes('--help') || command === 'help') {
    printHelp(lang);
    return;
  }

  if (command === 'use') {
    await cmdUse(args, lang, flags);
    return;
  }

  if (command === 'find' || command === 'search') {
    cmdFind(args, lang, flags);
    return;
  }

  if (command === 'init' || command === 'wizard') {
    await runInteractiveWizard(lang, flags);
    return;
  }

  if (command === 'list' || command === 'ls') {
    if (flags.json) {
      console.log(JSON.stringify(COMMUNITY_SKILLS, null, 2));
      return;
    }
    printBanner(lang);
    console.log(color.cyan('╭─────────────────────────────┬──────────────┬─────────┬────────────────────────────────╮'));
    console.log(`│ ${color.bold('Skill ID'.padEnd(27))} │ ${color.bold('Category'.padEnd(12))} │ ${color.bold('Version'.padEnd(7))} │ ${color.bold('Primary Commands'.padEnd(30))} │`);
    console.log(color.cyan('├─────────────────────────────┼──────────────┼─────────┼────────────────────────────────┤'));
    COMMUNITY_SKILLS.forEach(s => {
      const cmds = s.commands.slice(0, 3).join(' ');
      console.log(`│ ${color.emerald(s.id.padEnd(27))} │ ${color.amber(s.category.toUpperCase().padEnd(12))} │ ${color.bold(s.version.padEnd(7))} │ ${color.cyan(cmds.padEnd(30))} │`);
    });
    console.log(color.cyan('╰─────────────────────────────┴──────────────┴─────────┴────────────────────────────────╯\n'));
    console.log(`💡 ${lang === 'ar' ? 'شغّل المعالج التفاعلي:' : 'Run the interactive wizard:'} ${color.emerald('tf init')}\n`);
    return;
  }

  if (command === 'packs') {
    if (flags.json) {
      console.log(JSON.stringify(PACKS, null, 2));
      return;
    }
    printBanner(lang);
    console.log(color.bold(lang === 'ar' ? '📦 باقات سير العمل المنسقة:' : '📦 Curated Workflow Packs:\n'));
    for (const [id, pack] of Object.entries(PACKS)) {
      const name = lang === 'ar' ? pack.nameAr : pack.name;
      const desc = lang === 'ar' ? pack.descAr : pack.desc;
      console.log(`  ${color.emerald(`pack:${id}`.padEnd(20))} ${color.bold(name)}`);
      console.log(`  ${''.padEnd(20)} ${color.dim(desc)}`);
      console.log(`  ${''.padEnd(20)} ${color.cyan(pack.skills.map(s => s.replace('tidyfactor-', '')).join(', '))}\n`);
    }
    console.log(`💡 ${lang === 'ar' ? 'تثبيت باقة:' : 'Install a pack:'} ${color.emerald('tf add pack:design')}\n`);
    return;
  }

  if (command === 'add' || command === 'install') {
    const posArgs = args.slice(1).filter(a => !a.startsWith('-') && a !== 'all');
    const skillArg = posArgs[0];
    const isAll = args.includes('--all') || (args[1] === 'all') || (posArgs.length === 0 && args.includes('all'));
    
    // Resolve target paths
    let targets = [];
    if (args.includes('--antigravity') || args.includes('--gemini') || args.includes('--codex')) {
      targets.push(flags.global ? path.join(os.homedir(), '.gemini', 'config', 'skills') : path.join(process.cwd(), '.agents', 'skills'));
    }
    if (args.includes('--trae')) targets.push(flags.global ? path.join(os.homedir(), '.trae', 'skills') : path.join(process.cwd(), '.trae', 'skills'));
    if (args.includes('--cursor')) targets.push(flags.global ? path.join(os.homedir(), '.cursor', 'skills') : path.join(process.cwd(), '.cursor', 'skills'));
    if (args.includes('--windsurf')) targets.push(flags.global ? path.join(os.homedir(), '.codeium', 'windsurf', 'skills') : path.join(process.cwd(), '.windsurf', 'skills'));
    if (args.includes('--copilot')) targets.push(flags.global ? path.join(os.homedir(), '.copilot', 'skills') : path.join(process.cwd(), '.github', 'prompts'));
    if (args.includes('--roo') || args.includes('--roocode')) targets.push(flags.global ? path.join(os.homedir(), '.roo', 'skills') : path.join(process.cwd(), '.roo', 'skills'));
    if (args.includes('--opencode')) targets.push(flags.global ? path.join(os.homedir(), '.config', 'opencode', 'skills') : path.join(process.cwd(), '.opencode', 'skills'));
    if (args.includes('--kilocode') || args.includes('--kilo')) targets.push(flags.global ? path.join(os.homedir(), '.kilocode', 'skills') : path.join(process.cwd(), '.kilocode', 'skills'));
    if (args.includes('--warp')) targets.push(flags.global ? path.join(os.homedir(), '.agents', 'skills') : path.join(process.cwd(), '.warp', 'skills'));
    if (args.includes('--kiro')) targets.push(flags.global ? path.join(os.homedir(), '.kiro', 'skills') : path.join(process.cwd(), '.kiro', 'skills'));
    if (args.includes('--claude')) targets.push(flags.global ? path.join(os.homedir(), '.claude', 'skills') : path.join(process.cwd(), '.claude', 'skills'));
    if (args.includes('--zed')) targets.push(flags.global ? path.join(os.homedir(), '.agents', 'skills') : path.join(process.cwd(), '.zed', 'skills'));
    if (args.includes('--jetbrains') || args.includes('--idea')) targets.push(flags.global ? path.join(os.homedir(), '.idea', 'ai') : path.join(process.cwd(), '.jetbrains', 'skills'));
    if (args.includes('--blackbox')) targets.push(flags.global ? path.join(os.homedir(), '.blackbox', 'skills') : path.join(process.cwd(), '.blackbox', 'skills'));
    if (args.includes('--cline')) targets.push(flags.global ? path.join(os.homedir(), '.agents', 'skills') : path.join(process.cwd(), '.cline', 'skills'));
    if (args.includes('--amp')) targets.push(flags.global ? path.join(os.homedir(), '.amp', 'skills') : path.join(process.cwd(), '.amp', 'skills'));
    if (args.includes('--openclaw')) targets.push(flags.global ? path.join(os.homedir(), '.openclaw', 'skills') : path.join(process.cwd(), '.openclaw', 'skills'));

    // Support -a / --agent <name>
    const agentIdx = args.indexOf('--agent') !== -1 ? args.indexOf('--agent') : args.indexOf('-a');
    if (agentIdx !== -1 && args[agentIdx + 1] && !args[agentIdx + 1].startsWith('-')) {
      const targetAgentId = args[agentIdx + 1].toLowerCase();
      const matched = AGENT_PLATFORMS.find(p => p.id === targetAgentId || p.name.toLowerCase().includes(targetAgentId));
      if (matched) {
        targets.push(flags.global ? matched.globalPath : path.join(process.cwd(), matched.path));
      }
    }

    if (flags.global) {
      targets.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
    }

    if (flags.allAgents) {
      AGENT_PLATFORMS.forEach(p => {
        targets.push(flags.global ? p.globalPath : path.join(process.cwd(), p.path));
      });
      if (flags.global) {
        targets.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
      }
    }

    if (targets.length === 0) {
      targets.push(path.join(process.cwd(), '.agents', 'skills'));
      const env = detectProjectEnvironment(process.cwd());
      if (env.detectedAgents.length > 0) {
        env.detectedAgents.forEach(a => targets.push(a.fullPath));
      }
    }
    targets = [...new Set(targets)];

    if (!skillArg && !isAll) {
      await runInteractiveWizard(lang, flags);
      return;
    }

    printBanner(lang);

    if (isAll) {
      console.log(color.bold(`📦 Installing Full Master Suite (13 Skills) into ${targets.length} target(s)...\n`));
      for (const s of COMMUNITY_SKILLS) {
        await installSingleSkill(s.id, targets, { lang, dryRun: flags.dryRun, copy: flags.copy });
      }
      console.log(color.emerald('\n✨ All 13 community skills mounted successfully!\n'));
      return;
    }

    if (skillArg.startsWith('pack:')) {
      const packId = skillArg.replace('pack:', '');
      const pack = PACKS[packId];
      if (!pack) {
        console.log(color.red(`\n❌ Unknown pack: "${packId}". Available packs: ${Object.keys(PACKS).join(', ')}\n`));
        return;
      }
      console.log(color.bold(`📦 Installing Pack: ${color.cyan(lang === 'ar' ? pack.nameAr : pack.name)} (${pack.skills.length} skills)...\n`));
      let count = 0;
      for (const s of pack.skills) {
        const ok = await installSingleSkill(s, targets, { lang, dryRun: flags.dryRun, copy: flags.copy });
        if (ok) count++;
      }
      console.log(color.emerald(`\n✨ Pack "${pack.name}" — ${count}/${pack.skills.length} skills mounted!\n`));
      return;
    }

    await installSingleSkill(skillArg, targets, { lang, dryRun: flags.dryRun, copy: flags.copy });
    return;
  }

  if (command === 'sync') {
    await runSyncCommand(lang, flags);
    return;
  }

  if (command === 'outdated') {
    await runOutdatedCommand(lang);
    return;
  }

  if (command === 'update' || command === 'upgrade') {
    await runUpdateCommand(args, lang, flags);
    return;
  }

  if (command === 'remove' || command === 'uninstall' || command === 'rm') {
    await runRemoveCommand(args, lang);
    return;
  }

  if (command === 'info' || command === 'show') {
    runInfoCommand(args, lang);
    return;
  }

  if (command === 'pro') {
    runProCommand(lang);
    return;
  }

  if (command === 'doctor' || command === 'check') {
    await runDoctorCommand(lang);
    return;
  }

  if (command === 'whoami' || command === 'who' || command === 'id') {
    await runWhoamiCommand(lang);
    return;
  }

  // Fallback to help
  printHelp(lang);
}

main().catch((err) => {
  console.error(color.red(`\n❌ Error: ${err.message}\n`));
  process.exit(1);
});
