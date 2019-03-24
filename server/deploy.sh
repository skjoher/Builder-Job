#!/bin/bash
docker build -t gcr.io/land-network/builder-job-api .
docker push gcr.io/land-network/builder-job-api

ssh deploy@$DEPLOY_SERVER << EOF
docker pull gcr.io/land-network/builder-job-api
docker stop builder-job-api|| true
docker rm builder-job-api || true
docker rmi gcr.io/land-network/builder-job-api:latest || true
docker tag gcr.io/land-network/builder-job-api:latest gcr.io/land-network/builder-job-api:latest
docker run -d --restart always --name builder-job-api -p 3000:3000 gcr.io/land-network/builder-job-api:latest
EOF