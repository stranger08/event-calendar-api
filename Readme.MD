# Testing - all components are in docker compose
`docker-compose up -d --build`

# Development
Using docker compose for downstream services, running application directly with node
`docker-compose -f docker-compose-dev.yaml up -d`
`yarn run start:local`