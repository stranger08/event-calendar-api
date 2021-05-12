# Testing
All components are in docker compose, app listening on port 5000. For addressbook integration, checkout https://github.com/vik-vaughn/WebService alongside this repository, so directory view should be:
./
    event-calendar-api
    WebService

Onwards, from event-calendar-api repo, execute docker-compose build:
`docker-compose up -d --build`

Fresh setup requires to initialize postgres database.
`docker-compose run addressbook npm`
Onwards, postgres data is persisted in docker volume. If there are any file permission erros on startup, try moving volume folders elsewhere.

# Development
Using docker compose for downstream services
`docker-compose up -d mongo mongo-express addressbook postgres pgadmin`
Running application directly with node
`yarn run start:local`

# API specs
http://localhost:5000/swagger/v1/#/
