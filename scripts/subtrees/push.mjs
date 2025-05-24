import { getSubtrees } from "./_get-subtrees.mjs";
import { $ } from '../$.mjs'
import { getFlag } from '../utils/_get-flag.mjs'

const subtrees = await getSubtrees()

const subtreeName = getFlag('name')

if (!subtreeName) {
  throw Error(`Flag '--name=' does not specified`)
}

const subtree = subtrees.find((subtree) => subtree.name === subtreeName)

if (!subtree) {
  throw Error(`subtree '${subtree.name}' does not exist in file 'subtrees'`)
}

const branch = getFlag('branch')

const cmd = `git subtree push --prefix=${subtree.path} ${subtree.name} ${branch || subtree.branch}`
console.log(cmd)
const ret = await $(cmd).text()

console.log(ret)

