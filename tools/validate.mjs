import { readFileSync, readdirSync, lstatSync, existsSync } from 'node:fs';
import { resolve, relative, dirname, join, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const release = process.argv.includes('--release');
const root = resolve(process.argv.slice(2).find(arg => arg !== '--release') || fileURLToPath(new URL('..', import.meta.url)));
function requireThat(value, message) { if (!value) throw new Error(message); }
function local(path) {
  requireThat(typeof path === 'string' && path.length && !isAbsolute(path) && !path.includes('\\') && !path.split('/').includes('..'), `Invalid relative path: ${path}`);
  return join(root, path);
}
function read(path) { requireThat(existsSync(local(path)), `Required file missing: ${path}`); return readFileSync(local(path), 'utf8'); }
function walk(path = '') {
  return readdirSync(join(root, path)).flatMap(name => {
    if (!path && name === '.git') return [];
    const rel = path ? `${path}/${name}` : name, stat = lstatSync(local(rel));
    requireThat(!stat.isSymbolicLink(), `Forbidden symlink: ${rel}`);
    return stat.isDirectory() ? walk(rel) : [rel];
  });
}
try {
  const files = walk();
  const allowed = /^(?:\.cursor-plugin\/plugin\.json|\.github\/workflows\/validate\.yml|\.gitignore|mcp\.json|package\.json|(?:README|LICENSE|LICENSE-SCOPE|THIRD_PARTY_NOTICES|CONTRIBUTING)\.md|LICENSE|UPSTREAM\.json|assets\/(?:icon|logo)\.svg|licenses\/upstream-skills-MIT\.txt|skills\/[a-z-]+\/(?:SKILL\.md|references\/[a-z-]+\.md)|docs\/[a-z-]+\.md|tools\/[a-z-]+\.mjs|tests\/[a-z-]+\.test\.mjs)$/;
  for (const file of files) requireThat(allowed.test(file), `Unexpected file in publication tree: ${file}`);
  const manifest = JSON.parse(read('.cursor-plugin/plugin.json'));
  const fields = new Set(['name','version','description','author','homepage','repository','license','keywords','logo','skills','mcpServers']);
  for (const key of Object.keys(manifest)) requireThat(fields.has(key), `Unsupported manifest field: ${key}`);
  requireThat(manifest.name === 'markdown-logic', 'Manifest name must be markdown-logic');
  requireThat(/^\d+\.\d+\.\d+$/.test(manifest.version), 'Manifest version must be semantic');
  requireThat(typeof manifest.description === 'string' && manifest.description.length > 40, 'Manifest description required');
  requireThat(manifest.author?.name === 'Lemuridae Labs', 'Manifest author required');
  requireThat(manifest.homepage === 'https://markdownlogic.com/', 'Unexpected homepage');
  requireThat(manifest.repository === 'https://github.com/Markdown-Logic/mcp-plugin-cursor', 'Unexpected repository');
  requireThat(Array.isArray(manifest.keywords) && manifest.keywords.every(k => typeof k === 'string'), 'Manifest keywords invalid');
  for (const path of [manifest.logo, manifest.skills, manifest.mcpServers]) local(path);
  requireThat(manifest.logo === 'assets/logo.svg' && manifest.skills === 'skills/' && manifest.mcpServers === 'mcp.json', 'Unexpected component path');
  read(manifest.logo);
  const config = JSON.parse(read('mcp.json'));
  requireThat(Object.keys(config).length === 1 && config.mcpServers && typeof config.mcpServers === 'object', 'Invalid MCP configuration');
  const expected = {'markdown-logic':'https://mcp.markdownlogic.com','markdown-logic-public':'https://markdownlogic.com/mcp'};
  requireThat(JSON.stringify(Object.keys(config.mcpServers).sort()) === JSON.stringify(Object.keys(expected).sort()), 'Unexpected MCP servers');
  for (const [name, url] of Object.entries(expected)) {
    const server = config.mcpServers[name];
    requireThat(server && Object.keys(server).length === 1 && typeof server.url === 'string', `Unsafe remote configuration for ${name}`);
    requireThat(server.url === url, `Unexpected production endpoint for ${name}`);
  }
  const skills = readdirSync(local('skills/'));
  requireThat(skills.length === 7, 'Expected 7 skills');
  for (const name of skills) {
    const path = `skills/${name}/SKILL.md`, text = read(path);
    const frontmatter = text.match(/^---\n([\s\S]+?)\n---\n/);
    requireThat(frontmatter, `Missing frontmatter: ${path}`);
    requireThat(frontmatter[1].includes(`name: ${name}\n`) && /^description: .+/m.test(frontmatter[1]), `Invalid frontmatter: ${path}`);
  }
  for (const file of files.filter(f => f.endsWith('.md'))) {
    for (const match of read(file).matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      const target = match[1]; if (/^(?:https?:|mailto:|#)/.test(target)) continue;
      const resolved = relative(root, resolve(root, dirname(file), target.split('#')[0]));
      requireThat(!resolved.startsWith('..') && existsSync(local(resolved)), `Broken local reference in ${file}: ${target}`);
    }
  }
  const upstream = JSON.parse(read('UPSTREAM.json'));
  requireThat(upstream.repository === 'https://github.com/Markdown-Logic/mcp-plugin-claude' && /^[a-f0-9]{40}$/.test(upstream.commit) && upstream.license === 'MIT', 'Invalid upstream provenance');
  for (const file of files.filter(f => f.startsWith('skills/') || f.startsWith('assets/'))) {
    const source = upstream.files[file]; requireThat(source, `Missing provenance: ${file}`);
    const hash = createHash('sha256').update(readFileSync(local(file))).digest('hex');
    requireThat(source.sha256 === hash, `Upstream digest mismatch: ${file}`);
    requireThat(source.upstreamSha256 === hash || source.change, `Unexplained upstream adaptation: ${file}`);
  }
  read('THIRD_PARTY_NOTICES.md');
  const notice = read('licenses/upstream-skills-MIT.txt');
  requireThat(notice.includes('MIT License') && notice.includes('Copyright (c) 2026 Lemuridae Labs') && notice.includes('Permission is hereby granted'), 'Upstream MIT notice is incomplete');
  if (release) requireThat(typeof manifest.license === 'string' && manifest.license.length > 0 && files.includes('LICENSE') && read('LICENSE').length > 100, 'Package license awaits owner approval; release validation refused');
  console.log(`Validated Cursor package: ${manifest.name} ${manifest.version}, ${skills.length} skills, 2 production remotes, ${files.length} files.`);
  if (!manifest.license || !files.includes('LICENSE')) console.log('Publication gate: package license awaits owner approval.');
} catch (error) { console.error(`Validation failed: ${error.message}`); process.exitCode = 1; }
