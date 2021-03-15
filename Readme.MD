# Testing
All components are in docker compose, app listening on port 5000
`docker-compose up -d --build`

# Development
Using docker compose for downstream services
`docker-compose up -d mongo mongo-express`
Running application directly with node
`yarn run start:local`

# API specs
http://localhost:5000/swagger/v1/#/
