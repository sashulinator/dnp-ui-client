import { $ } from '../$.mjs'

const DEFAULT_BRANCH = 'main'

export async function getSubtrees() {
  const text = await $`cat ./subtrees`.text()
  const lines = text.split('\n')
  const subtrees = lines.reduce((acc, line, i) => {
    const parts = line.replace(/ +/g, ' ').split(' ')
    // Если # то это комментарий
    if (parts?.[0]?.[0] === '#') return acc
    if (parts.length !== 3) throw Error(`Error in file 'subtree': Line ${i}: Must contain 3 items`)
    const [nameBranch, path, repo] = parts
    const [name, branch = DEFAULT_BRANCH] = nameBranch.split('/')
    acc.push({ name, branch, path, repo })
    return acc
  }, [])

  return subtrees
}
