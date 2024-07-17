@echo off
REM Replace the following variables with your actual values
set USER=root
set HOST=imohon.muzikfmrtm.com
set REMOTE_SCRIPT="cd /var/www/imohon.muzikfmrtm.com/saict_imohon/ && git pull && cd frontend && npm run build  && cd ../backend && php artisan migrate && exit"

REM Execute the SSH command
ssh  %USER%@%HOST% %REMOTE_SCRIPT%

pause
