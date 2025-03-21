#!/bin/bash

# Runs `npm` or `yarn` install with retries
# Takes 2 parameters: the package manager and the dependencies to be installed
# Usage:  install_with_retries npm "$DEPENDENCIES" or  install_with_retries yarn "$DEPENDENCIES"
install_dependencies_with_retries() {
    local retries=4
    local attempt=1
    echo "Disable exit-on-error temporarily"
    echo "set +e"
    set +e
    while [ $attempt -le $retries ]; do
        echo "Attempt $attempt/$retries"
        echo "$1 install $2"
        "$1" install $2
        if [ $? -eq 0 ]; then
            echo "$1 install successful."
            echo "Re-enable exit-on-error"
            echo "set -e"
            set -e
            break
        fi
        # Add exponential backoff delay between failed attempts 
        # [5/25/125]s ~= 3min total
        local wait=$((5 ** attempt))
        attempt=$((attempt + 1))
        if [ $attempt -le $retries ]; then
            echo "$1 install failed. Retrying in $wait seconds..."
            sleep $wait
        else
            echo "$1 install failed after $retries attempts."
            echo "Re-enable exit-on-error"
            echo "set -e"
            set -e
            exit 1
        fi
    done
}
