FROM node:latest

WORKDIR /usr/src/app

COPY package*.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 8001

CMD ["npm", "run", "dev"]