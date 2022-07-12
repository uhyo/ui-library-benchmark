#! /bin/bash
set -e

rm -r dist
mkdir -p dist

cd angular
yarn build
cp -r dist/angular ../dist/angular
cd ..

cd react
yarn build
cp -r dist ../dist/react
cd ..

cd solidjs
yarn build
cp -r dist ../dist/solidjs
cd ..

cd svelte
yarn build
cp -r dist ../dist/svelte
cd ..

cd vue
yarn build
cp -r dist ../dist/vue
cd ..

cp index.html dist/
