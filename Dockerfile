FROM node:lts-alpine3.16

USER root

COPY ./package*.json ./
COPY src ./src
COPY tsconfig.json ./
RUN npm install
RUN npm run build
RUN mkdir /app
COPY dist /app/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["node","/app/index.js"]