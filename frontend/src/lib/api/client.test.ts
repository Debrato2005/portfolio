import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getJson, RequestError } from './client';

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/failure') {
    res.writeHead(503);
    res.end('{"secret":"internal error"}');
  } else if (req.url === '/invalid') res.end('{"name":42}');
  else if (req.url === '/broken') res.end('invalid JSON');
  else if (req.url === '/slow') {
    req.on('close', () => res.destroy());
  } else res.end('{"name":"Ada"}');
});
let origin: string;
function parseName(value: unknown): string {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('name' in value) ||
    typeof value.name !== 'string'
  )
    throw new Error('Invalid name');
  return value.name;
}
beforeAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(async () => {
  if (!server.listening) return;
  server.closeAllConnections();
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
});
describe('HTTP boundary with a real loopback server', () => {
  it('returns validated models', async () => {
    expect(await getJson(`${origin}/valid`, parseName)).toBe('Ada');
  });
  it('does not expose server response bodies', async () => {
    await expect(getJson(`${origin}/failure`, parseName)).rejects.toMatchObject(
      { status: 503, message: 'The request failed. Try again.' },
    );
  });
  it('rejects malformed JSON and invalid models with safe errors', async () => {
    for (const path of ['/invalid', '/broken'])
      await expect(getJson(origin + path, parseName)).rejects.toBeInstanceOf(
        RequestError,
      );
  });
  it('preserves cancellation rather than replacing it with data', async () => {
    const controller = new AbortController();
    const pending = getJson(`${origin}/slow`, parseName, controller.signal);
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
  });
});
