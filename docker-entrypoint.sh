#!/bin/bash

set -e

echo "Running unit tests"
yarn test

echo "Running database migrations"
yarn migrate

echo "Starting server"
yarn start