FROM node:lts-alpine3.16

USER root

RUN mkdir /app
COPY dist /app/
RUN cd /app & npm i

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

CMD ["npx","ts-node","/app/index.ts"]