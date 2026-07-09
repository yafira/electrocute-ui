import { execSync } from "node:child_process";
import { existsSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const siteDist = resolve(root, "site-dist");
const storybookStatic = resolve(root, "storybook-static");
const storybookDest = resolve(siteDist, "storybook");

console.log("→ building landing page...");
execSync("vite build --config vite.site.config.ts", { stdio: "inherit" });

console.log("→ building storybook...");
execSync("npm run build-storybook", { stdio: "inherit" });

console.log("→ combining into site-dist/...");
if (!existsSync(siteDist)) {
  throw new Error("site-dist was not created by the landing page build");
}
if (existsSync(storybookDest)) {
  rmSync(storybookDest, { recursive: true, force: true });
}
mkdirSync(storybookDest, { recursive: true });
cpSync(storybookStatic, storybookDest, { recursive: true });

console.log("✓ done — site-dist/ contains the landing page at / and Storybook at /storybook/");
