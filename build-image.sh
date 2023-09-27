#! /bin/bash

REGISTRY_BASE_PATH=asia-southeast1-docker.pkg.dev/reservations-400309/

if [ "${1}" = "--env" ]; then
  if [ "${2}" = "dev" ]; then
    echo "Building images in Dev environment ..."
    # build images
    for ctx in auth payments notifications reservations; do
      cd apps/$ctx
      docker build -f Dockerfile --target development -t $ctx:latest ../../
      docker tag $ctx:latest $REGISTRY_BASE_PATH$ctx/development:latest
      docker push $REGISTRY_BASE_PATH$ctx/development:latest
      cd ../../
    done
  elif [ "${2}" = "prod" ]; then
    echo "Building images in Production environment ..."
    # build images
    for ctx in auth payments notifications reservations; do
      cd apps/$ctx
      docker build -f Dockerfile --target production -t $ctx:latest ../../
      docker tag $ctx:latest $REGISTRY_BASE_PATH$ctx/production:latest
      docker push $REGISTRY_BASE_PATH$ctx/production:latest
      cd ../../
    done
  else
    echo "Invalid environment argument! Only support \"dev\" or \"prod\""
  fi
else
  echo "Argument about environment not found! Add --env and environment \"dev\" or \"prod\". Sample: sh build-images.sh --env dev"
fi
