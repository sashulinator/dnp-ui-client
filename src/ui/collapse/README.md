# a-collapse

## Description

A component for smooth rendering of content based on its height.

## Features

### Adjusts smoothly the height based on the content height.

## Subtree

### `pull`/`push`

```bash
# Push
git subtree push --prefix=src/abstract/collapse a-collapse master
# Pull
git subtree pull --prefix=src/abstract/collapse a-collapse master
# Force
git push a-collapse `git subtree split --prefix=src/abstract/collapse @`:master --force
```

### `diff`

```
git --no-pager diff a-collapse/master master:src/abstract/collapse
```

### Add to your project

1. Add a repository alias `git remote add a-collapse git@github.com:sashulinator/a-collapse.git`
2. To check a list of aliases `git remote -v`, you must see `a-collapse`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/collapse a-collapse master`
