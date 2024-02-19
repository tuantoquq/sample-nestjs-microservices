@echo off

set REGISTRY_BASE_PATH=tuantoquq/

if "%1" == "--env" (
  if "%2" == "dev" (
    echo "Building images in Dev environment ..."
    @REM build images
    for %%i in (auth, payments, notifications, reservations) do (
      cd apps/%%ctx
      docker build -f Dockerfile --target development -t %%i:latest ../../
      docker tag %%i:latest %REGISTRY_BASE_PATH%%%i:latest
      docker push %REGISTRY_BASE_PATH%%%i:latest
      cd ../../
    )
  ) else if "%2" == "prod" (
    echo "Building images in Production environment ..."
    @REM build images
    for %%i in (auth, payments, notifications, reservations) do (
      cd apps/%%i
      docker build -f Dockerfile --target production -t %%i:latest ../../
      docker tag %%i:latest %REGISTRY_BASE_PATH%%%i:latest
      docker push %REGISTRY_BASE_PATH%%%i:latest
      cd ../../
    )
  ) else (
    echo "Invalid environment argument! Only support \"dev\" or \"prod\""
  )
) else (
  echo "Argument about environment not found! Add --env and environment \"dev\" or \"prod\". Sample: sh build-images.sh --env dev"
)