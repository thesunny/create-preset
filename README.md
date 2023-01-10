# `create-preset`

Adds the dependencies and a `package.json` script to make `yarn preset ${nameOfPreset}` work.

In any directory that has a `package.json`, enter the command:

```sh
yarn preset @thesunny/preset
```

## If it's not working

If the preset isn't working and you just need to get it to work, do this:

```sh
yarn link @thesunny/presets

node node_modules/@thesunny/presets/bin/setup.js
```

Add this to the scripts part of `package.json`

```json
{
  "scripts": {
    "-- preset": "# Run preset from @thesunny/presets",
    "preset": "ts-node --project node_modules/@thesunny/presets/tsconfig.ts-node.json node_modules/@thesunny/presets/bin/index.ts"
  }
}
```

```json
{
  "scripts": {
    "-- preset": "# Run preset from @thesunny/presets",
    "preset": "ts-node --project $HOME/presets/tsconfig.ts-node.json $HOME/presets/bin/index.ts"
  }
}
```

## How it works

The command above works because calling `yarn something` will automatically install a package with the name of the argument preceded by `create-` so `something` will become `create-something`.

In our case, we have a scope and that is automatically preserved so `yarn create @thesunny/preset` turns into the package `@thesunny/create-preset`. It then executes whatever is in `bin`.

The `bin` for this project does a `yarn link @thesunny/presets` and then calls `node node_modules/@thesunny/presets/bin/setup.js` under the presumption that all the code we need to do the install is actually present in `@thesunny/presets`.

## Why not put the setup code in `@thesunny/presets`

Unfortunately, `bin` commands don't work when you `yarn link` a package. This seems to be an outstanding bug that doesn't look like it will be fixed soon. It does work with `npm` but would like to stay in the `yarn` ecosystem for now.
