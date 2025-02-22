#!/bin/bash

DOCKER_COMPOSE='docker compose'

echo "Using docker compose command: $DOCKER_COMPOSE"

$DOCKER_COMPOSE down
$DOCKER_COMPOSE rm -v --force
docker volume rm nest-commander-demo_db-a-data
docker volume rm nest-commander-demo_db-b-data
$DOCKER_COMPOSE pull
$DOCKER_COMPOSE build
$DOCKER_COMPOSE up -d --force-recreate --remove-orphans
docker exec app-a yarn install
docker exec app-a yarn prisma:generate
docker exec app-a yarn prisma:migrate:dev
docker exec app-b yarn install
docker exec app-b yarn prisma:generate
docker exec app-b yarn prisma:migrate:dev
docker exec app-a yarn prisma:seed:app-a
$DOCKER_COMPOSE stop