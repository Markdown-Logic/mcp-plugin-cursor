import { spawnSync } from 'node:child_process';
import { validateMetadata, validateInitialize, validateTools } from './remote-contract.mjs';

// Fixed public endpoints only. No credentials, OAuth registration, tools/call or retries.
function request(url, body, expected = 200) {
  const args = ['--silent','--show-error','--max-time','20','--proto','=https','--header','Accept: application/json','--write-out','\n%{http_code}'];
  if (body) args.push('--header','Content-Type: application/json','--data-binary','@-');
  args.push(url);
  const response = spawnSync('curl', args, {encoding:'utf8',input:body ? JSON.stringify(body) : undefined,maxBuffer:2*1024*1024});
  if (response.error || response.status !== 0) throw new Error(`Read-only request failed for ${new URL(url).host}: curl ${response.status ?? 'unavailable'}`);
  const split = response.stdout.lastIndexOf('\n'), status = Number(response.stdout.slice(split+1));
  if (status !== expected) throw new Error(`Read-only request to ${new URL(url).host} returned HTTP ${status}; expected ${expected}. No retry performed.`);
  try { return JSON.parse(response.stdout.slice(0,split)); } catch { throw new Error(`Non-JSON response from ${new URL(url).host}`); }
}
try {
  const resource = request('https://mcp.markdownlogic.com/.well-known/oauth-protected-resource');
  const auth = request('https://auth.markdownlogic.com/.well-known/oauth-authorization-server');
  validateMetadata(resource,auth);
  console.log('PASS production resource/issuer, MCP scopes, PKCE S256 and DCR discovery');
  const extraScopes = (auth.scopes_supported || []).filter(scope => !resource.scopes_supported.includes(scope));
  if (extraScopes.length) console.log(`REVIEW actual Cursor consent scope selection: authorization server also advertises ${extraScopes.join(', ')}. No grant performed.`);
  const initialize = {jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'markdown-logic-cursor-package-check',version:'0.1.0'}}};
  request('https://mcp.markdownlogic.com',initialize,401);
  console.log('PASS private MCP requires authorization before initialization');
  validateInitialize(request('https://markdownlogic.com/mcp',initialize));
  validateTools(request('https://markdownlogic.com/mcp',{jsonrpc:'2.0',id:2,method:'tools/list',params:{}}));
  console.log('PASS anonymous MCP initialize and convert_markdown catalog (PDF/DOCX/HTML/EPUB)');
  console.log('No conversion, grant, registration or document mutation performed. Cursor OAuth/install acceptance remains separate.');
} catch (error) { console.error(`Remote check failed: ${error.message}`); process.exitCode = 1; }
