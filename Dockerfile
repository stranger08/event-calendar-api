FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock" "./"]
RUN yarn install

COPY . .

EXPOSE 5000
CMD ["yarn", "run", "start:docker"]