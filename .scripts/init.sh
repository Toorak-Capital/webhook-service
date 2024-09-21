#!/usr/bin/env sh

# expect 1 argument for project name
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <project-name>" >&2
  exit 1
fi

# Copy base project and rename as new project name argument "$1"
git clone --depth=1 git@github.com:Toorak-Capital/micro-service-base-project.git $1
cd $1
rm -rf .git

# change project name in packag*.json & other locations
npx -y npe name $1
awk -v project=$1 '/Toorak Captial Partners/{gsub(/Micro Service Base Project/, project)};{print}' README.md > README && mv README README.md
awk -v project=$1 '/sonar\.projectKey=Toorak-Capital_/{gsub(/micro-service-base-project/, project)};{print}' sonar-project.properties > sonar && mv sonar sonar-project.properties
awk '{if(NR>13 || NR<3) {print $0}}' README.md > README && mv README README.md

# setup git
git init
npm run gitHooks
git remote add origin "git@github.com:Toorak-Capital/$1.git"

# install node dependencies
npm install

# cleanup
rm ./.scripts/init.sh
