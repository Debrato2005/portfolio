import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
const localTool = resolve(
  homedir(),
  '.local/share/uv/tools/graphifyy/bin/graphify',
);
const executable =
  process.env.GRAPHIFY_BIN ?? (existsSync(localTool) ? localTool : 'graphify');
const action = process.argv[2];
const output = resolve('.local/graph');
mkdirSync(output, { recursive: true });
const args =
  action === 'build'
    ? [
        'extract',
        resolve('src'),
        '--code-only',
        '--no-cluster',
        '--out',
        output,
      ]
    : action === 'query' && process.argv[3]
      ? [
          'query',
          process.argv.slice(3).join(' '),
          '--graph',
          resolve(output, 'graphify-out/graph.json'),
        ]
      : null;
if (!args) {
  console.error('Use graph:build or graph:query with a question.');
  process.exit(1);
}
const result = spawnSync(executable, args, { stdio: 'inherit' });
if (result.error)
  console.error(
    'Graphify is unavailable. Install the runtime or set GRAPHIFY_BIN.',
  );
process.exit(result.status ?? 1);
