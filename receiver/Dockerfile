FROM node:alpine

WORKDIR /app

COPY package.json .
COPY receiver.js .

RUN npm install
RUN npm install pm2 -g

CMD pm2-runtime receiver.js -i 1