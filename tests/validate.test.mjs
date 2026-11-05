import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, cpSync, readFileSync, writeFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const run = (dir, args = []) => spawnSync(process.execPath, [join(root, 'tools/validate.mjs'), dir, ...args], { encoding: 'utf8' });
function fixture(change, args = []) {
  const dir = mkdtempSync(join(tmpdir(), 'mdl-cursor-test-'));
  try {
    for (const name of ['.cursor-plugin', 'mcp.json', 'skills', 'assets', 'README.md', 'UPSTREAM.json', 'THIRD_PARTY_NOTICES.md', 'docs', 'CONTRIBUTING.md', 'licenses', 'LICENSE', 'LICENSE-SCOPE.md','RELEASE-0.3.1.md','RELEASE-0.3.2.md','RELEASE-0.3.3.md']) {
      cpSync(join(root, name), join(dir, name), { recursive: true });
    }
    if (args.includes('--release')) changeJSON(dir, 'UPSTREAM.json', u => { u.commit = '1'.repeat(40); }); // Synthetic pinned fixture for license tests.
    change(dir);
    return run(dir, args);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
function changeJSON(dir, file, change) {
  const path = join(dir, file), data = JSON.parse(readFileSync(path));
  change(data); writeFileSync(path, JSON.stringify(data));
}
function refused(result, pattern) {
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, pattern);
}

test('complete production package validates', () => {
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /7 skills/);
});
test('rejects wrong plugin identifier', () => refused(fixture(d => changeJSON(d, '.cursor-plugin/plugin.json', m => m.name='Wrong Name')), /name/));
test('rejects staging endpoint', () => refused(fixture(d => changeJSON(d, 'mcp.json', m => m.mcpServers['markdown-logic'].url='https://staging-mcp.markdownlogic.com')), /endpoint/));
test('rejects credentials in otherwise valid remote configuration', () => refused(fixture(d => changeJSON(d, 'mcp.json', m => m.mcpServers['markdown-logic'].headers={Authorization:'Bearer synthetic-test-value'})), /configuration/));
test('rejects additional server that could exfiltrate source', () => refused(fixture(d => changeJSON(d, 'mcp.json', m => m.mcpServers.extra={url:'https://example.com/mcp'})), /servers/));
test('rejects hooks and unexpected component declarations', () => refused(fixture(d => changeJSON(d, '.cursor-plugin/plugin.json', m => m.hooks={hooks:{}})), /manifest field/));
test('rejects paths escaping plugin root', () => refused(fixture(d => changeJSON(d, '.cursor-plugin/plugin.json', m => m.logo='../logo.svg')), /path/));
test('rejects missing skill references', () => refused(fixture(d => rmSync(join(d,'skills/project-artifacts/references/actions.md'))), /reference|missing/));
test('rejects invalid skill frontmatter', () => refused(fixture(d => writeFileSync(join(d,'skills/project-artifacts/SKILL.md'),'# No frontmatter')), /frontmatter/));
test('rejects upstream content drift', () => refused(fixture(d => writeFileSync(join(d,'skills/project-artifacts/SKILL.md'),readFileSync(join(d,'skills/project-artifacts/SKILL.md'),'utf8')+'\nChanged.\n')), /digest/));
test('rejects symlinks to external files', () => refused(fixture(d => {rmSync(join(d,'assets/logo.svg'));symlinkSync('/etc/hosts',join(d,'assets/logo.svg'));}), /symlink/));
test('rejects private environment files in publication tree', () => refused(fixture(d => writeFileSync(join(d,'.env'),'SYNTHETIC=test')), /Unexpected file/));

test('unmodified isolated fixture validates', () => { const result = fixture(() => {}); assert.equal(result.status,0,result.stderr); });

test('release validation refuses an unlicensed package', () => refused(fixture(d => changeJSON(d, '.cursor-plugin/plugin.json', m => delete m.license), ['--release']), /license/));
test('release validation accepts an explicit license and retained notice', () => { const result=fixture(d => { changeJSON(d, '.cursor-plugin/plugin.json', m => m.license='MIT'); cpSync(join(d,'licenses/upstream-skills-MIT.txt'),join(d,'LICENSE')); }, ['--release']); assert.equal(result.status,0,result.stderr); });

test('rejects missing upstream MIT license notice', () => refused(fixture(d => rmSync(join(d,'licenses/upstream-skills-MIT.txt'))), /missing/));

test('unpublished preparation refuses release validation', () => refused(fixture(d => changeJSON(d, 'UPSTREAM.json', u => { u.commit = null; u.status = 'prepared-unpublished'; }), ['--release']), /provenance/));
