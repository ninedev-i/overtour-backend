FROM node:20.10.0-alpine as builder

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json yarn.lock /home/node/app/

RUN touch .env && yarn install --frozen-lockfile

COPY --chown=node:node  . /home/node/app/

RUN node ace build --production && cd build && yarn install --production

FROM builder


COPY --chown=node:node --from=builder /home/node/app/build/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/build ./build

EXPOSE 3333

CMD sh -c 'cd build && node ace migration:run --force && node server.js'
