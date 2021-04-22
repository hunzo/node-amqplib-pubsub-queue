FROM node:alpine

WORKDIR /app

COPY package.json .
COPY sender.js .

RUN npm install
RUN npm install pm2 -g

CMD pm2-runtime sender.js -i 4
