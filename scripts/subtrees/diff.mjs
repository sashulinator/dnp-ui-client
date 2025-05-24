import { getSubtrees } from "./_get-subtrees.mjs";
import { $ } from '../$.mjs'
import { getFlag } from '../utils/_get-flag.mjs'

const subtrees = await getSubtrees()

const diffPromises = subtrees.map(async (subtree) => {
  const cmdFetch = `git fetch ${subtree.name} ${subtree.branch}`
  console.log(cmdFetch)
  await $(cmdFetch).text()

  let branch
  const flagBranch = getFlag('branch')
  if (flagBranch) {
    branch = flagBranch
  } else {
    const cmdCurrentBranch = `git branch --show-current`
    console.log(cmdCurrentBranch)
    branch = await $(cmdCurrentBranch).text()
  }

  const cmdDiff = `git --no-pager diff --stat ${branch} ${subtree.name}/${subtree.branch} -- ${subtree.path}`
  console.log(cmdDiff)
  const diffRet = await $(cmdDiff).text()

  return { subtree, diffRet }
})

const diffRets = await Promise.all(diffPromises)

console.log(diffRets)

