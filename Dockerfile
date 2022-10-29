FROM node:lts-alpine3.16

USER root

RUN mkdir /app
COPY src /app/
RUN cd /app & npm i & npm i -g ts-node

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

CMD ["npx","ts-node","/app/index.ts"]