git checkout .
git pull
adonis migration:refresh
adonis seed --files MongoSeeder.js
pm2 restart all
