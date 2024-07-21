#!/bin/bash
set -e

# Define the database user and password
DB_USER=shopping_user
DB_PASSWORD=password
DB_NAME=shopping_list

# Create the database user
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOSQL
