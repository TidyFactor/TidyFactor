#!/usr/bin/env node
/**
 * TidyFactor CLI — Universal Agent Skill Manager & Interactive Setup Wizard
 * Intelligent project environment detection, interactive skill recommendations,
 * and automated zero-dependency unpacking across Antigravity, Claude Code, Cursor, and Codex.
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

const VERSION = '1.5.0';
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

// Official Packs — curated skill bundles for common workflows
const PACKS = {
  'design':      { name: 'Design & Frontend Triad', skills: ['tidyfactor-cinematic', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-skill-architect'] },
  'saas':        { name: 'SaaS Starter Kit', skills: ['tidyfactor-next', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-marketing', 'tidyfactor-doc'] },
  'engineering': { name: 'Full-Stack Engineering', skills: ['tidyfactor-php', 'tidyfactor-htmx', 'tidyfactor-js', 'tidyfactor-html', 'tidyfactor-doc'] },
  'governance':  { name: 'Governance & Documentation', skills: ['tidyfactor-skill-architect', 'tidyfactor-doc', 'tidyfactor-github'] },
  'growth':      { name: 'Growth & Marketing', skills: ['tidyfactor-marketing', 'tidyfactor-cinematic', 'tidyfactor-styler', 'tidyfactor-html'] },
};

// Color helpers
const color = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  magenta: (s) => `\x1b[35m${s}\x1b[0m`,
  bgCyan: (s) => `\x1b[46m\x1b[30m${s}\x1b[0m`
};

function printBanner() {
  console.log(color.cyan(color.bold(`
  ╔═══════════════════════════════════════════════════════════════╗
  ║    ⚡ TidyFactor Universal Architecture & Skill Engine        ║
  ║    Interactive Setup & Multi-Agent Environment Installer      ║
  ║    v${VERSION.padEnd(54)}║
  ╚═══════════════════════════════════════════════════════════════╝
  `)));
}

// ─── Environment & Project Auto-Detection ────────────────────────
function detectProjectEnvironment(targetDir = process.cwd()) {
  const env = {
    cwd: targetDir,
    projectType: 'Generic / Standalone',
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
        env.projectType = 'Next.js SaaS / Web Application';
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
    env.projectType = 'PHP / Modular Web Application';
    env.recommendedSkillIds.push('tidyfactor-php', 'tidyfactor-htmx', 'tidyfactor-styler', 'tidyfactor-doc');
  }

  if (hasFile('index.html') && !env.frameworks.includes('Next.js') && !env.frameworks.includes('React')) {
    env.frameworks.push('Static HTML5');
    if (env.projectType === 'Generic / Standalone') env.projectType = 'Static Website / Landing Page';
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

  // Detect Active AI Agent Directories
  if (hasFile('.agents') || hasFile('.agents/skills')) {
    env.detectedAgents.push({ name: 'Google Antigravity / Gemini IDE', path: '.agents/skills', active: true });
  }
  if (hasFile('.cursor') || hasFile('.cursor/skills')) {
    env.detectedAgents.push({ name: 'Cursor IDE', path: '.cursor/skills', active: true });
  }
  if (hasFile('.claude') || fs.existsSync(path.join(os.homedir(), '.claude'))) {
    env.detectedAgents.push({ name: 'Claude Code', path: '.claude/skills', active: true });
  }
  if (hasFile('.windsurf') || hasFile('.windsurfrules')) {
    env.detectedAgents.push({ name: 'Windsurf', path: '.windsurf/skills', active: true });
  }
  if (hasFile('.github/copilot-instructions.md')) {
    env.detectedAgents.push({ name: 'GitHub Copilot', path: '.agents/skills', active: true });
  }
  if (hasFile('.clinerules') || hasFile('.cline')) {
    env.detectedAgents.push({ name: 'Cline', path: '.cline/skills', active: true });
  }
  if (hasFile('.amprules') || hasFile('.amp')) {
    env.detectedAgents.push({ name: 'AMP', path: '.amp/skills', active: true });
  }
  if (hasFile('codex.md') || hasFile('AGENTS.md')) {
    env.detectedAgents.push({ name: 'OpenAI Codex', path: '.agents/skills', active: true });
  }
  if (hasFile('.vscode')) {
    env.detectedAgents.push({ name: 'VS Code', path: '.agents/skills', active: false });
  }

  // Deduplicate recommendations
  env.recommendedSkillIds = [...new Set(env.recommendedSkillIds)];
  return env;
}

// ─── Native Unpacking Engine (Extracts .skill into full directory) ──
function extractArchiveNative(archivePath, destinationDir) {
  fs.mkdirSync(destinationDir, { recursive: true });

  const isWin = process.platform === 'win32';
  try {
    if (isWin) {
      // Windows PowerShell Expand-Archive (supports .zip and .skill)
      const psCmd = `powershell -NoProfile -Command "Expand-Archive -Path '${archivePath}' -DestinationPath '${destinationDir}' -Force"`;
      execSync(psCmd, { stdio: 'ignore' });
      return true;
    } else {
      // Unix unzip or tar
      try {
        execSync(`unzip -q -o "${archivePath}" -d "${destinationDir}"`, { stdio: 'ignore' });
        return true;
      } catch {
        execSync(`tar -xf "${archivePath}" -C "${destinationDir}"`, { stdio: 'ignore' });
        return true;
      }
    }
  } catch (err) {
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
        fs.unlinkSync(destPath);
        return resolve(downloadFile(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
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

// ─── Install a Specific Skill with Full Extraction ───────────────
async function installSingleSkill(skillId, targetLocations) {
  let cleanId = skillId.replace(/^@alwkala\//, '');
  if (!cleanId.startsWith('tidyfactor-') && COMMUNITY_SKILLS.some(s => s.id === `tidyfactor-${cleanId}`)) {
    cleanId = `tidyfactor-${cleanId}`;
  }

  const tempSkillZip = path.join(os.tmpdir(), `tf_${cleanId}_${Date.now()}.zip`);
  const downloadUrl = `https://${REGISTRY_HOST}/downloads/skills/${cleanId}.skill`;

  process.stdout.write(`  ⏳ Downloading ${color.bold(cleanId)}... `);

  // Check if available locally in Skills-LAB first
  let localSkillDir = path.resolve(__dirname, '..', '..', cleanId);
  if (!fs.existsSync(localSkillDir)) {
    localSkillDir = path.resolve(__dirname, '..', cleanId);
  }

  let sourceReady = false;
  if (fs.existsSync(localSkillDir) && fs.existsSync(path.join(localSkillDir, 'SKILL.md'))) {
    // Local copy
    sourceReady = true;
    for (const targetDir of targetLocations) {
      const dest = path.join(targetDir, cleanId);
      fs.mkdirSync(dest, { recursive: true });
      copyDirRecursive(localSkillDir, dest);
    }
    console.log(`${color.green('✔')} ${color.dim('(Local fast sync)')}`);
    return true;
  }

  try {
    await downloadFile(downloadUrl, tempSkillZip);
    
    // Extract into each target location
    for (const targetDir of targetLocations) {
      const dest = path.join(targetDir, cleanId);
      fs.mkdirSync(dest, { recursive: true });
      const ok = extractArchiveNative(tempSkillZip, dest);
      if (!ok) {
        throw new Error('Native extraction failed');
      }

      // Check and flatten if the archive contained a nested root folder
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
    console.log(`${color.green('✔ Installed & Mounted')}`);
    return true;
  } catch (err) {
    if (fs.existsSync(tempSkillZip)) fs.unlinkSync(tempSkillZip);
    console.log(`${color.yellow('⚠ Falling back to NPM runner...')}`);
    try {
      execSync(`npx -y @alwkala/${cleanId} add-skill`, { stdio: 'ignore' });
      console.log(`  ${color.green('✔')} ${cleanId} installed via NPM.`);
      return true;
    } catch (npmErr) {
      console.log(`  ${color.red('✖')} Failed: ${err.message}`);
      return false;
    }
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

  console.log(color.bold('🔍 Scanning Workspace Environment...'));
  console.log(`  • Project Path:       ${color.cyan(cwd)}`);
  console.log(`  • Detected Stack:     ${color.green(color.bold(env.projectType))} ${color.dim(`(${env.frameworks.join(', ') || 'None'})`)}`);
  
  if (env.detectedAgents.length > 0) {
    console.log(`  • Active AI Agents:   ${env.detectedAgents.map(a => color.yellow(a.name)).join(', ')}`);
  } else {
    console.log(`  • Active AI Agents:   ${color.dim('None detected (will initialize .agents/skills default)')}`);
  }

  console.log('\n' + color.cyan('─────────────────────────────────────────────────────────────────────────────'));
  console.log(color.bold('🎯 Choose Installation Target:'));
  console.log(`  ${color.green('1)')} Current Workspace: ${color.cyan('.agents/skills/')} ${color.yellow('(Recommended for Antigravity, Claude, Codex)')}`);
  console.log(`  ${color.green('2)')} Cursor IDE:        ${color.cyan('.cursor/skills/')} ${color.dim('(Auto-loaded in Cursor rules)')}`);
  console.log(`  ${color.green('3)')} Global User Hub:   ${color.cyan('~/.gemini/config/skills/')} ${color.dim('(Available in all projects)')}`);
  console.log(`  ${color.green('4)')} Multi-Agent Sync:  ${color.cyan('All of the above (Workspace + Cursor + Global)')}`);
  
  const targetChoice = await promptQuestion(`\nSelect target [1-4, default: 1]: `);
  
  let targetPaths = [];
  if (targetChoice === '2') {
    targetPaths.push(path.join(cwd, '.cursor', 'skills'));
  } else if (targetChoice === '3') {
    targetPaths.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
  } else if (targetChoice === '4') {
    targetPaths.push(path.join(cwd, '.agents', 'skills'));
    targetPaths.push(path.join(cwd, '.cursor', 'skills'));
    targetPaths.push(path.join(os.homedir(), '.gemini', 'config', 'skills'));
  } else {
    targetPaths.push(path.join(cwd, '.agents', 'skills'));
  }

  console.log('\n' + color.cyan('─────────────────────────────────────────────────────────────────────────────'));
  console.log(color.bold('📦 Choose Skills to Install:'));
  console.log(`  ${color.green('1)')} 🌟 ${color.bold('Recommended for your stack')} (${env.recommendedSkillIds.length} skills: ${env.recommendedSkillIds.map(s => s.replace('tidyfactor-', '')).join(', ')})`);
  console.log(`  ${color.green('2)')} 👑 ${color.bold('Master Suite — All 12 Community Skills')} (Complete Ecosystem)`);
  console.log(`  ${color.green('3)')} 🎯 ${color.bold('Design & Frontend Triad')} (Cinematic + Design + Styler)`);
  console.log(`  ${color.green('4)')} 🛠️  ${color.bold('Custom Selection')} (Select manually by ID)`);

  const skillChoice = await promptQuestion(`\nSelect package [1-4, default: 1]: `);

  let skillsToInstall = [];
  if (skillChoice === '2') {
    skillsToInstall = COMMUNITY_SKILLS.map(s => s.id);
  } else if (skillChoice === '3') {
    skillsToInstall = ['tidyfactor-cinematic', 'tidyfactor-design', 'tidyfactor-styler', 'tidyfactor-skill-architect'];
  } else if (skillChoice === '4') {
    console.log('\nAvailable Skills:');
    COMMUNITY_SKILLS.forEach((s, idx) => {
      console.log(`  ${idx + 1}. ${color.green(s.id.padEnd(28))} ${color.dim(s.desc.slice(0, 50))}...`);
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
  console.log(color.green(color.bold(`✨ Setup Complete! ${installedCount}/${skillsToInstall.length} Skills successfully mounted and ready.`)));
  console.log(color.cyan('═════════════════════════════════════════════════════════════════════════════'));
  
  console.log(color.bold('\n💡 How to use with your AI Coding Agents:\n'));
  console.log(`  • ${color.bold('Google Antigravity / Gemini')}: Skills are instantly active via ${color.yellow('.agents/skills/')}`);
  console.log(`  • ${color.bold('Cursor & Windsurf')}:          Prompt directly with ${color.cyan('/<command>')} or ask the agent to apply the skill`);
  console.log(`  • ${color.bold('Claude Code')}:                Trigger via command name (e.g. "Use tidyfactor-styler to redesign this hero")\n`);

  console.log(color.bold('🔥 Quick Triggers to Try Now:'));
  skillsToInstall.slice(0, 4).forEach(sId => {
    const s = COMMUNITY_SKILLS.find(x => x.id === sId);
    if (s) {
      console.log(`  - ${color.green(s.id)}: Try commands ${s.commands.slice(0, 3).map(c => color.cyan(c)).join(', ')}`);
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
    console.log(color.cyan('─────────────────────────────────────────────────────────────────────────────'));
    console.log(`${color.bold('ID'.padEnd(30))} ${color.bold('CATEGORY'.padEnd(14))} ${color.bold('COMMANDS')}`);
    console.log(color.cyan('─────────────────────────────────────────────────────────────────────────────'));
    COMMUNITY_SKILLS.forEach(s => {
      console.log(`${color.green(s.id.padEnd(30))} ${color.yellow(s.category.toUpperCase().padEnd(14))} ${color.dim(s.commands.join(', '))}`);
    });
    console.log(color.cyan('─────────────────────────────────────────────────────────────────────────────\n'));
    console.log(`💡 Run ${color.green('npx @alwkala/tidyfactor init')} for interactive setup.\n`);
    return;
  }

  if (command === 'add' || command === 'install') {
    const skillArg = args[1];
    const isAll = args.includes('--all') || skillArg === 'all';
    const isCursor = args.includes('--cursor');
    const isGlobal = args.includes('--global') || args.includes('-g');
    
    let targets = [];
    if (isCursor) targets.push(path.join(process.cwd(), '.cursor', 'skills'));
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

  if (command === 'packs') {
    printBanner();
    console.log(color.bold('📦 Available Skill Packs:\n'));
    for (const [id, pack] of Object.entries(PACKS)) {
      console.log(`  ${color.green(`pack:${id}`.padEnd(22))} ${color.bold(pack.name)}`);
      console.log(`  ${' '.repeat(22)} ${color.dim(pack.skills.map(s => s.replace('tidyfactor-', '')).join(', '))}\n`);
    }
    console.log(`💡 Install a pack: ${color.green('npx @alwkala/tidyfactor add pack:design')}\n`);
    return;
  }

  if (command === 'doctor' || command === 'check') {
    printBanner();
    const env = detectProjectEnvironment(process.cwd());
    console.log(color.bold('🩺 Workspace Diagnostics:'));
    console.log(`  • Stack:            ${color.cyan(env.projectType)} (${env.frameworks.join(', ') || 'None'})`);
    console.log(`  • Recommended:      ${env.recommendedSkillIds.join(', ')}`);
    console.log(`  • Active Agents:    ${env.detectedAgents.map(a => a.name).join(', ') || 'None'}\n`);
    return;
  }

  // Help fallback
  printBanner();
  console.log(`
${color.bold('USAGE:')}
  ${color.green('npx @alwkala/tidyfactor')}                  # Launch interactive Setup Wizard
  ${color.green('npx @alwkala/tidyfactor init')}             # Interactive setup & recommendation
  ${color.green('npx @alwkala/tidyfactor list')}             # List all 12 skills
  ${color.green('npx @alwkala/tidyfactor packs')}            # List available skill packs
  ${color.green('npx @alwkala/tidyfactor add <skill>')}      # Install & unpack a specific skill
  ${color.green('npx @alwkala/tidyfactor add pack:<id>')}    # Install a curated skill pack
  ${color.green('npx @alwkala/tidyfactor add --all')}        # Install entire 12-skill suite
  ${color.green('npx @alwkala/tidyfactor doctor')}           # Workspace diagnostics
`);
}

main().catch(err => {
  console.error(color.red(`\n❌ Error: ${err.message}\n`));
  process.exit(1);
});
