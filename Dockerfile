FROM node:22 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm", "start"]

