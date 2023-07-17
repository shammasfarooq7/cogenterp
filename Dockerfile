FROM node:18-alpine

WORKDIR /usr/app

RUN apk --no-cache add --virtual builds-deps build-base python3 
COPY package.json .
RUN npm install \
    && apk del builds-deps

COPY . .