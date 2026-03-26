@echo off
echo Starting SaaS Template Stack in Docker...
docker compose up -d --build

echo Waiting for services to become healthy...
:loop
docker inspect --format "{{json .State.Health.Status}}" saas_backend | findstr "healthy" >nul
if errorlevel 1 (
    timeout /t 2 /nobreak >nul
    goto loop
)

echo Services are healthy! Opening browsers...
start http://localhost:4321
start http://localhost:5173

echo Done! The stack is now running in the background.
echo Run 'docker compose down' to stop it.
