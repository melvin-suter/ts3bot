FROM node:lts-alpine3.16

USER root

RUN npm i & npm run build
RUN mkdir /app
COPY dist /app/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["node","/app/index.js"]