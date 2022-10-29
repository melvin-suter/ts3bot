FROM node:lts-alpine3.16

USER root

RUN mkdir /app
COPY src /app/
RUN cd /app & npm i & npm i -g ts-node & chmod +x /entrypoint.sh

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT /entrypoint.sh