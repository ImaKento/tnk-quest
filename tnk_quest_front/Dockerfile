FROM node:current-alpine3.19

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

CMD ["npm", "start"]