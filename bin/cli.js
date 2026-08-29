#!/usr/bin/env node
/**
 * TidyFactor CLI — Universal Agent Skill Manager & Interactive Setup Wizard
 * Intelligent project environment detection, interactive skill recommendations,
 * and automated zero-dependency unpacking across 10+ AI Agent IDEs (Antigravity, Cursor, Claude, Windsurf, Cline, Codex).
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

const VERSION = '1.6.0';
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
  │  Interactive Setup & Multi-Agent Environment Installer     │
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

  // 10+ AI Agent Discovery Matrix
  if (hasFile('.agents') || hasFile('.agents/skills')) {
    env.detectedAgents.push({ id: 'antigravity', name: 'Google Antigravity / Gemini', path: '.agents/skills', active: true });
  }
  if (hasFile('.cursor') || hasFile('.cursor/skills')) {
    env.detectedAgents.push({ id: 'cursor', name: 'Cursor IDE', path: '.cursor/skills', active: true });
  }
  if (hasFile('.claude') || fs.existsSync(path.join(os.homedir(), '.claude'))) {
    env.detectedAgents.push({ id: 'claude', name: 'Claude Code', path: '.claude/skills', active: true });
  }
  if (hasFile('.windsurf') || hasFile('.windsurfrules')) {
    env.detectedAgents.push({ id: 'windsurf', name: 'Windsurf Cascade', path: '.windsurf/skills', active: true });
  }
  if (hasFile('.clinerules') || hasFile('.cline')) {
    env.detectedAgents.push({ id: 'cline', name: 'Cline / VS Code', path: '.cline/skills', active: true });
  }
  if (hasFile('.amprules') || hasFile('.amp')) {
    env.detectedAgents.push({ id: 'amp', name: 'AMP AI', path: '.amp/skills', active: true });
  }
  if (hasFile('codex.md') || hasFile('AGENTS.md')) {
    env.detectedAgents.push({ id: 'codex', name: 'OpenAI Codex', path: '.agents/skills', active: true });
  }
  if (hasFile('.github/copilot-instructions.md')) {
    env.detectedAgents.push({ id: 'copilot', name: 'GitHub Copilot', path: '.agents/skills', active: true });
  }
  if (hasFile('.openclaw') || hasFile('.clawdbot')) {
    env.detectedAgents.push({ id: 'openclaw', name: 'OpenClaw Agent', path: '.openclaw/skills', active: true });
  }
  if (hasFile('.vscode')) {
    env.detectedAgents.push({ id: 'vscode', name: 'VS Code Native', path: '.agents/skills', active: false });
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
  let cleanId = skillId.replace(/^@alwkala\//, '');
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

  // Strategy 2 (Primary Network): Official NPM / NPX Package Runner
  let npmSuccess = false;
  try {
    execSync(`npx -y @alwkala/${cleanId} add-skill`, { stdio: 'ignore', timeout: 20000 });
    
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
      console.log(`${color.green('✔')} ${color.cyan('[NPM Registry]')}`);
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
    console.log(`│ • AI Agents:   ${env.detectedAgents.map(a => color.yellow(a.name)).join(', ')}`);
  } else {
    console.log(`│ • AI Agents:   ${color.dim('None detected (will default to .agents/skills/)')}`);
  }
  console.log(color.cyan('└─────────────────────────────────────────────────────────────┘'));

  // Target IDE Agent Mount Matrix
  console.log(color.cyan('\n┌── [Step 2/3] Choose Target IDE Agent(s) ────────────────────┐'));
  console.log(`│  ${color.green('1)')} ${color.bold('Current Workspace')}   ${color.cyan('.agents/skills/')}  ${color.yellow('(Antigravity, Codex, OpenClaw)')}`);
  console.log(`│  ${color.green('2)')} ${color.bold('Cursor IDE')}          ${color.cyan('.cursor/skills/')}  ${color.dim('(Cursor rules auto-load)')}`);
  console.log(`│  ${color.green('3)')} ${color.bold('Claude Code')}         ${color.cyan('.claude/skills/')}  ${color.dim('(Claude project memory)')}`);
  console.log(`│  ${color.green('4)')} ${color.bold('Windsurf Cascade')}    ${color.cyan('.windsurf/skills/')}${color.dim('(Windsurf project skills)')}`);
  console.log(`│  ${color.green('5)')} ${color.bold('Cline / VS Code')}     ${color.cyan('.cline/skills/')}   ${color.dim('(Cline custom skills)')}`);
  console.log(`│  ${color.green('6)')} ${color.bold('Global User Hub')}     ${color.cyan('~/.gemini/config/skills/')} ${color.dim('(Cross-project)')}`);
  console.log(`│  ${color.green('7)')} ⚡ ${color.bold('Auto Multi-Mount')}   ${color.magenta('Mount to ALL active agents simultaneously')}`);
  console.log(color.cyan('└─────────────────────────────────────────────────────────────┘'));
  
  const targetChoice = await promptQuestion(`\nSelect Target IDE [1-7, default: 1]: `);
  
  let targetPaths = [];
  if (targetChoice === '2') {
    targetPaths.push(path.join(cwd, '.cursor', 'skills'));
  } else if (targetChoice === '3') {
    targetPaths.push(path.join(cwd, '.claude', 'skills'));
  } else if (targetChoice === '4') {
    targetPaths.push(path.join(cwd, '.windsurf', 'skills'));
  } else if (targetChoice === '5') {
    targetPaths.push(path.join(cwd, '.cline', 'skills'));
  } else if (targetChoice === '6') {
    targetPaths.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
  } else if (targetChoice === '7') {
    targetPaths.push(path.join(cwd, '.agents', 'skills'));
    if (env.detectedAgents.some(a => a.id === 'cursor')) targetPaths.push(path.join(cwd, '.cursor', 'skills'));
    if (env.detectedAgents.some(a => a.id === 'claude')) targetPaths.push(path.join(cwd, '.claude', 'skills'));
    if (env.detectedAgents.some(a => a.id === 'windsurf')) targetPaths.push(path.join(cwd, '.windsurf', 'skills'));
    if (env.detectedAgents.some(a => a.id === 'cline')) targetPaths.push(path.join(cwd, '.cline', 'skills'));
    targetPaths.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
  } else {
    targetPaths.push(path.join(cwd, '.agents', 'skills'));
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
  console.log(`  • ${color.bold('Google Antigravity / Gemini')}: Skills are instantly loaded from ${color.yellow('.agents/skills/')}`);
  console.log(`  • ${color.bold('Cursor IDE & Windsurf')}:       Use slash commands like ${color.cyan('/hero')}, ${color.cyan('/component')} in chat`);
  console.log(`  • ${color.bold('Claude Code')}:                 Ask Claude to apply the skill (e.g. "Use tidyfactor-styler to redesign this hero")`);
  console.log(`  • ${color.bold('OpenAI Codex / Cline')}:        Directly referenced in agent workspace memory\n`);

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
    console.log(`💡 Run ${color.green('npx @alwkala/tidyfactor init')} for the interactive wizard.\n`);
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
    console.log(`💡 Install a pack: ${color.green('npx @alwkala/tidyfactor add pack:design')}\n`);
    return;
  }

  if (command === 'add' || command === 'install') {
    const skillArg = args[1];
    const isAll = args.includes('--all') || skillArg === 'all';
    const isCursor = args.includes('--cursor');
    const isClaude = args.includes('--claude');
    const isWindsurf = args.includes('--windsurf');
    const isCline = args.includes('--cline');
    const isGlobal = args.includes('--global') || args.includes('-g');
    
    let targets = [];
    if (isCursor) targets.push(path.join(process.cwd(), '.cursor', 'skills'));
    else if (isClaude) targets.push(path.join(process.cwd(), '.claude', 'skills'));
    else if (isWindsurf) targets.push(path.join(process.cwd(), '.windsurf', 'skills'));
    else if (isCline) targets.push(path.join(process.cwd(), '.cline', 'skills'));
    else if (isGlobal) targets.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
    else targets.push(path.join(process.cwd(), '.agents', 'skills'));

    if (isAll) {
      printBanner();
      console.log(color.bold(`📦 Installing Full Master Suite (12 Skills)...\n`));
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
    console.log(color.bold('🩺 Workspace Diagnostics & Agent Readiness:'));
    console.log(`  • Workspace Path:     ${color.cyan(env.cwd)}`);
    console.log(`  • Detected Stack:     ${color.green(color.bold(env.projectType))} ${color.dim(`(${env.frameworks.join(', ') || 'None'})`)}`);
    console.log(`  • Recommended Skills: ${color.yellow(env.recommendedSkillIds.join(', '))}`);
    console.log(`  • Active Agents:      ${env.detectedAgents.length > 0 ? env.detectedAgents.map(a => `${a.name} (${a.path})`).join(', ') : color.dim('None (default .agents/skills ready)')}`);
    console.log(`  • Registry Host:      ${color.cyan(REGISTRY_HOST)} (${REGISTRY_API_PATH})\n`);
    return;
  }

  // Help fallback
  printBanner();
  console.log(`
${color.bold('USAGE:')}
  ${color.green('npx @alwkala/tidyfactor')}                  # Launch interactive Setup Wizard
  ${color.green('npx @alwkala/tidyfactor init')}             # Interactive 3-step setup & recommendation
  ${color.green('npx @alwkala/tidyfactor list')}             # List all 12 skills & commands
  ${color.green('npx @alwkala/tidyfactor packs')}            # List curated workflow packs
  ${color.green('npx @alwkala/tidyfactor add <skill>')}      # Install & unpack a specific skill
  ${color.green('npx @alwkala/tidyfactor add pack:<id>')}    # Install a curated pack (design, saas, etc.)
  ${color.green('npx @alwkala/tidyfactor add --all')}        # Install entire 12-skill master suite
  ${color.green('npx @alwkala/tidyfactor doctor')}           # Workspace diagnostics & agent check

${color.bold('IDE TARGET FLAGS:')}
  ${color.cyan('--cursor')}                                  # Mount to .cursor/skills/
  ${color.cyan('--claude')}                                  # Mount to .claude/skills/
  ${color.cyan('--windsurf')}                                # Mount to .windsurf/skills/
  ${color.cyan('--cline')}                                   # Mount to .cline/skills/
  ${color.cyan('--global, -g')}                              # Mount to global ~/.gemini/config/skills/
`);
}

main().catch(err => {
  console.error(color.red(`\n❌ Error: ${err.message}\n`));
  process.exit(1);
});
