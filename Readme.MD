# Testing
All components are in docker compose, app listening on port 5000
`docker-compose up -d --build`

# Development
Using docker compose for downstream services
`docker-compose -f docker-compose-dev.yaml up -d`
Running application directly with node
`yarn run start:local`