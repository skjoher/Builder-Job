#!/bin/bash
docker build -t gcr.io/land-network/builder-job-back .
docker push gcr.io/land-network/builder-job-back

ssh deploy@$DEPLOY_SERVER << EOF
docker pull gcr.io/land-network/builder-job-back
docker stop builder-job-back|| true
docker rm builder-job-back || true
docker rmi gcr.io/land-network/builder-job-back:latest || true
docker tag gcr.io/land-network/builder-job-back:latest gcr.io/land-network/builder-job-back:latest
docker run -d --restart always --name builder-job-back -p 3000:3000 gcr.io/land-network/builder-job-back:latest
EOF