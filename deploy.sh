git checkout master
yes | cp dist/ .
git add .
git commit -m "Build output as of $(git log '--format=format:%H' master -1)"
git push origin master