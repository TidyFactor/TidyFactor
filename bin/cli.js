#!/usr/bin/env node
/**
 * TidyFactor CLI — Universal Agent Skill Manager
 * Lightweight, zero-dependency CLI for installing, listing, and managing TidyFactor AI Agent Skills.
 * Works seamlessly across Antigravity, Claude Code, Cursor, Codex, and Windsurf.
 *
 * @license Apache-2.0
 * @author TidyFactor & Alwkala <hello@tidyfactor.com>
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const os = require('os');
const { execSync } = require('child_process');

const VERSION = '1.5.0';
const REGISTRY_HOST = process.env.TIDYFACTOR_REGISTRY_HOST || 'tidyfactor.com';
const REGISTRY_API_PATH = '/api/v1/skills';

// Fallback metadata for all 12 official community skills
const COMMUNITY_SKILLS = [
  { id: 'tidyfactor-skill-architect', name: 'Skill Architect', desc: 'Master governance layer and methodology engine enforcing structural discipline.', commands: ['/init', '/audit', '/test', '/grow'] },
  { id: 'tidyfactor-cinematic', name: 'Cinematic', desc: 'Luxury scroll-driven landing pages (Apple x Cartier aesthetic) Canvas frame sequence.', commands: ['/film', '/brand', '/hero', '/theme', '/perf'] },
  { id: 'tidyfactor-design', name: 'Design Studio', desc: 'Code-native interactive prototyping & Figma alternative for dashboards and design systems.', commands: ['/study', '/brief', '/tokens', '/palette', '/layout'] },
  { id: 'tidyfactor-styler', name: 'Styler & RTL', desc: 'Production framework styler and surgical RTL UI polish engine across Next.js, PHP, Vanilla.', commands: ['/component', '/section', '/redesign', '/rtl', '/motion'] },
  { id: 'tidyfactor-doc', name: 'Doc Platform', desc: 'Codebase documentation builder & dual-engine publishing platform (MkDocs Material & Docsify).', commands: ['/init', '/collect', '/generate', '/site', '/mkdocs', '/docsify'] },
  { id: 'tidyfactor-next', name: 'Next.js SaaS', desc: 'Production multi-tenant SaaS engine on Next.js 16, React 19, TypeScript strict, and Supabase.', commands: ['/brief', '/init', '/tenant', '/rls', '/auth', '/api'] },
  { id: 'tidyfactor-marketing', name: 'Marketing & SEO', desc: 'AI Direct-response marketing, pillar-cluster SEO & multi-channel growth engine with CDL.', commands: ['/strategy', '/content', '/social', '/email', '/advertising'] },
  { id: 'tidyfactor-html', name: 'Static HTML', desc: '100% static HTML/CSS/JS platform starter with zero server runtime and Web Components.', commands: ['/brief', '/init', '/compo', '/pages', '/assets', '/seo'] },
  { id: 'tidyfactor-htmx', name: 'HTMX Interactivity', desc: 'Server-driven hypermedia interactivity engine paired with PHP, Node, or Python.', commands: ['/brief', '/init', '/fragments', '/swap', '/triggers', '/forms'] },
  { id: 'tidyfactor-js', name: 'Vanilla JS SPA', desc: 'Framework-free reactive Vanilla SPA with client routing and Proxy state management.', commands: ['/brief', '/init', '/store', '/compo', '/route', '/pages'] },
  { id: 'tidyfactor-php', name: 'PHP Modular Monolith', desc: 'Modern server-rendered PHP 8.x monolith (Flight + Medoo + Plates) with plugin hooks & RBAC.', commands: ['/brief', '/init', '/admin', '/plugins', '/themes', '/rbac'] },
  { id: 'tidyfactor-github', name: 'GitHub Engine', desc: 'GitHub Platform Operations, Governance, Content, Actions & CX Intelligence Engine.', commands: ['/audit', '/oss', '/ruleset', '/readme', '/release', '/security'] }
];

// Color helpers
const color = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  magenta: (s) => `\x1b[35m${s}\x1b[0m`
};

function printBanner() {
  console.log(color.cyan(color.bold(`
  ╔═══════════════════════════════════════════════════════════╗
  ║   ⚡ TidyFactor Universal Skill Manager (CLI v${VERSION})      ║
  ║   Independent Multi-Agent Architecture & Skill Registry   ║
  ╚═══════════════════════════════════════════════════════════╝
  `)));
}

function printHelp() {
  printBanner();
  console.log(`
${color.bold('USAGE:')}
  ${color.green('tidyfactor')} <command> [options]
  ${color.green('npx @alwkala/tidyfactor')} <command> [options]

${color.bold('CORE COMMANDS:')}
  ${color.cyan('list, ls')}                 List all available skills from the registry
  ${color.cyan('add, install <skill>')}    Install a skill into your current workspace or agent
  ${color.cyan('info <skill>')}            Display full documentation & command triggers for a skill
  ${color.cyan('doctor, check')}           Audit active workspace and detect installed agent skills
  ${color.cyan('version, -v')}             Show CLI version

${color.bold('TARGET AGENT OPTIONS:')}
  ${color.yellow('--local')} (default)       Install to current workspace (.agents/skills/<skill>)
  ${color.yellow('--cursor')}                Install to Cursor directory (.cursor/skills/<skill>)
  ${color.yellow('--gemini, --global')}      Install globally for Gemini / Antigravity config
  ${color.yellow('--claude')}                Install for Claude Code user directory

${color.bold('EXAMPLES:')}
  tidyfactor list
  tidyfactor add tidyfactor-cinematic
  tidyfactor add tidyfactor-styler --cursor
  tidyfactor info tidyfactor-marketing
  tidyfactor doctor
`);
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'TidyFactor-CLI/' + VERSION } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchJson(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

function getDestinationDir(skillId, options) {
  const cwd = process.cwd();
  const home = os.homedir();

  if (options.cursor) {
    return path.join(cwd, '.cursor', 'skills', skillId);
  }
  if (options.global || options.gemini) {
    return path.join(home, '.gemini', 'config', 'skills', skillId);
  }
  if (options.claude) {
    return path.join(home, '.claude', 'skills', skillId);
  }
  // Default: local .agents/skills
  return path.join(cwd, '.agents', 'skills', skillId);
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (['.git', 'node_modules', 'dist'].includes(entry.name)) continue;
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function handleList() {
  console.log(color.bold('📦 Fetching skills registry from TidyFactor Hub...\n'));
  let skills = COMMUNITY_SKILLS;
  try {
    const registryUrl = `https://${REGISTRY_HOST}${REGISTRY_API_PATH}`;
    const remoteData = await fetchJson(registryUrl);
    if (Array.isArray(remoteData) && remoteData.length > 0) {
      skills = remoteData;
    }
  } catch (err) {
    console.log(color.dim(`ℹ️ Registry connection fallback to local catalog (${err.message})`));
  }

  console.log(color.cyan('─────────────────────────────────────────────────────────────────────────────'));
  console.log(`${color.bold('ID / PACKAGE'.padEnd(30))} ${color.bold('CATEGORY'.padEnd(14))} ${color.bold('DESCRIPTION')}`);
  console.log(color.cyan('─────────────────────────────────────────────────────────────────────────────'));

  skills.forEach((s) => {
    const id = (s.id || s.name || '').padEnd(30);
    const cat = (s.category || 'community').toUpperCase().padEnd(14);
    const desc = (s.desc_en || s.desc_ar || s.desc || '').slice(0, 60);
    console.log(`${color.green(id)} ${color.yellow(cat)} ${desc}...`);
  });

  console.log(color.cyan('─────────────────────────────────────────────────────────────────────────────'));
  console.log(`\n💡 To install any skill, run: ${color.green('tidyfactor add <skill-name>')}\n`);
}

async function handleInfo(skillId) {
  if (!skillId) {
    console.error(color.red('❌ Please provide a skill name. Example: tidyfactor info tidyfactor-cinematic'));
    process.exit(1);
  }
  const cleanId = skillId.replace(/^@alwkala\//, '');
  const skill = COMMUNITY_SKILLS.find(s => s.id === cleanId || s.id === `tidyfactor-${cleanId}`);
  if (!skill) {
    console.error(color.red(`❌ Skill "${skillId}" not found in TidyFactor catalog.`));
    process.exit(1);
  }

  printBanner();
  console.log(`${color.bold('Skill Name:')}    ${color.green(skill.id)}`);
  console.log(`${color.bold('Title:')}         ${skill.name}`);
  console.log(`${color.bold('Description:')}   ${skill.desc}`);
  console.log(`${color.bold('Commands:')}      ${skill.commands.map(c => color.cyan(c)).join(', ')}`);
  console.log(`\n${color.bold('Installation Commands:')}`);
  console.log(`  Local:   ${color.yellow(`tidyfactor add ${skill.id}`)}`);
  console.log(`  Cursor:  ${color.yellow(`tidyfactor add ${skill.id} --cursor`)}`);
  console.log(`  Global:  ${color.yellow(`tidyfactor add ${skill.id} --global`)}`);
  console.log(`  NPM:     ${color.yellow(`npx @alwkala/${skill.id} add-skill`)}\n`);
}

async function handleAdd(skillId, options) {
  if (!skillId) {
    console.error(color.red('❌ Please provide a skill name to install. Example: tidyfactor add tidyfactor-cinematic'));
    process.exit(1);
  }

  let cleanId = skillId.replace(/^@alwkala\//, '');
  if (!cleanId.startsWith('tidyfactor-') && !COMMUNITY_SKILLS.some(s => s.id === cleanId)) {
    const candidate = `tidyfactor-${cleanId}`;
    if (COMMUNITY_SKILLS.some(s => s.id === candidate)) {
      cleanId = candidate;
    }
  }

  const destDir = getDestinationDir(cleanId, options);
  console.log(color.cyan(`⏳ Installing ${color.bold(cleanId)} into ${destDir}...`));

  // Try fetching via NPM package runner or standalone archive
  try {
    console.log(color.dim(`🌐 Fetching latest package @alwkala/${cleanId} via NPM registry...`));
    execSync(`npx -y @alwkala/${cleanId} add-skill`, { stdio: 'inherit' });
    console.log(color.green(`\n✓ Skill [${cleanId}] successfully downloaded and injected!\n`));
  } catch (err) {
    console.error(color.red(`\n❌ Failed to automatically fetch skill via NPM: ${err.message}`));
    console.log(`💡 You can download the standalone archive directly from:`);
    console.log(color.cyan(`   https://${REGISTRY_HOST}/downloads/skills/${cleanId}.skill\n`));
  }
}

function handleDoctor() {
  printBanner();
  console.log(color.bold('🩺 Auditing Workspace & Agent Environment...\n'));

  const cwd = process.cwd();
  const checks = [
    { name: 'Local Agents Dir', path: path.join(cwd, '.agents', 'skills') },
    { name: 'Cursor Skills Dir', path: path.join(cwd, '.cursor', 'skills') },
    { name: 'Global Gemini Dir', path: path.join(os.homedir(), '.gemini', 'config', 'skills') },
  ];

  checks.forEach(c => {
    if (fs.existsSync(c.path)) {
      const skills = fs.readdirSync(c.path).filter(f => fs.statSync(path.join(c.path, f)).isDirectory());
      console.log(`${color.green('✔')} ${c.name.padEnd(22)}: ${color.cyan(skills.length)} skills found (${skills.join(', ') || 'empty'})`);
    } else {
      console.log(`${color.yellow('○')} ${c.name.padEnd(22)}: ${color.dim('Not initialized')}`);
    }
  });

  console.log(`\n${color.green('✔')} Environment check completed.\n`);
}

// ─── Entry Point ──────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || '--help';

  const options = {
    local: args.includes('--local'),
    cursor: args.includes('--cursor'),
    global: args.includes('--global') || args.includes('-g'),
    gemini: args.includes('--gemini'),
    claude: args.includes('--claude'),
  };

  switch (command) {
    case 'list':
    case 'ls':
      await handleList();
      break;
    case 'add':
    case 'install':
    case 'inject':
      await handleAdd(args[1], options);
      break;
    case 'info':
    case 'show':
      await handleInfo(args[1]);
      break;
    case 'doctor':
    case 'check':
      handleDoctor();
      break;
    case 'version':
    case '-v':
    case '--version':
      console.log(`v${VERSION}`);
      break;
    case 'help':
    case '-h':
    case '--help':
    default:
      printHelp();
      break;
  }
}

main().catch(err => {
  console.error(color.red(`\n❌ Error: ${err.message}\n`));
  process.exit(1);
});
