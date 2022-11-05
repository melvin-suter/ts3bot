FROM node:lts-alpine3.16

USER root

RUN mkdir /app
COPY src /app/
RUN cd /app & npm i & npm run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["node","/app/dist/index.js"]