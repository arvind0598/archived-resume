git checkout 2019
touch CNAME
echo "www.arvindsuresh.in" > CNAME
git subtree split --prefix dist -b master
git push -f origin master:master
git branch -D master