FROM node:14-alpine as builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

ADD . .

RUN yarn build

FROM node:14-alpine

WORKDIR /root/

COPY package.json yarn.lock .env ./

RUN yarn install --production=true

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080

CMD [ "yarn", "start" ]
