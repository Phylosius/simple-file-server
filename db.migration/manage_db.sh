#!/bin/bash

# Function to display usage
show_usage() {
    echo "Usage: $0 [create|drop]"
    echo "  create: Create or update the database"
    echo "  drop: Drop the database and user"
}

# Check if an argument is provided
if [ $# -ne 1 ]; then
    show_usage
    exit 1
fi

# Execute based on argument
case "$1" in
    "create")
        echo "Creating/updating database..."
        sudo -u postgres psql -f create_db.sql
        ;;
    "drop")
        echo "Dropping database..."
        sudo -u postgres psql -f drop_db.sql
        ;;
    *)
        show_usage
        exit 1
        ;;
esac 