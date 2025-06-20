# node version 18 
sudo n 18

npm install -g pnpm@7.33.7

pnpm install --frozen-lockfile

pnpm update @vuepress/bundler-vite @vuepress/client vuepress vuepress-theme-hope 

pnpm run docs:dev