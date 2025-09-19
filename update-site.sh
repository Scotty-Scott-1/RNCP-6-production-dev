#!/bin/bash
cd /var/www/NewRNCP6/frontend
git pull origin main
npm install
npm run build
cp -r dist/* ../backend/public/

cd ../backend
git pull origin main
npm install
pm2 restart newrncp6
