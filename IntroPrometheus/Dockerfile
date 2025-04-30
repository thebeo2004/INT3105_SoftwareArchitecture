FROM node:alpine

WORKDIR /coin_api

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]