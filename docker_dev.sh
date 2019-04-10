#!/usr/bin/env bash
docker-compose up -d app
docker-compose logs -f app
docker-compose down