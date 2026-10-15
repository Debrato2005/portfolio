import { describe, expect, it } from 'vitest';
import { readConfig } from './runtime';

describe('public runtime configuration', () => {
  it('defaults to static content without an API', () => {
    expect(readConfig({}, false)).toEqual({ mode: 'static', apiBaseUrl: null });
  });
  it('rejects fixtures in production', () => {
    expect(() => readConfig({ VITE_DATA_MODE: 'fixture' }, true)).toThrow();
  });
  it('requires an explicit HTTP API for live mode', () => {
    for (const url of [
      undefined,
      'javascript:alert(1)',
      'https://user:secret@example.com',
    ]) {
      expect(() =>
        readConfig({ VITE_DATA_MODE: 'live', VITE_API_BASE_URL: url }, false),
      ).toThrow();
    }
    expect(
      readConfig(
        {
          VITE_DATA_MODE: 'live',
          VITE_API_BASE_URL: 'https://api.example.com/',
        },
        true,
      ),
    ).toEqual({ mode: 'live', apiBaseUrl: 'https://api.example.com' });
  });
  it('rejects unknown modes', () => {
    expect(() =>
      readConfig({ VITE_DATA_MODE: 'silent-fallback' }, false),
    ).toThrow();
  });
});
