#!/usr/bin/env node
import { execSync } from "child_process"

export function exec(cmd: string) {
  return execSync(cmd, { encoding: "utf8" }).trim()
}

/**
 * Link to @thesunny/presets
 *
 * In the future, if we are sharing these presets, we can have this do a
 * `yarn add @thesunny/presets` if the `yarn link` fails.
 */
exec("yarn link @thesunny/presets")

/**
 * Execute the `bin/setup.js` file.
 */
exec("node node_modules/@thesunny/presets/bin/setup.js")
