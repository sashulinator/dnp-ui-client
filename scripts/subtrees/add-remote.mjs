import { getSubtrees } from "./_get-subtrees.mjs";
import { $ } from '../$.mjs'

const subtrees = await getSubtrees()

const diffPromises = subtrees.map(async (subtree) => {
  return $`git remote add ${subtree.name} ${subtree.repo}`.text().then(() => {
    return { subtree, addRemoteRet: `remote ${subtree.name} added` }
  }).catch((e) => {
    if (!new RegExp(`remote ${subtree.name} already exists`).test(e.message)) throw e
    return { subtree, addRemoteRet: `remote ${subtree.name} already exists` }
  })
})

const diffRets = await Promise.all(diffPromises)

console.log(diffRets.map(({ addRemoteRet }) => addRemoteRet))

