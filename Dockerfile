FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY tsconfig.json ./

COPY . .

RUN npm install

EXPOSE 4000

CMD npm run start