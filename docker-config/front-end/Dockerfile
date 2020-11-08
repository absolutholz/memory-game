# https://derickbailey.com/2017/03/09/selecting-a-node-js-image-for-docker/
FROM node:15.1.0

WORKDIR /app

COPY ./package*.json ./

RUN npm i -g @vue/cli

RUN npm install
