#!/bin/bash
echo "Starting SaaS Template Stack in Docker..."
docker compose up -d --build

echo "Waiting for services to become healthy..."
while [ "$(docker inspect --format '{{json .State.Health.Status}}' saas_backend)" != "\"healthy\"" ]; do
    sleep 2
done

echo "Services are healthy! Opening browsers..."
# Cross-platform open
if which xdg-open > /dev/null; then
  xdg-open http://localhost:4321
  xdg-open http://localhost:5173
elif which open > /dev/null; then
  open http://localhost:4321
  open http://localhost:5173
fi

echo "Done! The stack is now running in the background."
echo "Run 'docker compose down' to stop it."
