#!/usr/bin/env node
import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import * as utils from "@thesunny/script-utils"

export function exec(cmd: string) {
  return execSync(cmd, { encoding: "utf8" }).trim()
}

/**
 * Link to @thesunny/presets
 *
 * In the future, if we are sharing these presets, we can have this do a
 * `yarn add @thesunny/presets` if the `yarn link` fails.
 */
if (typeof process.env.HOME === "undefined") {
  throw new Error(`Expected a home directory "~" to be defined`)
}

const presetsPath = path.join(process.env.HOME, "presets")

const pathExists = fs.existsSync(presetsPath)

function showInstructions() {
  utils.message(`${presetsPath} 
  
At that path should be a soft symlink pointing to the presets project which should be cloned from github

Currently, this will be the path to the package named "@thesunny/presets" which can be cloned from "https://github.com/thesunny/presets".

Unfortunately, this step has to be done manually because we don't know where the file can be found in your directory structure. Once it is set though, we won't have to set it again for other projects.

Your command to link will be something like:

ln -s /path/to/presets/dir ~/presets`)
}

utils.task("Ensure that ~/presets is a symlink to a directory")
if (pathExists === false) {
  utils.message(
    `Expected this path in your user home dirrectory to exists but it does not.`
  )
  showInstructions()
  utils.fail("Path not found", { throwError: false })
}
const stats = fs.lstatSync(presetsPath)

/**
 * Check for symlink
 */
if (!stats.isSymbolicLink()) {
  utils.message(
    `Expected this path in your user home directory to be a symlink but it is not.`
  )
  showInstructions()
  utils.fail("Path is not a symlink", { throwError: false })
}

// /**
//  * Check for symlink
//  */
// if (!stats.isDirectory()) {
//   utils.message(
//     `Expected this path in your user home directory to be a directory but it is not.`
//   )
//   showInstructions()
//   utils.fail("Path is not a directory", { throwError: false })
// }

utils.pass("Passed")

// exec("yarn link @thesunny/presets")

utils.writeFile(
  ".yarnrc.yml",
  `# Easier to view source. Also required to work with presets.
nodeLinker: node-modules`
)

/**
 * Execute the `bin/setup.js` file.
 */
exec("node $HOME/presets/bin/setup.js")
