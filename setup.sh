#!/bin/bash

DOCKER_COMPOSE='docker-compose'

echo "Using docker-compose command: $DOCKER_COMPOSE"

$DOCKER_COMPOSE down
$DOCKER_COMPOSE rm -v --force
docker volume rm db-a-data
docker volume rm db-b-data
$DOCKER_COMPOSE pull
$DOCKER_COMPOSE build
$DOCKER_COMPOSE up -d --force-recreate --remove-orphans
docker exec app-a npm install
docker exec app-a npm run prisma:generate
docker exec app-a npm run prisma:migrate:dev
$DOCKER_COMPOSE stop