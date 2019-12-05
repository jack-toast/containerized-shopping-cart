FROM node:12.13.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install
COPY . /usr/src/app

EXPOSE 8080
CMD ["npm", "run", "dev"]