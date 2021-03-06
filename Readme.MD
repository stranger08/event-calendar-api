# Testing - all components are in docker compose
`docker-compose up -d --build`

# Development
Using docker compose for downstream services
`docker-compose -f docker-compose-dev.yaml up -d`
Running application directly with node
`yarn run start:local`