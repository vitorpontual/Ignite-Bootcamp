#/bin/zsh

cd ~/Documents/Ignite-aulas
git status
git add .
git commit -m "$1"
git push origin main
echo Commit Complete 
