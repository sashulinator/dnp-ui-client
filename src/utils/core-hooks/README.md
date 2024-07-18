# utils/hooks

## subtree

### pull/push

```bash
# Push
git subtree push --prefix=src/utils/hooks utils-hooks master
# Pull
git subtree pull --prefix=src/utils/hooks utils-hooks master
# Force
git push utils-hooks `git subtree split --prefix=src/utils/hooks @`:master --force
```

test

### diff

```
git --no-pager diff utils-hooks/master master:src/utils/hooks
```

### Add to your project

1. Add a repository alias `git remote add utils-hooks git@github.com:sashulinator/utils-hooks.git`
2. To check a list of aliases `git remote -v`, you must see `utils-hooks`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/utils/hooks utils-hooks master`
