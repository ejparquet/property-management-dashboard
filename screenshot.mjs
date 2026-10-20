// Usage: node screenshot.mjs <url> [label] [width]
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';

const [url = 'http://localhost:3000', label, width = '1440'] = process.argv.slice(2);
const dir = 'temporary screenshots';
mkdirSync(dir, { recursive: true });
const n = readdirSync(dir).filter(f => /^screenshot-\d+/.test(f)).length + 1;
const out = `${dir}/screenshot-${n}${label ? '-' + label : ''}.png`;
execFileSync(process.env.CHROME || '/Users/erinparquet/.cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell', [
  '--hide-scrollbars', '--disable-gpu', '--force-prefers-reduced-motion',
  `--window-size=${width},${process.env.H || 3600}`, '--virtual-time-budget=9000',
  `--screenshot=${out}`, url,
], { stdio: 'ignore' });
console.log(out);
