// Use the esbuild already provided by Vite to run TypeScript tests with Node's test runner.
import { build } from 'esbuild';

const result = await build({
  entryPoints: ['tests/features.test.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
  tsconfig: 'tsconfig.app.json',
});

await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`
);
