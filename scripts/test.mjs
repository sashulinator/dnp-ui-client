import { $ } from './$.mjs'

console.log(await $`git subtree pull --prefix=src/common common master --dry-run`.text())