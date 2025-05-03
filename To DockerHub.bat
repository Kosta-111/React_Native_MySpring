@echo off

echo Docker login...
docker login

cd "WebSpringApi"

echo Building Docker image api...
docker build -t npd211-asp-api .

echo Tagging Docker image api...
docker tag npd211-asp-api:latest kosta111/npd211-asp-api:latest

echo Pushing Docker image api to repository...
docker push kosta111/npd211-asp-api:latest

echo Done ---api---!
pause

