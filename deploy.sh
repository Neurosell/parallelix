#!/bin/bash
set -e
cd /parallelix/

echo "Pulling Repository for Production..."
sudo git config --global --add safe.directory '*'
sudo git config --global user.name "Neurosell"
sudo git config --global user.email "start@ncommx.com"
sudo git pull origin main

echo "Stopping to use app ports"
docker compose -f docker-compose.yml down
sudo systemctl stop nginx || true
sudo systemctl stop apache2 || true
sudo pkill -f "nginx" || true
sudo pkill -f "apache" || true
sudo fuser -k 80/tcp || true
sudo fuser -k 443/tcp || true

sleep 5

echo "📊 Checking port availability:"
sudo netstat -tulpn | grep -E ":80|:443" || echo "Ports 80 and 443 are free"

echo "Restart Containers"
docker compose -f docker-compose.yml build --no-cache
docker compose -f docker-compose.yml up -d app nginx

echo "Waiting for services to be ready..."
sleep 5

echo "Requesting SSL certificates..."
docker compose -f docker-compose.yml run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d parallelix.nsell.tech --email ilya@neurosell.top --agree-tos --no-eff-email --preferred-challenges http --non-interactive --keep-until-expiring

echo "Switching to SSL configuration..."
cp nginx/nginx-ssl.conf nginx/nginx.conf
docker compose -f docker-compose.yml restart nginx

echo "All Right! Server is Started!"