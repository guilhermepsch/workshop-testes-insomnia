FROM node:18.18 as base

# imagem de desenvolvimento
FROM base as dev
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install

