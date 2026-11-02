function check(value, message) { if (!value) throw new Error(message); }
export function validateMetadata(resource, auth) {
  check(resource.resource === 'https://mcp.markdownlogic.com', 'Unexpected protected resource');
  check(JSON.stringify(resource.authorization_servers) === JSON.stringify(['https://auth.markdownlogic.com']), 'Unexpected resource issuer');
  const expected = ['documents:read','documents:write','projects:read','releases:read'].sort();
  check(Array.isArray(resource.scopes_supported) && JSON.stringify([...resource.scopes_supported].sort()) === JSON.stringify(expected), 'Unexpected MCP resource scopes');
  check(resource.bearer_methods_supported?.includes('header'), 'Bearer header support missing');
  check(auth.issuer === 'https://auth.markdownlogic.com', 'Unexpected OAuth issuer');
  for (const [key,path] of Object.entries({authorization_endpoint:'/oauth/authorize',token_endpoint:'/oauth/token',registration_endpoint:'/register'})) {
    check(auth[key] === `https://auth.markdownlogic.com${path}`, `Unexpected ${key} endpoint`);
  }
  check(auth.grant_types_supported?.includes('authorization_code'), 'Authorization code not advertised');
  check(auth.code_challenge_methods_supported?.includes('S256'), 'PKCE S256 not advertised');
  check(auth.token_endpoint_auth_methods_supported?.includes('none'), 'Public OAuth client not advertised');
}
export function validateInitialize(rpc) {
  check(rpc.jsonrpc === '2.0' && rpc.id === 1 && rpc.result && !rpc.error, 'Public MCP initialization failed');
  check(['2025-11-25','2025-06-18','2025-03-26','2024-11-05'].includes(rpc.result.protocolVersion), 'Unsupported negotiated protocol');
  check(rpc.result.serverInfo?.name && rpc.result.capabilities?.tools, 'Public MCP tools capability missing');
}
export function validateTools(rpc) {
  check(rpc.jsonrpc === '2.0' && rpc.id === 2 && Array.isArray(rpc.result?.tools) && !rpc.error, 'Public tool catalog failed');
  const tool = rpc.result.tools.find(t => t.name === 'convert_markdown');
  check(tool, 'Public convert_markdown is unavailable');
  const properties = tool.inputSchema?.properties;
  check(properties?.markdown?.type === 'string', 'Public Markdown input schema missing');
  check(['pdf','docx','html','epub'].every(f => properties.format?.enum?.includes(f)), 'Public conversion formats missing');
}
