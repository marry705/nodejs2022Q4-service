FROM node:18-alpine

WORKDIR /app/

COPY --chown=node:node package*.json ./

COPY --chown=node:node tsconfig*.json ./

RUN npm install

COPY --chown=node:node . .

CMD ["npm", "run", "start:dev"]