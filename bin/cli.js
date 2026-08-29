#!/usr/bin/env node
/**
 * TidyFactor CLI — Universal Agent Skill Manager & Interactive Setup Wizard
 * Intelligent project environment detection, interactive skill recommendations,
 * and automated zero-dependency unpacking across 18+ AI Agent IDEs:
 * Trae, Cursor, Windsurf, Antigravity, Copilot, RooCode, OpenCode, KiloCode, Warp, Kiro, Claude, Zed, JetBrains, Blackbox, Cline, AMP, OpenClaw, Codex.
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
const readline = require('readline');

const VERSION = '1.7.0';
const REGISTRY_HOST = process.env.TIDYFACTOR_REGISTRY_HOST || 'tidyfactor.com';
const REGISTRY_API_PATH = '/api/v1/skills';

// 12 Official Community Skills
const COMMUNITY_SKILLS = [
  { id: 'tidyfactor-skill-architect', name: 'Skill Architect', category: 'governance', desc: 'Master governance layer and methodology engine enforcing structural discipline.', commands: ['/init', '/audit', '/test', '/grow'], tags: ['governance', 'standards', 'all'] },
  { id: 'tidyfactor-cinematic', name: 'Cinematic Landing', category: 'design', desc: 'Luxury scroll-driven landing pages (Apple x Cartier aesthetic) Canvas frame sequence.', commands: ['/film', '/brand', '/hero', '/theme', '/perf'], tags: ['frontend', 'html', 'react', 'next', 'luxury'] },
  { id: 'tidyfactor-design', name: 'Design Studio', category: 'design', desc: 'Code-native interactive prototyping & Figma alternative for dashboards and design systems.', commands: ['/study', '/brief', '/tokens', '/palette', '/layout'], tags: ['frontend', 'ui', 'react', 'next', 'html', 'dashboard'] },
  { id: 'tidyfactor-styler', name: 'Styler & RTL Engine', category: 'design', desc: 'Production framework styler and surgical RTL UI polish engine across Next.js, PHP, Vanilla.', commands: ['/component', '/section', '/redesign', '/rtl', '/motion'], tags: ['frontend', 'rtl', 'arabic', 'next', 'php', 'html', 'tailwind'] },
  { id: 'tidyfactor-doc', name: 'Doc Platform', category: 'documentation', desc: 'Codebase documentation builder & dual-engine publishing platform (MkDocs Material & Docsify).', commands: ['/init', '/collect', '/generate', '/site', '/mkdocs', '/docsify'], tags: ['docs', 'all'] },
  { id: 'tidyfactor-next', name: 'Next.js SaaS Engine', category: 'engineering', desc: 'Production multi-tenant SaaS engine on Next.js 16, React 19, TypeScript strict, and Supabase.', commands: ['/brief', '/init', '/tenant', '/rls', '/auth', '/api'], tags: ['next', 'react', 'typescript', 'saas', 'supabase'] },
  { id: 'tidyfactor-marketing', name: 'Marketing & SEO', category: 'growth', desc: 'AI Direct-response marketing, pillar-cluster SEO & multi-channel growth engine with CDL.', commands: ['/strategy', '/content', '/social', '/email', '/advertising'], tags: ['marketing', 'seo', 'copywriting', 'growth'] },
  { id: 'tidyfactor-html', name: 'Static HTML Platform', category: 'engineering', desc: '100% static HTML/CSS/JS platform starter with zero server runtime and Web Components.', commands: ['/brief', '/init', '/compo', '/pages', '/assets', '/seo'], tags: ['html', 'static', 'vanilla'] },
  { id: 'tidyfactor-htmx', name: 'HTMX Interactivity', category: 'engineering', desc: 'Server-driven hypermedia interactivity engine paired with PHP, Node, or Python.', commands: ['/brief', '/init', '/fragments', '/swap', '/triggers', '/forms'], tags: ['htmx', 'php', 'hypermedia', 'python'] },
  { id: 'tidyfactor-js', name: 'Vanilla JS SPA', category: 'engineering', desc: 'Framework-free reactive Vanilla SPA with client routing and Proxy state management.', commands: ['/brief', '/init', '/store', '/compo', '/route', '/pages'], tags: ['javascript', 'vanilla', 'spa'] },
  { id: 'tidyfactor-php', name: 'PHP Modular Monolith', category: 'engineering', desc: 'Modern server-rendered PHP 8.x monolith (Flight + Medoo + Plates) with plugin hooks & RBAC.', commands: ['/brief', '/init', '/admin', '/plugins', '/themes', '/rbac'], tags: ['php', 'backend', 'monolith', 'wordpress', 'laravel'] },
  { id: 'tidyfactor-github', name: 'GitHub Platform Engine', category: 'operations', desc: 'GitHub Platform Operations, Governance, Content, Actions & CX Intelligence Engine.', commands: ['/audit', '/oss', '/ruleset', '/readme', '/release', '/security'], tags: ['github', 'devops', 'oss', 'ci', 'all'] }
];

// Official Workflow Packs
const PACKS = {
  'design':      { name: 'Design & Frontend Triad', desc: 'Luxury UI design, cinematic scroll pages & RTL styling', skills: ['tidyfactor-cinematic', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-skill-architect'] },
  'saas':        { name: 'SaaS Starter Kit', desc: 'Next.js 16 + Supabase multi-tenant stack with UI & marketing', skills: ['tidyfactor-next', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-marketing', 'tidyfactor-doc'] },
  'engineering': { name: 'Full-Stack Engineering', desc: 'PHP monolith, HTMX hypermedia, Vanilla SPA & static HTML', skills: ['tidyfactor-php', 'tidyfactor-htmx', 'tidyfactor-js', 'tidyfactor-html', 'tidyfactor-doc'] },
  'governance':  { name: 'Governance & Documentation', desc: 'Skill methodology, documentation builder & GitHub operations', skills: ['tidyfactor-skill-architect', 'tidyfactor-doc', 'tidyfactor-github'] },
  'growth':      { name: 'Growth & Marketing', desc: 'Direct-response copywriting, SEO engine & high-converting pages', skills: ['tidyfactor-marketing', 'tidyfactor-cinematic', 'tidyfactor-styler', 'tidyfactor-html'] },
};

// 18+ Agentic IDE Directory & Detection Definitions
const AGENT_PLATFORMS = [
  { id: 'trae',        name: 'Trae AI IDE',               path: '.trae/skills',        signatures: ['.trae', '.traerules', '.trae/skills'] },
  { id: 'cursor',      name: 'Cursor IDE',                path: '.cursor/skills',      signatures: ['.cursor', '.cursorrules', '.cursor/skills'] },
  { id: 'windsurf',    name: 'Windsurf Cascade',          path: '.windsurf/skills',    signatures: ['.windsurf', '.windsurfrules', '.windsurf/skills'] },
  { id: 'antigravity', name: 'Google Antigravity/Gemini', path: '.agents/skills',      signatures: ['.agents', '.agents/skills', 'GEMINI.md'] },
  { id: 'copilot',     name: 'GitHub Copilot',            path: '.github/prompts',     signatures: ['.github/copilot-instructions.md', '.github/prompts', '.github/skills'] },
  { id: 'roo',         name: 'RooCode (Roo Cline)',       path: '.roo/skills',         signatures: ['.roo', '.roomodes', '.roo/rules', '.roo/skills'] },
  { id: 'opencode',    name: 'OpenCode / Zen',            path: '.opencode/skills',    signatures: ['.opencode', 'opencode.json', '.opencode/skills'] },
  { id: 'kilocode',    name: 'KiloCode',                  path: '.kilocode/skills',    signatures: ['.kilocode', 'kilo.jsonc', '.kilo', '.kilocode/skills'] },
  { id: 'warp',        name: 'Warp Terminal',             path: '.warp/skills',        signatures: ['.warp', '.warp/workflows', '.warp/skills'] },
  { id: 'kiro',        name: 'Kiro (AWS Spec IDE)',       path: '.kiro/skills',        signatures: ['.kiro', '.kiro/steering', '.kiro/skills'] },
  { id: 'claude',      name: 'Claude Code',               path: '.claude/skills',      signatures: ['.claude', 'CLAUDE.md', '.claude/skills'] },
  { id: 'zed',         name: 'Zed AI Agent',              path: '.zed/skills',         signatures: ['.zed', '.zed/settings.json', '.zed/skills'] },
  { id: 'jetbrains',   name: 'JetBrains AI',              path: '.jetbrains/skills',   signatures: ['.idea', '.idea/ai', '.jetbrains/skills'] },
  { id: 'blackbox',    name: 'Blackbox AI',               path: '.blackbox/skills',    signatures: ['.blackbox', '.blackboxrules', '.blackbox/skills'] },
  { id: 'cline',       name: 'Cline / VS Code',           path: '.cline/skills',       signatures: ['.clinerules', '.cline', '.cline/skills'] },
  { id: 'amp',         name: 'AMP AI',                    path: '.amp/skills',         signatures: ['.amprules', '.amp', '.amp/skills'] },
  { id: 'openclaw',    name: 'OpenClaw',                  path: '.openclaw/skills',    signatures: ['.openclaw', '.clawdbot', '.openclaw/skills'] },
  { id: 'codex',       name: 'OpenAI Codex',              path: '.agents/skills',      signatures: ['codex.md', 'AGENTS.md'] },
];

// ANSI Color & Formatting Helpers
const color = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  blue: (s) => `\x1b[34m${s}\x1b[0m`,
  magenta: (s) => `\x1b[35m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  bgCyan: (s) => `\x1b[46m\x1b[30m${s}\x1b[0m`,
  bgBlue: (s) => `\x1b[44m\x1b[37m${s}\x1b[0m`,
  bgGreen: (s) => `\x1b[42m\x1b[30m${s}\x1b[0m`,
};

function printBanner() {
  console.log(color.cyan(color.bold(`
  ┌─────────────────────────────────────────────────────────────┐
  │  ⚡ TidyFactor Universal Architecture & AI Skill Engine     │
  │  Interactive Setup & 18+ Agentic IDEs Mount Installer       │
  │  v${VERSION.padEnd(58)}│
  └─────────────────────────────────────────────────────────────┘`)));
}

// ─── Environment & Project Auto-Detection ────────────────────────
function detectProjectEnvironment(targetDir = process.cwd()) {
  const env = {
    cwd: targetDir,
    projectType: 'Generic Platform',
    frameworks: [],
    recommendedSkillIds: ['tidyfactor-skill-architect', 'tidyfactor-doc'],
    detectedAgents: [],
  };

  const hasFile = (f) => fs.existsSync(path.join(targetDir, f));

  // Framework & Language Detection
  let pkg = null;
  if (hasFile('package.json')) {
    try {
      pkg = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf8'));
      const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      
      if (allDeps['next']) {
        env.frameworks.push('Next.js');
        env.projectType = 'Next.js SaaS / Web App';
        env.recommendedSkillIds.push('tidyfactor-next', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-marketing');
      } else if (allDeps['react']) {
        env.frameworks.push('React');
        env.projectType = 'React Single Page App';
        env.recommendedSkillIds.push('tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-doc');
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
    env.projectType = 'PHP / Modular Monolith';
    env.recommendedSkillIds.push('tidyfactor-php', 'tidyfactor-htmx', 'tidyfactor-styler', 'tidyfactor-doc');
  }

  if (hasFile('index.html') && !env.frameworks.includes('Next.js') && !env.frameworks.includes('React')) {
    env.frameworks.push('Static HTML5');
    if (env.projectType === 'Generic Platform') env.projectType = 'Static Website / Landing Page';
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

  // Deduplicate recommendations
  env.recommendedSkillIds = [...new Set(env.recommendedSkillIds)];
  return env;
}

// ─── Native Unpacking Engine ───────────────────────────────────────
function extractArchiveNative(archivePath, destinationDir) {
  fs.mkdirSync(destinationDir, { recursive: true });
  const isWin = process.platform === 'win32';
  try {
    if (isWin) {
      const psCmd = `powershell -NoProfile -Command "Expand-Archive -Path '${archivePath}' -DestinationPath '${destinationDir}' -Force"`;
      execSync(psCmd, { stdio: 'ignore' });
      return true;
    } else {
      try {
        execSync(`unzip -q -o "${archivePath}" -d "${destinationDir}"`, { stdio: 'ignore' });
        return true;
      } catch {
        execSync(`tar -xf "${archivePath}" -C "${destinationDir}"`, { stdio: 'ignore' });
        return true;
      }
    }
  } catch (_) {
    return false;
  }
}

// Download helper
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    const file = fs.createWriteStream(destPath);

    const req = client.get(url, { headers: { 'User-Agent': 'TidyFactor-CLI/' + VERSION } }, (res) => {
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
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });

    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });

    req.setTimeout(20000, () => {
      req.destroy();
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(new Error('Download timed out'));
    });
  });
}

function promptQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans.trim());
  }));
}

// ─── Install a Specific Skill with Dual-Channel Fallback ───────────
async function installSingleSkill(skillId, targetLocations) {
  let cleanId = skillId.replace(/^@tidyfactor\//, '').replace(/^@alwkala\//, '');
  if (!cleanId.startsWith('tidyfactor-') && COMMUNITY_SKILLS.some(s => s.id === `tidyfactor-${cleanId}`)) {
    cleanId = `tidyfactor-${cleanId}`;
  }

  process.stdout.write(`  ⏳ Installing ${color.bold(cleanId)}... `);

  // Strategy 1: Local Workspace Fast-Path (Development Workstation Mode)
  let localSkillDir = path.resolve(__dirname, '..', '..', cleanId);
  if (!fs.existsSync(localSkillDir)) {
    localSkillDir = path.resolve(__dirname, '..', cleanId);
  }

  if (fs.existsSync(localSkillDir) && fs.existsSync(path.join(localSkillDir, 'SKILL.md'))) {
    for (const targetDir of targetLocations) {
      const dest = path.join(targetDir, cleanId);
      fs.mkdirSync(dest, { recursive: true });
      copyDirRecursive(localSkillDir, dest);
    }
    console.log(`${color.green('✔')} ${color.dim('(Local fast-sync)')}`);
    return true;
  }

  // Strategy 2 (Primary Network): Official NPM / NPX Package Runner (@tidyfactor/<skill>)
  let npmSuccess = false;
  try {
    execSync(`npx -y @tidyfactor/${cleanId.replace('tidyfactor-', '')} add-skill`, { stdio: 'ignore', timeout: 20000 });
    
    // Check where it installed and sync to all other selected targets
    const defaultWorkspaceDir = path.join(process.cwd(), '.agents', 'skills', cleanId);
    if (fs.existsSync(defaultWorkspaceDir) && fs.existsSync(path.join(defaultWorkspaceDir, 'SKILL.md'))) {
      for (const targetDir of targetLocations) {
        const dest = path.join(targetDir, cleanId);
        if (dest !== defaultWorkspaceDir) {
          fs.mkdirSync(dest, { recursive: true });
          copyDirRecursive(defaultWorkspaceDir, dest);
        }
      }
      npmSuccess = true;
      console.log(`${color.green('✔')} ${color.cyan('[NPM Registry: @tidyfactor]')}`);
      return true;
    }
  } catch (_) {
    npmSuccess = false;
  }

  // Strategy 3 (Secondary Fallback): Direct CDN Download & Native Extraction
  const tempSkillZip = path.join(os.tmpdir(), `tf_${cleanId}_${Date.now()}.zip`);
  const downloadUrl = `https://${REGISTRY_HOST}/downloads/skills/${cleanId}.skill`;

  try {
    await downloadFile(downloadUrl, tempSkillZip);
    
    for (const targetDir of targetLocations) {
      const dest = path.join(targetDir, cleanId);
      fs.mkdirSync(dest, { recursive: true });
      const ok = extractArchiveNative(tempSkillZip, dest);
      if (!ok) throw new Error('Native archive extraction failed');

      // Auto-flatten nested root folder if present
      const nested = path.join(dest, cleanId);
      if (fs.existsSync(nested) && fs.existsSync(path.join(nested, 'SKILL.md'))) {
        const items = fs.readdirSync(nested);
        for (const it of items) {
          const srcItem = path.join(nested, it);
          const destItem = path.join(dest, it);
          if (fs.existsSync(destItem)) {
            if (fs.statSync(destItem).isDirectory()) {
              fs.rmSync(destItem, { recursive: true, force: true });
            } else {
              fs.unlinkSync(destItem);
            }
          }
          fs.renameSync(srcItem, destItem);
        }
        try { fs.rmdirSync(nested); } catch (_) {}
      }
    }

    if (fs.existsSync(tempSkillZip)) fs.unlinkSync(tempSkillZip);
    console.log(`${color.green('✔')} ${color.dim('[Direct CDN Fallback]')}`);
    return true;
  } catch (err) {
    if (fs.existsSync(tempSkillZip)) fs.unlinkSync(tempSkillZip);
    console.log(`${color.red('✖ Failed:')} ${err.message}`);
    return false;
  }
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

// ─── Interactive Setup Wizard ─────────────────────────────────────
async function runInteractiveWizard() {
  printBanner();
  const cwd = process.cwd();
  const env = detectProjectEnvironment(cwd);

  console.log(color.cyan('\n┌── [Step 1/3] Environment & Agent Discovery ─────────────────┐'));
  console.log(`│ • Workspace:   ${color.cyan(cwd)}`);
  console.log(`│ • Tech Stack:  ${color.green(color.bold(env.projectType))} ${color.dim(`(${env.frameworks.join(', ') || 'General'})`)}`);
  
  if (env.detectedAgents.length > 0) {
    console.log(`│ • AI Agents:   ${env.detectedAgents.map(a => color.yellow(`${a.name} (${a.path})`)).join('\n│                ')}`);
  } else {
    console.log(`│ • AI Agents:   ${color.dim('Universal Workspace Mode (.agents/skills/)')}`);
  }
  console.log(color.cyan('└─────────────────────────────────────────────────────────────┘'));

  // Target IDE Agent Mount Matrix
  console.log(color.cyan('\n┌── [Step 2/3] Choose Target Agentic IDE(s) ──────────────────┐'));
  console.log(`│  ${color.green('1)')} ${color.bold('Universal Default')}      ${color.cyan('.agents/skills/')}     ${color.yellow('(Antigravity, Codex)')}`);
  console.log(`│  ${color.green('2)')} ${color.bold('Trae AI IDE')}            ${color.cyan('.trae/skills/')}       ${color.dim('(ByteDance AI IDE)')}`);
  console.log(`│  ${color.green('3)')} ${color.bold('Cursor IDE')}             ${color.cyan('.cursor/skills/')}     ${color.dim('(Cursor rules & skills)')}`);
  console.log(`│  ${color.green('4)')} ${color.bold('Windsurf Cascade')}       ${color.cyan('.windsurf/skills/')}   ${color.dim('(Codeium Cascade)')}`);
  console.log(`│  ${color.green('5)')} ${color.bold('GitHub Copilot')}         ${color.cyan('.github/prompts/')}    ${color.dim('(Copilot workspace instructions)')}`);
  console.log(`│  ${color.green('6)')} ${color.bold('RooCode')}                ${color.cyan('.roo/skills/')}        ${color.dim('(Roo Cline rules)')}`);
  console.log(`│  ${color.green('7)')} ${color.bold('OpenCode / Zen')}         ${color.cyan('.opencode/skills/')}   ${color.dim('(OpenCode Agent)')}`);
  console.log(`│  ${color.green('8)')} ${color.bold('KiloCode')}               ${color.cyan('.kilocode/skills/')}   ${color.dim('(Kilo Code agent)')}`);
  console.log(`│  ${color.green('9)')} ${color.bold('Warp Terminal')}          ${color.cyan('.warp/skills/')}       ${color.dim('(Warp agentic workflows)')}`);
  console.log(`│  ${color.green('10)')} ${color.bold('Kiro Spec IDE')}         ${color.cyan('.kiro/skills/')}       ${color.dim('(AWS Kiro steering)')}`);
  console.log(`│  ${color.green('11)')} ${color.bold('Claude Code')}           ${color.cyan('.claude/skills/')}     ${color.dim('(Claude project memory)')}`);
  console.log(`│  ${color.green('12)')} ${color.bold('Zed AI Agent')}           ${color.cyan('.zed/skills/')}        ${color.dim('(Zed Agent settings)')}`);
  console.log(`│  ${color.green('13)')} ${color.bold('JetBrains AI')}          ${color.cyan('.jetbrains/skills/')}  ${color.dim('(IDEA/Junie/PyCharm)')}`);
  console.log(`│  ${color.green('14)')} ${color.bold('Global User Hub')}        ${color.cyan('~/.gemini/config/skills/')} ${color.dim('(Cross-project)')}`);
  console.log(`│  ${color.green('15)')} ⚡ ${color.bold('Auto Multi-Mount')}      ${color.magenta('Mount to ALL detected/active agents simultaneously')}`);
  console.log(color.cyan('└─────────────────────────────────────────────────────────────┘'));
  
  const targetChoice = await promptQuestion(`\nSelect Target IDE [1-15, default: 1]: `);
  
  let targetPaths = [];
  switch (targetChoice) {
    case '2': targetPaths.push(path.join(cwd, '.trae', 'skills')); break;
    case '3': targetPaths.push(path.join(cwd, '.cursor', 'skills')); break;
    case '4': targetPaths.push(path.join(cwd, '.windsurf', 'skills')); break;
    case '5': targetPaths.push(path.join(cwd, '.github', 'prompts')); break;
    case '6': targetPaths.push(path.join(cwd, '.roo', 'skills')); break;
    case '7': targetPaths.push(path.join(cwd, '.opencode', 'skills')); break;
    case '8': targetPaths.push(path.join(cwd, '.kilocode', 'skills')); break;
    case '9': targetPaths.push(path.join(cwd, '.warp', 'skills')); break;
    case '10': targetPaths.push(path.join(cwd, '.kiro', 'skills')); break;
    case '11': targetPaths.push(path.join(cwd, '.claude', 'skills')); break;
    case '12': targetPaths.push(path.join(cwd, '.zed', 'skills')); break;
    case '13': targetPaths.push(path.join(cwd, '.jetbrains', 'skills')); break;
    case '14': targetPaths.push(path.join(os.homedir(), '.gemini', 'config', 'skills')); break;
    case '15':
      targetPaths.push(path.join(cwd, '.agents', 'skills'));
      if (env.detectedAgents.length > 0) {
        env.detectedAgents.forEach(a => targetPaths.push(path.join(cwd, a.path)));
      } else {
        targetPaths.push(path.join(cwd, '.cursor', 'skills'));
        targetPaths.push(path.join(cwd, '.windsurf', 'skills'));
        targetPaths.push(path.join(cwd, '.trae', 'skills'));
        targetPaths.push(path.join(cwd, '.roo', 'skills'));
      }
      targetPaths.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
      break;
    default:
      targetPaths.push(path.join(cwd, '.agents', 'skills'));
      break;
  }

  // Deduplicate target paths
  targetPaths = [...new Set(targetPaths)];

  // Skill Installation Options
  console.log(color.cyan('\n┌── [Step 3/3] Choose Skill Package / Track ──────────────────┐'));
  console.log(`│  ${color.green('1)')} 🌟 ${color.bold('Auto-Recommended Kit')}     ${color.yellow(`(${env.recommendedSkillIds.length} skills tailored to ${env.projectType})`)}`);
  console.log(`│  ${color.green('2)')} 👑 ${color.bold('Master Suite (12 Skills)')}   ${color.dim('Full universal AI engineering suite')}`);
  console.log(`│  ${color.green('3)')} 🎨 ${color.bold('Design & Frontend Triad')}    ${color.dim('Cinematic Landing + Design Studio + Styler RTL')}`);
  console.log(`│  ${color.green('4)')} 🚀 ${color.bold('SaaS & Next.js Stack')}      ${color.dim('Next.js 16 + Supabase + Design + Marketing')}`);
  console.log(`│  ${color.green('5)')} ⚙️  ${color.bold('Monolith & PHP Engine')}     ${color.dim('PHP Monolith + HTMX + Styler + Doc')}`);
  console.log(`│  ${color.green('6)')} 🏛️  ${color.bold('Governance & Ops')}         ${color.dim('Skill Architect + Doc Platform + GitHub Engine')}`);
  console.log(`│  ${color.green('7)')} 📦 ${color.bold('Browse Workflow Packs')}     ${color.dim('Select from curated packs: design, saas, engineering...')}`);
  console.log(`│  ${color.green('8)')} 🏷️  ${color.bold('Browse by Category')}        ${color.dim('Design, Engineering, Operations, Growth, Docs')}`);
  console.log(`│  ${color.green('9)')} 🛠️  ${color.bold('Custom Selection')}          ${color.dim('Select individual skills manually by ID')}`);
  console.log(color.cyan('└─────────────────────────────────────────────────────────────┘'));

  const skillChoice = await promptQuestion(`\nSelect Package [1-9, default: 1]: `);

  let skillsToInstall = [];
  if (skillChoice === '2') {
    skillsToInstall = COMMUNITY_SKILLS.map(s => s.id);
  } else if (skillChoice === '3') {
    skillsToInstall = PACKS['design'].skills;
  } else if (skillChoice === '4') {
    skillsToInstall = PACKS['saas'].skills;
  } else if (skillChoice === '5') {
    skillsToInstall = PACKS['engineering'].skills;
  } else if (skillChoice === '6') {
    skillsToInstall = PACKS['governance'].skills;
  } else if (skillChoice === '7') {
    console.log(color.bold('\nAvailable Workflow Packs:'));
    Object.entries(PACKS).forEach(([pId, p], idx) => {
      console.log(`  ${idx + 1}) ${color.green(p.name.padEnd(28))} ${color.dim(p.desc)}`);
    });
    const packIdx = await promptQuestion('\nSelect Pack [1-5]: ');
    const packKeys = Object.keys(PACKS);
    const selectedKey = packKeys[parseInt(packIdx, 10) - 1] || 'design';
    skillsToInstall = PACKS[selectedKey].skills;
  } else if (skillChoice === '8') {
    const categories = ['design', 'engineering', 'operations', 'growth', 'documentation', 'governance'];
    console.log(color.bold('\nSelect Category:'));
    categories.forEach((cat, idx) => {
      const count = COMMUNITY_SKILLS.filter(s => s.category === cat).length;
      console.log(`  ${idx + 1}) ${color.yellow(cat.toUpperCase().padEnd(16))} (${count} skills)`);
    });
    const catIdx = await promptQuestion('\nEnter Category number [1-6]: ');
    const selectedCat = categories[parseInt(catIdx, 10) - 1] || 'design';
    skillsToInstall = COMMUNITY_SKILLS.filter(s => s.category === selectedCat).map(s => s.id);
  } else if (skillChoice === '9') {
    console.log(color.bold('\nAvailable Skills:'));
    COMMUNITY_SKILLS.forEach((s, idx) => {
      console.log(`  ${(idx + 1).toString().padStart(2)}. ${color.green(s.id.padEnd(28))} ${color.yellow(`[${s.category}]`.padEnd(14))} ${color.dim(s.desc.slice(0, 45))}...`);
    });
    const manual = await promptQuestion('\nEnter numbers separated by commas (e.g. 1, 3, 5) or names: ');
    const parts = manual.split(',').map(p => p.trim());
    parts.forEach(p => {
      const idx = parseInt(p, 10) - 1;
      if (!isNaN(idx) && COMMUNITY_SKILLS[idx]) {
        skillsToInstall.push(COMMUNITY_SKILLS[idx].id);
      } else {
        const found = COMMUNITY_SKILLS.find(s => s.id === p || s.id === `tidyfactor-${p}`);
        if (found) skillsToInstall.push(found.id);
      }
    });
    if (skillsToInstall.length === 0) skillsToInstall = env.recommendedSkillIds;
  } else {
    skillsToInstall = env.recommendedSkillIds;
  }

  // Deduplicate skills to install
  skillsToInstall = [...new Set(skillsToInstall)];

  // Execute Installation
  console.log('\n' + color.bold(`🚀 Installing ${skillsToInstall.length} Skills into:\n` + targetPaths.map(p => `   📂 ${color.cyan(p)}`).join('\n') + '\n'));

  for (const p of targetPaths) {
    fs.mkdirSync(p, { recursive: true });
  }

  let installedCount = 0;
  for (const sId of skillsToInstall) {
    const success = await installSingleSkill(sId, targetPaths);
    if (success) installedCount++;
  }

  console.log('\n' + color.cyan('═════════════════════════════════════════════════════════════════════════════'));
  console.log(color.green(color.bold(`✨ Setup Complete! ${installedCount}/${skillsToInstall.length} Skills successfully mounted across ${targetPaths.length} target(s).`)));
  console.log(color.cyan('═════════════════════════════════════════════════════════════════════════════'));
  
  console.log(color.bold('\n💡 How to use with your AI Coding Agents:\n'));
  console.log(`  • ${color.bold('Trae / Cursor / Windsurf')}: Use slash commands like ${color.cyan('/hero')}, ${color.cyan('/component')} in chat`);
  console.log(`  • ${color.bold('Google Antigravity / Gemini')}: Loaded directly from ${color.yellow('.agents/skills/')}`);
  console.log(`  • ${color.bold('GitHub Copilot')}:             Instructions active in ${color.yellow('.github/prompts/')}`);
  console.log(`  • ${color.bold('RooCode / KiloCode / OpenCode')}: Native skills mounted in project folder`);
  console.log(`  • ${color.bold('Warp Terminal')}:               Workflows and prompt context in ${color.yellow('.warp/skills/')}\n`);

  console.log(color.bold('🔥 Quick Triggers & Commands Installed:'));
  skillsToInstall.forEach(sId => {
    const s = COMMUNITY_SKILLS.find(x => x.id === sId);
    if (s) {
      console.log(`  - ${color.green(s.id.padEnd(28))} ${color.yellow(s.commands.slice(0, 4).join('  '))}`);
    }
  });
  console.log('\n');
}

// ─── CLI Dispatcher ───────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'init' || command === 'wizard') {
    await runInteractiveWizard();
    return;
  }

  if (command === 'list' || command === 'ls') {
    printBanner();
    console.log(color.cyan('───────────────────────────────────────────────────────────────────────────────────────'));
    console.log(`${color.bold('SKILL ID'.padEnd(30))} ${color.bold('CATEGORY'.padEnd(16))} ${color.bold('PRIMARY COMMANDS')}`);
    console.log(color.cyan('───────────────────────────────────────────────────────────────────────────────────────'));
    COMMUNITY_SKILLS.forEach(s => {
      console.log(`${color.green(s.id.padEnd(30))} ${color.yellow(s.category.toUpperCase().padEnd(16))} ${color.cyan(s.commands.slice(0, 3).join(' '))} ${color.dim(s.commands.slice(3).join(' '))}`);
    });
    console.log(color.cyan('───────────────────────────────────────────────────────────────────────────────────────\n'));
    console.log(`💡 Run ${color.green('npx @tidyfactor/cli init')} for the interactive wizard.\n`);
    return;
  }

  if (command === 'packs') {
    printBanner();
    console.log(color.bold('📦 Available Curated Workflow Packs:\n'));
    for (const [id, pack] of Object.entries(PACKS)) {
      console.log(`  ${color.green(`pack:${id}`.padEnd(20))} ${color.bold(pack.name)}`);
      console.log(`  ${''.padEnd(20)} ${color.dim(pack.desc)}`);
      console.log(`  ${''.padEnd(20)} ${color.cyan(pack.skills.map(s => s.replace('tidyfactor-', '')).join(', '))}\n`);
    }
    console.log(`💡 Install a pack: ${color.green('npx @tidyfactor/cli add pack:design')}\n`);
    return;
  }

  if (command === 'add' || command === 'install') {
    const skillArg = args[1];
    const isAll = args.includes('--all') || skillArg === 'all';
    
    // Target flags mapping
    let targets = [];
    if (args.includes('--trae')) targets.push(path.join(process.cwd(), '.trae', 'skills'));
    if (args.includes('--cursor')) targets.push(path.join(process.cwd(), '.cursor', 'skills'));
    if (args.includes('--windsurf')) targets.push(path.join(process.cwd(), '.windsurf', 'skills'));
    if (args.includes('--copilot')) targets.push(path.join(process.cwd(), '.github', 'prompts'));
    if (args.includes('--roo') || args.includes('--roocode')) targets.push(path.join(process.cwd(), '.roo', 'skills'));
    if (args.includes('--opencode')) targets.push(path.join(process.cwd(), '.opencode', 'skills'));
    if (args.includes('--kilocode') || args.includes('--kilo')) targets.push(path.join(process.cwd(), '.kilocode', 'skills'));
    if (args.includes('--warp')) targets.push(path.join(process.cwd(), '.warp', 'skills'));
    if (args.includes('--kiro')) targets.push(path.join(process.cwd(), '.kiro', 'skills'));
    if (args.includes('--claude')) targets.push(path.join(process.cwd(), '.claude', 'skills'));
    if (args.includes('--zed')) targets.push(path.join(process.cwd(), '.zed', 'skills'));
    if (args.includes('--jetbrains') || args.includes('--idea')) targets.push(path.join(process.cwd(), '.jetbrains', 'skills'));
    if (args.includes('--blackbox')) targets.push(path.join(process.cwd(), '.blackbox', 'skills'));
    if (args.includes('--cline')) targets.push(path.join(process.cwd(), '.cline', 'skills'));
    if (args.includes('--amp')) targets.push(path.join(process.cwd(), '.amp', 'skills'));
    if (args.includes('--openclaw')) targets.push(path.join(process.cwd(), '.openclaw', 'skills'));
    if (args.includes('--global') || args.includes('-g')) targets.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
    
    if (args.includes('--all-agents')) {
      AGENT_PLATFORMS.forEach(p => targets.push(path.join(process.cwd(), p.path)));
      targets.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
    }

    // Default target if none specified
    if (targets.length === 0) {
      targets.push(path.join(process.cwd(), '.agents', 'skills'));
    }

    targets = [...new Set(targets)];

    if (isAll) {
      printBanner();
      console.log(color.bold(`📦 Installing Full Master Suite (12 Skills) into ${targets.length} target(s)...\n`));
      for (const s of COMMUNITY_SKILLS) {
        await installSingleSkill(s.id, targets);
      }
      console.log(color.green('\n✨ All 12 skills mounted successfully!\n'));
      return;
    }

    // Pack support: `tidyfactor add pack:design`
    if (skillArg && skillArg.startsWith('pack:')) {
      const packId = skillArg.replace('pack:', '');
      const pack = PACKS[packId];
      if (!pack) {
        console.log(color.red(`\n❌ Unknown pack: "${packId}". Available packs: ${Object.keys(PACKS).join(', ')}\n`));
        return;
      }
      printBanner();
      console.log(color.bold(`📦 Installing Pack: ${color.cyan(pack.name)} (${pack.skills.length} skills)...\n`));
      let count = 0;
      for (const s of pack.skills) {
        const ok = await installSingleSkill(s, targets);
        if (ok) count++;
      }
      console.log(color.green(`\n✨ Pack "${pack.name}" — ${count}/${pack.skills.length} skills mounted!\n`));
      return;
    }

    if (!skillArg) {
      await runInteractiveWizard();
      return;
    }

    printBanner();
    await installSingleSkill(skillArg, targets);
    return;
  }

  if (command === 'doctor' || command === 'check') {
    printBanner();
    const env = detectProjectEnvironment(process.cwd());
    console.log(color.bold('🩺 Workspace Diagnostics & 18+ Agent Readiness:'));
    console.log(`  • Workspace Path:     ${color.cyan(env.cwd)}`);
    console.log(`  • Detected Stack:     ${color.green(color.bold(env.projectType))} ${color.dim(`(${env.frameworks.join(', ') || 'None'})`)}`);
    console.log(`  • Recommended Skills: ${color.yellow(env.recommendedSkillIds.join(', '))}`);
    console.log(`  • Active Agents:      ${env.detectedAgents.length > 0 ? env.detectedAgents.map(a => `${a.name} (${color.cyan(a.path)})`).join('\n                        ') : color.dim('Universal Mode (.agents/skills ready)')}`);
    console.log(`  • Registry Host:      ${color.cyan(REGISTRY_HOST)} (${REGISTRY_API_PATH})\n`);
    return;
  }

  // Help fallback
  printBanner();
  console.log(`
${color.bold('USAGE:')}
  ${color.green('npx @tidyfactor/cli')}                  # Launch interactive Setup Wizard
  ${color.green('npx @tidyfactor/cli init')}             # Interactive 3-step setup & recommendation
  ${color.green('npx @tidyfactor/cli list')}             # List all 12 skills & commands
  ${color.green('npx @tidyfactor/cli packs')}            # List curated workflow packs
  ${color.green('npx @tidyfactor/cli add <skill>')}      # Install & unpack a specific skill
  ${color.green('npx @tidyfactor/cli add pack:<id>')}    # Install a curated pack (design, saas, etc.)
  ${color.green('npx @tidyfactor/cli add --all')}        # Install entire 12-skill master suite
  ${color.green('npx @tidyfactor/cli doctor')}           # Workspace diagnostics & agent check

${color.bold('IDE TARGET FLAGS (18+ SUPPORTED):')}
  ${color.cyan('--trae')}                                    # Mount to .trae/skills/
  ${color.cyan('--cursor')}                                  # Mount to .cursor/skills/
  ${color.cyan('--windsurf')}                                # Mount to .windsurf/skills/
  ${color.cyan('--copilot')}                                 # Mount to .github/prompts/
  ${color.cyan('--roo, --roocode')}                          # Mount to .roo/skills/
  ${color.cyan('--opencode')}                                # Mount to .opencode/skills/
  ${color.cyan('--kilocode, --kilo')}                        # Mount to .kilocode/skills/
  ${color.cyan('--warp')}                                    # Mount to .warp/skills/
  ${color.cyan('--kiro')}                                    # Mount to .kiro/skills/
  ${color.cyan('--claude')}                                  # Mount to .claude/skills/
  ${color.cyan('--zed')}                                     # Mount to .zed/skills/
  ${color.cyan('--jetbrains')}                               # Mount to .jetbrains/skills/
  ${color.cyan('--blackbox')}                                # Mount to .blackbox/skills/
  ${color.cyan('--cline')}                                   # Mount to .cline/skills/
  ${color.cyan('--amp')}                                     # Mount to .amp/skills/
  ${color.cyan('--openclaw')}                                # Mount to .openclaw/skills/
  ${color.cyan('--all-agents')}                              # Mount to ALL active agents simultaneously
  ${color.cyan('--global, -g')}                              # Mount to global ~/.gemini/config/skills/
`);
}

main().catch(err => {
  console.error(color.red(`\n❌ Error: ${err.message}\n`));
  process.exit(1);
});
