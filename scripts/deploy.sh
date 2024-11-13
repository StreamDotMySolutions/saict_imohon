#!/bin/bash

# Navigate to the project directory
cd /var/www/html/saict_imohon/ || exit

# Perform a git pull without any prompts
git pull --ff-only

# Navigate to the API directory and run composer with no interaction
cd /var/www/html/saict_imohon/backend/ || exit
composer install --no-interaction --optimize-autoloader
#composer dump-autoload --optimize
php artisan migrate --force
php artisan db:seed
php artisan optimize:clear

# Navigate to the frontend directory, install npm dependencies, and build the project
cd /var/www/html/saict_imohon/frontend/ || exit
npm install
npm run build

echo "Deployment completed at $(date)"
