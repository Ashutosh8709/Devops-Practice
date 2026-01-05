FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY app.js .

ENV PORT=5100
ENV VERSION=v1.0.0

EXPOSE 5100

CMD [ "node", "app.js" ]