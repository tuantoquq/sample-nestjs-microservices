FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json


RUN yarn install

COPY apps/reservations ./apps/reservations
COPY libs ./libs

FROM builder as development

CMD ["yarn", "start:dev", "reservations"]

FROM builder as prod_builder

RUN yarn build reservations

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=prod_builder /usr/src/app/node_modules ./node_modules

COPY --from=prod_builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]




