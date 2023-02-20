FROM node:18-alpine

WORKDIR /app/

COPY --chown=node:node package*.json ./

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD ["npm", "run", "start:dev"]