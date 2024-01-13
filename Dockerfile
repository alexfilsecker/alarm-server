FROM node:20.4.0

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
