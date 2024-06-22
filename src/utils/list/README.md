# utils/list

## subtree

### pull/push

```bash
# Push
git subtree push --prefix=src/utils/list utils-list master
# Pull
git subtree pull --prefix=src/utils/list utils-list master
# Force
git push utils-list `git subtree split --prefix=src/utils/list @`:master --force
```

### Add to your project

1. Add a repository alias `git remote add utils-list git@github.com:sashulinator/utils-list.git`
2. To check a list of aliases `git remote -v`, you must see `utils-list`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/utils/list utils-list master`
