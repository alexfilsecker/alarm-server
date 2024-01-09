FROM node:20.4.0

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
